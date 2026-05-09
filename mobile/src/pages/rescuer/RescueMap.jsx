import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
} from "react-native";
import MapView, { 
  Marker, 
  Circle, 
  PROVIDER_GOOGLE,
  LATITUDE_DELTA,
  LONGITUDE_DELTA 
} from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import * as Location from "expo-location";

export default function MapView() {
  const router = useRouter();
  const pathname = usePathname();

  const [flyTarget, setFlyTarget] = useState(null);
  const [myPosition, setMyPosition] = useState(null);
  const [locError, setLocError] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [usingRealGPS, setUsingRealGPS] = useState(false);

  // Mock incidents data
  const [incidents] = useState([
    {
      id: 1,
      position: { latitude: 10.3157, longitude: 123.8854 },
      title: "Flood Incident",
      type: "Flood",
      needsHelp: 15,
      critical: 3,
      injured: 8,
      safe: 4,
    },
    {
      id: 2,
      position: { latitude: 10.3200, longitude: 123.8900 },
      title: "Building Collapse",
      type: "Structural",
      needsHelp: 22,
      critical: 7,
      injured: 12,
      safe: 3,
    },
    {
      id: 3,
      position: { latitude: 10.3100, longitude: 123.8800 },
      title: "Medical Emergency",
      type: "Medical",
      needsHelp: 8,
      critical: 2,
      injured: 5,
      safe: 1,
    },
  ]);

  const watchRef = useRef(null);
  const simRef = useRef(null);

  // Calculate totals
  const totalNeedsHelp = incidents.reduce((sum, inc) => sum + inc.needsHelp, 0);
  const totalCritical = incidents.reduce((sum, inc) => sum + inc.critical, 0);
  const totalInjured = incidents.reduce((sum, inc) => sum + inc.injured, 0);
  const totalSafe = incidents.reduce((sum, inc) => sum + inc.safe, 0);

  const mapCenter = myPosition || {
    latitude: 10.3157,
    longitude: 123.8854,
  };

  // GPS Tracking
  const startTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocError("Location permission denied");
        return;
      }

      setLocError(null);
      setTracking(true);

      watchRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 1,
        },
        (pos) => {
          setUsingRealGPS(true);
          setMyPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setLastUpdated(new Date().toLocaleTimeString());
          if (simRef.current) {
            clearInterval(simRef.current);
            simRef.current = null;
          }
        }
      );
    } catch (error) {
      setUsingRealGPS(false);
      startSimulation();
    }
  };

  const startSimulation = () => {
    const base = { latitude: 10.3157, longitude: 123.8854 };
    setMyPosition(base);
    setLastUpdated(new Date().toLocaleTimeString());
    
    simRef.current = setInterval(() => {
      setMyPosition({
        latitude: base.latitude + (Math.random() - 0.5) * 0.001,
        longitude: base.longitude + (Math.random() - 0.5) * 0.001,
      });
      setLastUpdated(new Date().toLocaleTimeString());
    }, 4000);
  };

  const stopTracking = () => {
    if (watchRef.current) {
      watchRef.current.remove();
      watchRef.current = null;
    }
    if (simRef.current) {
      clearInterval(simRef.current);
      simRef.current = null;
    }
    setTracking(false);
    setMyPosition(null);
    setLastUpdated(null);
    setUsingRealGPS(false);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (watchRef.current) watchRef.current.remove();
      if (simRef.current) clearInterval(simRef.current);
    };
  }, []);

  const handleIncidentPress = (incident) => {
    router.push(`/dashboard?incident=${incident.id}`);
  };

  const handleViewAll = () => {
    router.push("/dashboard");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <View style={styles.container}>
        <View style={styles.dashboardCard}>
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoIcon}>✱</Text>
              <Text style={styles.logoText}>ResQperation</Text>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="search" size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="notifications-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* STATUS BAR */}
          <View style={styles.mapStatusBar}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.statusChipsContainer}
              contentContainerStyle={styles.statusChips}
            >
              <View style={[styles.chipStat, styles.chipCritical]}>
                <Text style={styles.chipStatNumber}>{totalNeedsHelp}</Text>
                <Text style={styles.chipStatLabel}>Need Help</Text>
              </View>
              <View style={[styles.chipStat, styles.chipCritical]}>
                <Text style={styles.chipStatNumber}>{totalCritical}</Text>
                <Text style={styles.chipStatLabel}>Critical</Text>
              </View>
              <View style={[styles.chipStat, styles.chipInjured]}>
                <Text style={styles.chipStatNumber}>{totalInjured}</Text>
                <Text style={styles.chipStatLabel}>Injured</Text>
              </View>
              <View style={[styles.chipStat, styles.chipSafe]}>
                <Text style={styles.chipStatNumber}>{totalSafe}</Text>
                <Text style={styles.chipStatLabel}>Safe</Text>
              </View>
            </ScrollView>
            <TouchableOpacity
              style={[styles.trackBtn, tracking && styles.trackBtnActive]}
              onPress={tracking ? stopTracking : startTracking}
            >
              <Ionicons 
                name="location-outline" 
                size={16} 
                color="#fff" 
              />
              <Text style={styles.trackBtnText}>
                {tracking ? "Stop" : "Track Me"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* FEEDBACK */}
          {locError && (
            <View style={styles.locError}>
              <Ionicons name="alert-circle-outline" size={16} color="#FF3B30" />
              <Text style={styles.locErrorText}>{locError}</Text>
            </View>
          )}
          {tracking && lastUpdated && (
            <View style={styles.locUpdated}>
              <Ionicons name="refresh-outline" size={14} color="#34C759" />
              <Text style={styles.locUpdatedText}>
                {usingRealGPS ? "Real GPS" : "Simulated"} · {lastUpdated}
              </Text>
            </View>
          )}

          {/* MAP */}
          <View style={styles.mapWrapper}>
            <MapView
              style={styles.mapBox}
              initialRegion={{
                ...mapCenter,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              region={
                myPosition
                  ? {
                      ...myPosition,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }
                  : undefined
              }
              showsUserLocation={false}
              showsMyLocationButton={false}
              zoomEnabled={true}
              rotateEnabled={false}
              scrollEnabled={true}
              provider={PROVIDER_GOOGLE}
              customMapStyle={[]}
            >
              {/* My Position Circle */}
              {myPosition && (
                <Circle
                  center={myPosition}
                  radius={80}
                  strokeColor="#1565c0"
                  fillColor="#1565c0"
                  strokeWidth={2}
                  opacity={0.3}
                />
              )}

              {/* My Position Marker */}
              {myPosition && (
                <Marker
                  coordinate={myPosition}
                  title="Your Location"
                  description={usingRealGPS ? "Real GPS" : "Simulated"}
                  pinColor="blue"
                />
              )}

              {/* Incidents Markers */}
              {incidents.map((incident) => (
                <Marker
                  key={incident.id}
                  coordinate={incident.position}
                  title={incident.title}
                  description={`${incident.needsHelp} need help`}
                  pinColor="orange"
                  onPress={() => handleIncidentPress(incident)}
                />
              ))}
            </MapView>
          </View>

          {/* BOTTOM INFO */}
          <View style={styles.mapInfo}>
            <View style={styles.infoStats}>
              <View style={styles.infoStat}>
                <Text style={styles.infoNumber}>{totalNeedsHelp}</Text>
                <Text style={styles.infoLabel}>Total Need Help</Text>
              </View>
              <View style={styles.infoStat}>
                <Text style={styles.infoNumber}>{incidents.length}</Text>
                <Text style={styles.infoLabel}>Active Incidents</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.infoBtn} onPress={handleViewAll}>
              <Text style={styles.infoBtnText}>View All Incidents →</Text>
            </TouchableOpacity>
          </View>

          {/* BOTTOM NAV */}
          <View style={styles.nav}>
            {[
              { icon: "map-outline", label: "Map", route: "/map", active: true },
              { icon: "briefcase-outline", label: "Incidents", route: "/dashboard" },
              { icon: "document-text-outline", label: "Reports", route: "/report" },
              { icon: "cube-outline", label: "Resources", route: "/resource" },
              { icon: "people-outline", label: "Profile", route: "/profile" },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.navItem}
                onPress={() => router.push(item.route)}
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={item.active ? "#007AFF" : "#8E8E93"}
                />
                <Text style={[
                  styles.navText,
                  item.active && styles.navTextActive
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f2f2f2" },
  container: { flex: 1 },

  dashboardCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    margin: 16,
    overflow: "hidden",
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  logoContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoIcon: { fontSize: 24, fontWeight: "bold" },
  logoText: { fontSize: 18, fontWeight: "bold", color: "#1C1C1E" },
  headerIcons: { flexDirection: "row", gap: 12 },
  iconBtn: { padding: 8 },

  // Status Bar
  mapStatusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#F8F9FA",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  statusChipsContainer: { flex: 1 },
  statusChips: {
    flexDirection: "row",
    gap: 8,
    paddingRight: 16,
  },
  chipStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    justifyContent: "center",
  },
  chipCritical: { backgroundColor: "#FFF3CD" },
  chipInjured: { backgroundColor: "#FFF3E0" },
  chipSafe: { backgroundColor: "#E8F5E9" },
  chipStatNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  chipStatLabel: {
    fontSize: 12,
    color: "#666",
  },
  trackBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#8E8E93",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  trackBtnActive: {
    backgroundColor: "#007AFF",
  },
  trackBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  // Feedback
  locError: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FFF3F3",
    borderBottomWidth: 1,
    borderBottomColor: "#FFE6E6",
  },
  locErrorText: {
    color: "#FF3B30",
    fontSize: 14,
  },
  locUpdated: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#E8F5E9",
  },
  locUpdatedText: {
    fontSize: 13,
    color: "#2E7D32",
    fontWeight: "500",
  },

  // Map
  mapWrapper: { flex: 1, overflow: "hidden" },
  mapBox: { flex: 1 },

  // Bottom Info
  mapInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8F9FA",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  infoStats: {
    flexDirection: "row",
    gap: 24,
  },
  infoStat: {
    alignItems: "center",
  },
  infoNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  infoLabel: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 2,
  },
  infoBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  infoBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  // Navigation
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  navText: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 4,
    fontWeight: "500",
  },
  navTextActive: {
    color: "#007AFF",
    fontWeight: "600",
  },
});