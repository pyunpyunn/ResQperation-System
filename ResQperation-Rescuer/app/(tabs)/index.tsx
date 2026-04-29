import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, RefreshControl, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

interface Household {
  HouseholdID: number;
  HouseholdHeadName: string;
  Barangay: string;
  PhoneNumber: string;
}

const API_BASE_URL = (process.env.EXPO_PUBLIC_API_BASE_URL || '').replace(/\/+$/, '');
const HOUSEHOLDS_URL = API_BASE_URL ? `${API_BASE_URL}/api/households` : '';

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

export default function RescuerDashboard() {
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<Household[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = useCallback(async () => {
    if (!HOUSEHOLDS_URL) {
      const message = 'Set EXPO_PUBLIC_API_BASE_URL in .env and restart Expo before loading rescuer data.';
      setData([]);
      setErrorMessage(message);
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      setErrorMessage('');

      const response = await fetchWithTimeout(HOUSEHOLDS_URL, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        timeoutMs: 12000,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const json = await response.json();
      const households = Array.isArray(json)
        ? json
        : Array.isArray(json.data)
          ? json.data
          : [];

      setData(households);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setData([]);
      setErrorMessage(`Could not load households from ${HOUSEHOLDS_URL}. ${message}`);
      Alert.alert('Connection Error', `Could not reach ${HOUSEHOLDS_URL}.\n\n${message}`);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    void fetchData();
  }, [fetchData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>ResQperation: Rescuer</Text>
        <Text style={styles.subtitle}>Incident Monitoring List</Text>
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#FF4444" />
          <Text style={styles.loadingText}>Connecting to ResQperation Server...</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyExtractor={(item) => item.HouseholdID.toString()}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.headName}>{item.HouseholdHeadName}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>PENDING</Text>
                </View>
              </View>
              <Text style={styles.info}>Barangay: {item.Barangay}</Text>
              <Text style={styles.info}>Contact: {item.PhoneNumber}</Text>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.empty}>{errorMessage || 'No active incidents found.'}</Text>
              <Text style={styles.emptyHint}>
                {errorMessage ? 'Update .env, restart Expo, then pull down to refresh.' : 'Pull down to refresh'}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { padding: 25, backgroundColor: '#d32f2f', paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 14, color: '#ffcdd2', fontWeight: '500' },
  loadingText: { marginTop: 10, color: '#666' },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    marginHorizontal: 15,
    marginTop: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  headName: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' },
  statusBadge: { backgroundColor: '#fff3e0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { color: '#ef6c00', fontSize: 10, fontWeight: 'bold' },
  info: { fontSize: 14, color: '#4b5563', marginTop: 4 },
  empty: { textAlign: 'center', color: '#9ca3af', fontWeight: '600' },
  emptyHint: { color: '#999', fontSize: 12, marginTop: 4, textAlign: 'center' },
});
