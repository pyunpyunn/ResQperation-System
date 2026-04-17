import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView, StatusBar, RefreshControl } from 'react-native';

// 1. Updated Interface to match your Postman/DB exactly
interface Household {
  HouseholdID: number;
  HouseholdHeadName: string;
  Barangay: string;
  PhoneNumber: string;
}

export default function RescuerDashboard() {
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<Household[]>([]);

// Update the port to 9000 here
const API_URL = 'http://192.168.110.113:9000/api/households';

  const fetchData = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // This is the key: if it's not JSON, it will show us the text instead of crashing
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const json = await response.json();
      if (json.data) {
        setData(json.data);
      }
    } else {
      const text = await response.text();
      console.log("Server returned HTML instead of JSON. Check your URL or Firewall.");
      console.log("Response starts with:", text.substring(0, 100));
    }
  } catch (error) {
    console.error("Connection Error:", error);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

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
          <Text style={{marginTop: 10, color: '#666'}}>Connecting to ResQperation Server...</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          contentContainerStyle={{ paddingBottom: 20 }}
          // 2. Use HouseholdID as the unique key
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
              <Text style={styles.info}>📍 Barangay: {item.Barangay}</Text>
              <Text style={styles.info}>📞 Contact: {item.PhoneNumber}</Text>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.center}>
               <Text style={styles.empty}>No active incidents found.</Text>
               <Text style={{color: '#999', fontSize: 12}}>Pull down to refresh</Text>
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
  card: {
    backgroundColor: '#fff',
    padding: 18,
    marginHorizontal: 15,
    marginTop: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  headName: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' },
  statusBadge: { backgroundColor: '#fff3e0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { color: '#ef6c00', fontSize: 10, fontWeight: 'bold' },
  info: { fontSize: 14, color: '#4b5563', marginTop: 4 },
  empty: { textAlign: 'center', color: '#9ca3af', fontWeight: '600' }
});