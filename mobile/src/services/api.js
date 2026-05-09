import axios from 'axios';
import Constants from 'expo-constants';
import { NativeModules } from 'react-native';

function trimTrailingSlash(value) {
  return value.replace(/\/+$/, '');
}

function getHostFromExpo() {
  const scriptUrl = NativeModules.SourceCode?.scriptURL;
  const scriptHost = scriptUrl?.match(/^https?:\/\/([^/:]+)/)?.[1];

  if (scriptHost) {
    return scriptHost;
  }

  const candidates = [
    Constants.expoConfig?.hostUri,
    Constants.manifest2?.extra?.expoClient?.hostUri,
    Constants.manifest?.debuggerHost,
  ];

  const hostUri = candidates.find(Boolean);

  if (!hostUri) {
    return null;
  }

  return hostUri.split(':')[0];
}

export function getApiBaseUrl() {
  const configuredUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

  if (configuredUrl) {
    return trimTrailingSlash(configuredUrl);
  }

  const developmentHost = getHostFromExpo();

  if (developmentHost) {
    return `http://${developmentHost}:8000/api`;
  }

  return 'http://127.0.0.1:8000/api';
}

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export async function login(loginId, password) {
  try {
    const { data } = await api.post('/auth/login', {
      login_id: loginId.trim(),
      password,
    });

    if (!data?.token || !data?.user) {
      throw new Error('The backend returned an incomplete login response.');
    }

    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    return data;
  } catch (error) {
    throw createApiError(error);
  }
}

export async function checkApiHealth() {
  const { data } = await api.get('/health');

  return data;
}

function createApiError(error) {
  if (error.response?.status === 401 || error.response?.status === 422) {
    return new Error('Invalid user ID or temporary password.');
  }

  if (error.code === 'ECONNABORTED') {
    return new Error(`The backend did not respond. Check that Laravel is running at ${api.defaults.baseURL}.`);
  }

  if (error.request && !error.response) {
    return new Error(`Cannot reach the backend at ${api.defaults.baseURL}. Start Laravel and keep your phone on the same Wi-Fi as this laptop.`);
  }

  return error instanceof Error ? error : new Error('Login failed. Please try again.');
}
