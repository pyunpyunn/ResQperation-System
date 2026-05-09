import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from "react-native";

function IncidentCard({ item }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.cardTop}>
        <Text style={styles.cardTitle}>#{item.id}</Text>
        <View style={[styles.status, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.cardText}>📍 {item.location}</Text>
        <Text style={styles.cardText}>🚨 {item.type}</Text>
        <Text style={styles.cardText}>👥 {item.team}</Text>
        <Text style={styles.cardText}>⏱️ {item.elapsed}</Text>
      </View>

      <Text style={[styles.priority, { color: getPriorityColor(item.priority) }]}>
        Priority {item.priority}
      </Text>
    </TouchableOpacity>
  );
}

export default function IncidentDashboard() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://YOUR_IP_ADDRESS:5000/incidents", {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setIncidents(data);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchIncidents();
    setRefreshing(false);
  };

  const getActiveRoute = (route) => pathname === route;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.logo}>✱ ResQperation</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Ionicons name="people-outline" size={24} color="#20B2AA" />
            <Text style={styles.statText}>Need Rescue</Text>
            <Text style={styles.statNumber}>12</Text>
          </View>

          <View style={styles.statBox}>
            <Ionicons name="medical-outline" size={24} color="#1E90FF" />
            <Text style={styles.statText}>Medical</Text>
            <Text style={styles.statNumber}>8</Text>
          </View>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Loading incidents...</Text>
            </View>
          ) : incidents.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="document-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>No incidents available</Text>
              <Text style={styles.emptySubtext}>Pull down to refresh</Text>
            </View>
          ) : (
            <FlatList
              data={incidents}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <IncidentCard item={item} />}
              refreshing={refreshing}
              onRefresh={onRefresh}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>

        {/* BOTTOM NAVIGATION */}
        <View style={styles.nav}>
          {[
            { name: "map-outline", label: "Map", route: "/map", activeIcon: "map" },
            { name: "briefcase-outline", label: "Incidents", route: "/dashboard", activeIcon: "briefcase" },
            { name: "add-circle-outline", label: "+", route: "/report", activeIcon: "add-circle" },
            { name: "cube-outline", label: "Resources", route: "/resource", activeIcon: "cube" },
            { name: "person-outline", label: "Profile", route: "/profile", activeIcon: "person" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.navItem}
              onPress={() => router.push(item.route)}
            >
              <Ionicons
                name={getActiveRoute(item.route) ? item.activeIcon : item.name}
                size={24}
                color={getActiveRoute(item.route) ? "#007AFF" : "#8E8E93"}
              />
              <Text style={[
                styles.navText,
                getActiveRoute(item.route) && styles.navTextActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'active': return '#FF6B6B';
    case 'in progress': return '#FFD93D';
    case 'resolved': return '#6BCF70';
    default: return '#E0E0E0';
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 1: return '#FF3B30';
    case 2: return '#FF9500';
    case 3: return '#FFCC00';
    default: return '#8E8E93';
  }
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f2f2f2" },
  container: { flex: 1 },
  
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  logo: { 
    fontSize: 20, 
    fontWeight: "bold",
    color: "#1C1C1E",
  },
  
  headerIcons: { 
    flexDirection: "row",
    gap: 12,
  },
  
  iconButton: {
    padding: 8,
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "#fff",
  },
  
  statBox: { 
    alignItems: "center",
    padding: 12,
  },
  
  statText: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 4,
  },
  
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1C1E",
    marginTop: 2,
  },

  content: {
    flex: 1,
    paddingHorizontal: 12,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#8E8E93",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1C1C1E",
    marginTop: 12,
  },
  
  emptySubtext: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 4,
  },

  listContent: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  
  cardTitle: { 
    fontSize: 18,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  
  status: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },

  cardBody: { 
    gap: 8,
  },
  
  cardText: {
    fontSize: 15,
    color: "#48484A",
  },

  priority: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "700",
  },

  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  
  navItem: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 8,
  },
  
  navText: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 4,
    fontWeight: "500",
  },
  
  navTextActive: {
    color: "#007AFF",
  },
});