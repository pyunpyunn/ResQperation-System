import * as Location from 'expo-location';
import * as Network from 'expo-network';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const API_BASE_URL = (process.env.EXPO_PUBLIC_API_BASE_URL || '').replace(/\/+$/, '');

type LoadedMapComponents = {
  MapView: typeof import('react-native-maps').default;
  Marker: typeof import('react-native-maps').Marker;
};

async function fetchWithTimeout(input: RequestInfo, init: RequestInit & { timeoutMs?: number } = {}) {
  const { timeoutMs = 8000, ...rest } = init;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, { ...rest, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export default function HomeScreen() {
  const [addressDetails, setAddressDetails] = useState('');
  const [mapEnabled, setMapEnabled] = useState(false);
  const [mapComponents, setMapComponents] = useState<LoadedMapComponents | null>(null);
  const [region, setRegion] = useState({
    latitude: 10.3157,
    longitude: 123.8854,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    let isCancelled = false;

    if (!mapEnabled || mapComponents) {
      return;
    }

    void import('react-native-maps')
      .then((maps) => {
        if (!isCancelled) {
          setMapComponents({
            MapView: maps.default,
            Marker: maps.Marker,
          });
        }
      })
      .catch(() => {
        if (!isCancelled) {
          Alert.alert('Map unavailable', 'Unable to load the map right now. Please restart the app and try again.');
          setMapEnabled(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [mapComponents, mapEnabled]);

  const handleEnableMap = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Allow location access to pin your home.');
        return;
      }

      setMapEnabled(true);

      const currentLocation = await Location.getCurrentPositionAsync({});
      setRegion((prev) => ({
        ...prev,
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      }));
    } catch {
      Alert.alert('Error', 'Unable to access location. Please try again.');
    }
  };

  const showNetworkHelp = async (details: string) => {
    const state = await Network.getNetworkStateAsync();
    const ip = await Network.getIpAddressAsync().catch(() => 'unknown');

    Alert.alert(
      'Network error',
      [
        'Could not reach the server.',
        '',
        `API: ${API_BASE_URL || '(not set)'}`,
        `Phone IP: ${ip}`,
        `Connected: ${state.isConnected ? 'yes' : 'no'}`,
        `Reachable: ${state.isInternetReachable === null ? 'unknown' : state.isInternetReachable ? 'yes' : 'no'}`,
        `Type: ${state.type}`,
        '',
        `Details: ${details}`,
        '',
        'Common fixes:',
        '- Run Laravel with: php artisan serve --host 0.0.0.0 --port 8000',
        '- Allow port 8000 in Windows Firewall',
        '- Make sure phone and laptop are on the same Wi-Fi (no VPN/hotspot isolation)',
        '- Try opening http://192.168.1.10:8000 in your phone browser',
      ].join('\n')
    );
  };

  const handleTestConnection = async () => {
    if (!API_BASE_URL) {
      Alert.alert(
        'Missing API URL',
        'Set EXPO_PUBLIC_API_BASE_URL (example: http://192.168.1.10:8000) and restart Expo.'
      );
      return;
    }

    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/api/health`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        timeoutMs: 6000,
      });

      const result = await response.json().catch(() => null);
      const healthStatus = result?.status ? ` (${result.status})` : '';
      Alert.alert('Server reachable', `Reached ${API_BASE_URL}/api/health${healthStatus}\nHTTP ${response.status}`);
    } catch (error) {
      const details = error instanceof Error ? error.message : String(error);
      await showNetworkHelp(details);
    }
  };

  const handleSaveLocation = async () => {
    try {
      if (!API_BASE_URL) {
        Alert.alert(
          'Missing API URL',
          'Set EXPO_PUBLIC_API_BASE_URL (example: http://192.168.1.10:8000) and restart Expo.'
        );
        return;
      }

      const response = await fetchWithTimeout(`${API_BASE_URL}/api/households`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          HouseholdHeadName: 'Test Resident',
          Barangay: 'Cebu City',
          latitude: region.latitude,
          longitude: region.longitude,
          specific_address: addressDetails,
        }),
        timeoutMs: 12000,
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Home successfully geotagged!');
      } else {
        Alert.alert('Error', result.message || 'Failed to save.');
      }
    } catch (error) {
      const details = error instanceof Error ? error.message : String(error);
      await showNetworkHelp(details);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ResQperation</Text>
        <Text style={styles.subtitle}>Pin your household location</Text>
      </View>

      {!mapEnabled ? (
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderTitle}>Map is off (faster startup)</Text>
          <Text style={styles.mapPlaceholderText}>
            Tap below to request location permission and load the map when you&apos;re ready.
          </Text>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleEnableMap}>
            <Text style={styles.secondaryButtonText}>Enable map & location</Text>
          </TouchableOpacity>
        </View>
      ) : mapComponents ? (
        <mapComponents.MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        >
          <mapComponents.Marker
            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
            draggable
            title="My House"
            description="Drag this pin to your roof"
          />
        </mapComponents.MapView>
      ) : (
        <View style={styles.mapPlaceholder}>
          <ActivityIndicator size="large" color="#d9534f" />
          <Text style={styles.mapPlaceholderText}>Loading map...</Text>
        </View>
      )}

      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Building, Floor, Unit (e.g. Bldg 3, 2nd Floor)"
          placeholderTextColor="#888"
          value={addressDetails}
          onChangeText={setAddressDetails}
        />
        <TouchableOpacity style={styles.secondaryButton} onPress={handleTestConnection}>
          <Text style={styles.secondaryButtonText}>Test server connection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSaveLocation}>
          <Text style={styles.buttonText}>Confirm Geotag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 10, backgroundColor: '#FFF' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#d9534f' },
  subtitle: { fontSize: 14, color: '#666' },
  map: { flex: 1 },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  mapPlaceholderText: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 16, marginTop: 12 },
  secondaryButton: { backgroundColor: '#333', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8 },
  secondaryButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  input: { borderWidth: 1, borderColor: '#DDD', padding: 12, borderRadius: 8, marginBottom: 15, backgroundColor: '#FAFAFA' },
  button: { backgroundColor: '#d9534f', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
