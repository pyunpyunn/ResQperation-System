import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const pathname = usePathname();

  const settings = [
    { icon: "person-outline", label: "Personal information" },
    { icon: "shield-checkmark-outline", label: "Login & security" },
    { icon: "card-outline", label: "Payments and payouts" },
    { icon: "accessibility-outline", label: "Accessibility" },
  ];

  const handleLogout = () => {
    router.push("/login");
  };

  const renderSettingItem = (item, index) => (
    <TouchableOpacity key={index} style={styles.settingsItem}>
      <View style={styles.settingsLeft}>
        <Ionicons name={item.icon} size={22} color="#007AFF" />
        <Text style={styles.settingsLabel}>{item.label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <ScrollView style={styles.container}>
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

          {/* PROFILE TITLE */}
          <Text style={styles.profileTitle}>Profile</Text>

          {/* SCROLLABLE CONTENT */}
          <View style={styles.content}>

            {/* USER CARD */}
            <View style={styles.userCard}>
              <View style={styles.userLeft}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>👤</Text>
                </View>
                <View>
                  <Text style={styles.userName}>Emily Johnson</Text>
                  <Text style={styles.userRole}>Search & Rescue Responder</Text>
                </View>
              </View>
            </View>

            {/* PROMO CARD */}
            <View style={styles.promoCard}>
              <View style={styles.promoContent}>
                <Text style={styles.promoTitle}>Cebu Emergency and Rescue Services</Text>
                <Text style={styles.promoText}>
                  Committed in saving lives and building a safer community
                </Text>
              </View>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNjfX2F7RCWkODnD4m-var9hD5-7w86c169Q&s"
                }}
                style={styles.promoImage}
                resizeMode="contain"
              />
            </View>

            {/* SETTINGS */}
            <Text style={styles.settingsTitle}>Settings</Text>

            <View style={styles.settingsList}>
              {settings.map((item, index) => renderSettingItem(item, index))}
            </View>

          </View>

          {/* LOGOUT BUTTON */}
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutBtnText}>LogOut →</Text>
          </TouchableOpacity>

          {/* BOTTOM NAV */}
          <View style={styles.nav}>
            {[
              { icon: "map-outline", label: "Map", route: "/map" },
              { icon: "briefcase-outline", label: "Incidents", route: "/dashboard" },
              { icon: "document-text-outline", label: "Reports", route: "/report" },
              { icon: "cube-outline", label: "Resources", route: "/resource" },
              { icon: "people-outline", label: "Profile", route: "/profile", active: true },
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f2f2f2" },
  container: { flex: 1 },

  dashboardCard: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    paddingBottom: 20,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoIcon: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1C1E",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 12,
  },
  iconBtn: {
    padding: 8,
  },

  profileTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1C1C1E",
    margin: 24,
    marginBottom: 16,
  },

  // Content
  content: {
    paddingHorizontal: 24,
    gap: 20,
  },

  // User Card
  userCard: {
    backgroundColor: "#F8F9FA",
    padding: 20,
    borderRadius: 16,
  },
  userLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E6F0FF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 24,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 2,
  },
  userRole: {
    fontSize: 16,
    color: "#8E8E93",
  },

  // Promo Card
  promoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#FFF5F5",
    padding: 20,
    borderRadius: 16,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  promoText: {
    fontSize: 14,
    color: "#48484A",
    lineHeight: 20,
  },
  promoImage: {
    width: 60,
    height: 60,
  },

  // Settings
  settingsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 12,
  },
  settingsList: {
    gap: 4,
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  settingsLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingsLabel: {
    fontSize: 16,
    color: "#1C1C1E",
  },

  // Logout Button
  logoutBtn: {
    marginHorizontal: 24,
    marginVertical: 20,
    backgroundColor: "#FF3B30",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // Bottom Navigation
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    marginTop: 20,
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