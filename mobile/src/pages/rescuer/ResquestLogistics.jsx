import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RESOURCE_TEMPLATE = [
  { name: "Food Packs" },
  { name: "Water Bottles" },
  { name: "Medicine Kits" },
  { name: "Blankets" },
  { name: "Flashlights" },
];

export default function ResourceDashboard() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    cluster: "",
    resources: [],
  });

  const statusSteps = ["pending", "in-transit", "delivered", "cancelled"];

  const cancelRequest = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "cancelled" } : req
      )
    );
  };

  const handleResourceSelect = (value) => {
    if (!value) return;
    const exists = form.resources.find((r) => r.name === value);
    if (exists) return;
    setForm({
      ...form,
      resources: [...form.resources, { name: value, quantity: 1 }],
    });
  };

  const increaseQty = (index) => {
    const updated = [...form.resources];
    updated[index].quantity += 1;
    setForm({ ...form, resources: updated });
  };

  const decreaseQty = (index) => {
    const updated = [...form.resources];
    if (updated[index].quantity > 1) updated[index].quantity -= 1;
    setForm({ ...form, resources: updated });
  };

  const removeResource = (index) => {
    const updated = form.resources.filter((_, i) => i !== index);
    setForm({ ...form, resources: updated });
  };

  const deleteRequest = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
  };

  const handleSubmit = () => {
    const newRequest = {
      id: Date.now(),
      name: form.name,
      location: form.location,
      cluster: form.cluster,
      resources: form.resources,
      status: "pending",
      time: new Date().toLocaleString(),
    };
    setRequests((prev) => [newRequest, ...prev]);
    setForm({ name: "", location: "", cluster: "", resources: [] });
  };

  const getStepIndex = (status) => statusSteps.indexOf(status);

  const getStatusBadge = (status) => {
    const map = {
      pending:    { label: "Pending",    color: "#FF9500", bg: "#FFF5E6" },
      "in-transit": { label: "In Transit", color: "#007AFF", bg: "#E6F0FF" },
      delivered:  { label: "Delivered",  color: "#34C759", bg: "#E6FCE6" },
      cancelled:  { label: "Cancelled",  color: "#FF3B30", bg: "#FFE6E6" },
    };
    return map[status] || map.pending;
  };

  const renderResourcePicker = () => (
    <View style={styles.pickerContainer}>
      <Text style={styles.pickerLabel}>Select Resource</Text>
      <View style={styles.picker}>
        {RESOURCE_TEMPLATE.map((resource, index) => (
          <TouchableOpacity
            key={index}
            style={styles.pickerItem}
            onPress={() => handleResourceSelect(resource.name)}
          >
            <Ionicons name="cube-outline" size={16} color="#666" />
            <Text style={styles.pickerItemText}>{resource.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderSelectedResources = () => (
    <View style={styles.selectedBox}>
      <Text style={styles.selectedTitle}>Selected Resources</Text>
      {form.resources.map((item, index) => (
        <View key={index} style={styles.qtyRow}>
          <Text style={styles.resourceName}>{item.name}</Text>
          <View style={styles.qtyControl}>
            <TouchableOpacity 
              style={styles.qtyBtn} 
              onPress={() => decreaseQty(index)}
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyNumber}>{item.quantity}</Text>
            <TouchableOpacity 
              style={styles.qtyBtn} 
              onPress={() => increaseQty(index)}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => removeResource(index)}
          >
            <Ionicons name="trash-outline" size={16} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderRequestCard = ({ item: req }) => {
    const step = getStepIndex(req.status);
    const badge = getStatusBadge(req.status);

    return (
      <View style={[
        styles.reportCard, 
        req.status === "cancelled" && styles.cardCancelled
      ]}>
        {/* CARD HEADER */}
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>Resource Request</Text>
            <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
              <Text style={[styles.statusBadgeText, { color: badge.color }]}>
                {badge.label}
              </Text>
            </View>
          </View>
          <View style={styles.cardActions}>
            {req.status !== "cancelled" && (
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => cancelRequest(req.id)}
              >
                <Ionicons name="close-circle-outline" size={16} color="#FF3B30" />
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deleteRequest(req.id)}
            >
              <Ionicons name="trash-outline" size={16} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        </View>

        {/* CARD META */}
        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="person-outline" size={14} color="#666" />
            <Text style={styles.metaText}>{req.name}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.metaText}>{req.location}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="ribbon-outline" size={14} color="#666" />
            <Text style={styles.metaText}>{req.cluster}</Text>
          </View>
        </View>

        {/* RESOURCE CHIPS */}
        <View style={styles.resourceChips}>
          {req.resources.map((r, i) => (
            <View key={i} style={styles.chip}>
              <Ionicons name="cube-outline" size={12} color="#007AFF" />
              <Text style={styles.chipText}>{r.name} × {r.quantity}</Text>
            </View>
          ))}
        </View>

        {/* TRACKER or CANCELLED */}
        {req.status !== "cancelled" ? (
          <View style={styles.tracker}>
            {["Pending", "In Transit", "Delivered"].map((label, i) => (
              <View key={i} style={styles.stepContainer}>
                <View style={[
                  styles.stepDot, 
                  step >= i ? styles.stepActive : styles.stepInactive
                ]} />
                <Text style={[
                  styles.stepLabel,
                  step >= i ? styles.stepLabelActive : styles.stepLabelInactive
                ]}>
                  {label}
                </Text>
                {i < 2 && (
                  <View style={[
                    styles.line,
                    step > i ? styles.lineActive : styles.lineInactive
                  ]} />
                )}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.cancelledBanner}>
            <Ionicons name="close-circle-outline" size={16} color="#FF3B30" />
            <Text style={styles.cancelledText}>This request has been cancelled</Text>
          </View>
        )}

        {/* TIMESTAMP */}
        <View style={styles.cardFooter}>
          <Ionicons name="time-outline" size={12} color="#666" />
          <Text style={styles.footerText}>{req.time}</Text>
        </View>
      </View>
    );
  };

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

          <Text style={styles.sectionTitle}>Resource Tracking</Text>

          {/* FORM */}
          <View style={styles.form}>
            <View style={styles.resourcesRow}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Location"
                value={form.location}
                onChangeText={(text) => setForm({ ...form, location: text })}
              />
            </View>

            <View style={styles.selectContainer}>
              <Text style={styles.selectLabel}>Select Cluster</Text>
              <View style={styles.select}>
                <TouchableOpacity style={styles.selectItem}>
                  <Text style={styles.selectItemText}>Search and Rescue</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.selectItem}>
                  <Text style={styles.selectItemText}>Medical/EMS</Text>
                </TouchableOpacity>
              </View>
            </View>

            {renderResourcePicker()}
            {form.resources.length > 0 && renderSelectedResources()}

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitBtnText}>Request Resource</Text>
            </TouchableOpacity>
          </View>

          {/* REQUEST LIST */}
          <View style={styles.reportList}>
            {requests.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="cube-outline" size={48} color="#ddd" />
                <Text style={styles.emptyText}>No requests yet</Text>
              </View>
            ) : (
              <FlatList
                data={requests}
                renderItem={renderRequestCard}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>

          {/* BOTTOM NAV */}
          <View style={styles.nav}>
            {[
              { icon: "map-outline", label: "Map", route: "/map" },
              { icon: "briefcase-outline", label: "Incidents", route: "/dashboard" },
              { icon: "document-text-outline", label: "Reports", route: "/report" },
              { icon: "cube-outline", label: "Resources", route: "/resource", active: true },
              { icon: "people-outline", label: "Profile", route: "/profile" },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.navItem}>
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
  logoContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoIcon: { fontSize: 24, fontWeight: "bold" },
  logoText: { fontSize: 18, fontWeight: "bold", color: "#1C1C1E" },
  headerIcons: { flexDirection: "row", gap: 12 },
  iconBtn: { padding: 8 },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1C1E",
    margin: 20,
    marginBottom: 16,
  },

  // Form
  form: { paddingHorizontal: 20, gap: 16 },
  resourcesRow: { flexDirection: "row", gap: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  selectContainer: { gap: 8 },
  selectLabel: { fontSize: 14, color: "#666", fontWeight: "500" },
  select: { gap: 8 },
  selectItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
  },
  selectItemText: { fontSize: 16, color: "#1C1C1E" },

  pickerContainer: { gap: 8 },
  pickerLabel: { fontSize: 14, color: "#666", fontWeight: "500" },
  picker: { 
    maxHeight: 200,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 8,
  },
  pickerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  pickerItemText: { fontSize: 16, color: "#1C1C1E" },

  selectedBox: {
    backgroundColor: "#F0F8FF",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  selectedTitle: { fontSize: 16, fontWeight: "600", color: "#1C1C1E" },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  resourceName: { fontSize: 15, flex: 1 },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 8,
  },
  qtyBtn: { padding: 8 },
  qtyBtnText: { fontSize: 18, fontWeight: "bold", color: "#007AFF" },
  qtyNumber: {
    minWidth: 24,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  removeBtn: { padding: 8 },

  submitBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // List
  reportList: { paddingHorizontal: 20, paddingBottom: 20 },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: { fontSize: 16, color: "#8E8E93" },

  reportCard: {
    backgroundColor: "#fff",
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  cardCancelled: {
    backgroundColor: "#FFF5F5",
    borderColor: "#FFE6E6",
  },

  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  cardTitleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  cardTitle: { fontSize: 16, fontWeight: "600" },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusBadgeText: { fontSize: 12, fontWeight: "600" },

  cardActions: { flexDirection: "row", gap: 8 },
  cancelBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#FFF5F5",
    borderRadius: 20,
  },
  cancelBtnText: { fontSize: 12, color: "#FF3B30", fontWeight: "500" },
  deleteBtn: { padding: 6 },

  cardMeta: { gap: 8, marginBottom: 12 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { fontSize: 14, color: "#48484A" },

  resourceChips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F0F8FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipText: { fontSize: 13, color: "#007AFF" },

  tracker: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 12,
  },
  stepContainer: { alignItems: "center", flex: 1 },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginBottom: 4,
  },
  stepActive: { backgroundColor: "#007AFF" },
  stepInactive: { backgroundColor: "#E0E0E0" },
  stepLabel: { fontSize: 12, textAlign: "center" },
  stepLabelActive: { color: "#007AFF", fontWeight: "500" },
  stepLabelInactive: { color: "#8E8E93" },
  line: {
    flex: 1,
    height: 2,
    borderRadius: 1,
    marginHorizontal: 8,
  },
  lineActive: { backgroundColor: "#007AFF" },
  lineInactive: { backgroundColor: "#E0E0E0" },

  cancelledBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFE6E6",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  cancelledText: { color: "#FF3B30", fontSize: 14 },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  footerText: { fontSize: 12, color: "#8E8E93" },

  // Navigation
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
  navItem: { alignItems: "center", flex: 1 },
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