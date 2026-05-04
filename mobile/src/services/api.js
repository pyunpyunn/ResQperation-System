import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
});

export async function login(loginId, password) {
  const { data } = await api.post('/auth/login', {
    login_id: loginId,
    password,
  });

  api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

  return data;
}
