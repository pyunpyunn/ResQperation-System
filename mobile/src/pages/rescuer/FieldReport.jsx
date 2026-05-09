import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

const STATUS_OPTIONS = [
  { value: "safe", label: "Safe", color: "#2e7d32", bg: "#e8f5e9", border: "#a5d6a7" },
  { value: "evacuated", label: "Evacuated", color: "#1565c0", bg: "#e3f2fd", border: "#90caf9" },
  { value: "injured", label: "Injured", color: "#e65100", bg: "#fff3e0", border: "#ffcc80" },
  { value: "deceased", label: "Deceased", color: "#c62828", bg: "#fce4ec", border: "#f48fb1" },
];

export default function FieldReport() {
  const router = useRouter();
  const pathname = usePathname();

  const [reports, setReports] = useState([]);
  const [showTally, setShowTally] = useState(false);

  const [form, setForm] = useState({
    responder: "",
    barangay: "",
    householdHead: "",
    address: "",
    members: [{ name: "", age: "", status: "safe" }],
    notes: "",
  });

  const addMember = () => {
    setForm({
      ...form,
      members: [...form.members, { name: "", age: "", status: "safe" }],
    });
  };

  const removeMember = (index) => {
    if (form.members.length === 1) return;
    setForm({
      ...form,
      members: form.members.filter((_, i) => i !== index),
    });
  };

  const updateMember = (index, field, value) => {
    const updated = [...form.members];
    updated[index][field] = value;
    setForm({ ...form, members: updated });
  };

  const handleSubmit = () => {
    const newReport = {
      id: Date.now(),
      responder: form.responder,
      barangay: form.barangay,
      householdHead: form.householdHead,
      address: form.address,
      members: form.members,
      notes: form.notes,
      time: new Date().toLocaleString(),
    };
    setReports((prev) => [newReport, ...prev]);
    setForm({
      responder: "",
      barangay: "",
      householdHead: "",
      address: "",
      members: [{ name: "", age: "", status: "safe" }],
      notes: "",
    });
  };

  const deleteReport = (id) => {
    setReports(reports.filter((r) => r.id !== id));
  };

  // TALLY
  const tally = reports.reduce(
    (acc, report) => {
      report.members.forEach((m) => {
        acc.total += 1;
        if (m.status === "safe") acc.safe += 1;
        if (m.status === "evacuated") acc.evacuated += 1;
        if (m.status === "injured") acc.injured += 1;
        if (m.status === "deceased") acc.deceased += 1;
      });
      return acc;
    },
    { total: 0, safe: 0, evacuated: 0, injured: 0, deceased: 0 }
  );

  const getStatusStyle = (val) =>
    STATUS_OPTIONS.find((s) => s.value === val) || STATUS_OPTIONS[0];

  const renderStatusPicker = (member, index) => {
    const status = getStatusStyle(member.status);
    return (
      <TouchableOpacity style={[styles.statusPicker, { 
        backgroundColor: status.bg, 
        borderColor: status.border 
      }]}>
        <Text style={[styles.statusPickerText, { color: status.color }]}>
          {status.label}
        </Text>
        <Ionicons name="chevron-down" size={16} color={status.color} />
      </TouchableOpacity>
    );
  };

  const renderMemberRow = (member, index) => (
    <View key={index} style={styles.memberRow}>
      <TextInput
        style={styles.memberInput}
        placeholder="Name"
        value={member.name}
        onChangeText={(text) => updateMember(index, "name", text)}
      />
      <TextInput
        style={styles.memberAge}
        placeholder="Age"
        value={member.age}
        onChangeText={(text) => updateMember(index, "age", text)}
        keyboardType="numeric"
      />
      {renderStatusPicker(member, index)}
      {form.members.length > 1 && (
        <TouchableOpacity
          style={styles.removeMemberBtn}
          onPress={() => removeMember(index)}
        >
          <Ionicons name="trash-outline" size={16} color="#FF3B30" />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderReportCard = ({ item: report }) => {
    const s = getStatusStyle(report.members[0]?.status || "safe");

    return (
      <View style={styles.reportCard}>
        {/* CARD TOP */}
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <View style={styles.cardTitleContainer}>
              <Ionicons name="home-outline" size={14} color="#666" />
              <Text style={styles.cardTitle}>{report.householdHead}</Text>
            </View>
            <Text style={styles.cardSub}>{report.barangay}</Text>
          </View>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => deleteReport(report.id)}
          >
            <Ionicons name="trash-outline" size={16} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        {/* META */}
        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="person-outline" size={14} color="#666" />
            <Text style={styles.metaText}>{report.responder}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.metaText} numberOfLines={1}>{report.address}</Text>
          </View>
        </View>

        {/* MEMBERS TABLE */}
        <View style={styles.membersTable}>
          <View style={styles.membersTableHeader}>
            <Text style={styles.tableHeaderText}>Name</Text>
            <Text style={styles.tableHeaderText}>Age</Text>
            <Text style={styles.tableHeaderText}>Status</Text>
          </View>
          {report.members.map((m, i) => {
            const status = getStatusStyle(m.status);
            return (
              <View key={i} style={styles.membersTableRow}>
                <Text style={styles.tableCell} numberOfLines={1}>{m.name || "—"}</Text>
                <Text style={styles.tableCell}>{m.age || "—"}</Text>
                <View style={[styles.memberBadge, { 
                  backgroundColor: status.bg, 
                  borderColor: status.border 
                }]}>
                  <Text style={[styles.memberBadgeText, { color: status.color }]}>
                    {status.label}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* MINI TALLY */}
        <View style={styles.miniTally}>
          {STATUS_OPTIONS.map((s) => {
            const count = report.members.filter((m) => m.status === s.value).length;
            if (count === 0) return null;
            return (
              <View key={s.value} style={[styles.miniChip, { 
                backgroundColor: s.bg, 
                borderColor: s.border 
              }]}>
                <Text style={[styles.miniChipText, { color: s.color }]}>
                  {s.label}: {count}
                </Text>
              </View>
            );
          })}
        </View>

        {/* NOTES */}
        {report.notes && (
          <View style={styles.notesBox}>
            <Ionicons name="alert-triangle-outline" size={14} color="#FF9500" />
            <Text style={styles.notesText}>{report.notes}</Text>
          </View>
        )}

        {/* FOOTER */}
        <View style={styles.cardFooter}>
          <Ionicons name="time-outline" size={14} color="#8E8E93" />
          <Text style={styles.footerText}>{report.time}</Text>
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
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="person-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* PAGE HEADER */}
          <View style={styles.pageHeader}>
            <Text style={styles.sectionTitle}>Field Report</Text>
            <TouchableOpacity
              style={[styles.tallyToggle, showTally && styles.tallyToggleActive]}
              onPress={() => setShowTally(!showTally)}
            >
              <Ionicons name="bar-chart-outline" size={18} color="#fff" />
              <Text style={styles.tallyToggleText}>Tally</Text>
            </TouchableOpacity>
          </View>

          {/* TALLY PANEL */}
          {showTally && (
            <View style={styles.tallyPanel}>
              <View style={styles.tallyGrid}>
                <View style={[styles.tallyCard, styles.tallyTotal]}>
                  <Text style={styles.tallyNum}>{tally.total}</Text>
                  <Text style={styles.tallyLabel}>Total</Text>
                </View>
                <View style={[styles.tallyCard, styles.tallySafe]}>
                  <Text style={styles.tallyNum}>{tally.safe}</Text>
                  <Text style={styles.tallyLabel}>Safe</Text>
                </View>
                <View style={[styles.tallyCard, styles.tallyEvacuated]}>
                  <Text style={styles.tallyNum}>{tally.evacuated}</Text>
                  <Text style={styles.tallyLabel}>Evacuated</Text>
                </View>
                <View style={[styles.tallyCard, styles.tallyInjured]}>
                  <Text style={styles.tallyNum}>{tally.injured}</Text>
                  <Text style={styles.tallyLabel}>Injured</Text>
                </View>
                <View style={[styles.tallyCard, styles.tallyDeceased]}>
                  <Text style={styles.tallyNum}>{tally.deceased}</Text>
                  <Text style={styles.tallyLabel}>Deceased</Text>
                </View>
              </View>
            </View>
          )}

          {/* FORM */}
          <View style={styles.form}>
            <View style={styles.formGroupRow}>
              <TextInput
                style={styles.input}
                placeholder="Responder Name"
                value={form.responder}
                onChangeText={(text) => setForm({ ...form, responder: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Barangay"
                value={form.barangay}
                onChangeText={(text) => setForm({ ...form, barangay: text })}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Household Head Name"
              value={form.householdHead}
              onChangeText={(text) => setForm({ ...form, householdHead: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Full Address"
              value={form.address}
              onChangeText={(text) => setForm({ ...form, address: text })}
            />

            {/* MEMBERS */}
            <View style={styles.membersBox}>
              <View style={styles.membersHeader}>
                <Text style={styles.membersHeaderText}>Household Members</Text>
                <TouchableOpacity style={styles.addMemberBtn} onPress={addMember}>
                  <Ionicons name="add-circle-outline" size={18} color="#007AFF" />
                  <Text style={styles.addMemberBtnText}>Add</Text>
                </TouchableOpacity>
              </View>

              {form.members.map((member, index) => renderMemberRow(member, index))}
            </View>

            <TextInput
              style={styles.textarea}
              placeholder="Additional notes (optional)"
              value={form.notes}
              onChangeText={(text) => setForm({ ...form, notes: text })}
              multiline
              numberOfLines={3}
            />

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitBtnText}>Submit Report</Text>
            </TouchableOpacity>
          </View>

          {/* REPORT LIST */}
          <View style={styles.reportList}>
            {reports.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="document-text-outline" size={48} color="#ddd" />
                <Text style={styles.emptyText}>No reports submitted yet</Text>
              </View>
            ) : (
              <FlatList
                data={reports}
                renderItem={renderReportCard}
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
              { icon: "document-text-outline", label: "Reports", route: "/report", active: true },
              { icon: "cube-outline", label: "Resources", route: "/resource" },
              { icon: "call-outline", label: "Call", route: "/profile" },
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
  logoContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoIcon: { fontSize: 24, fontWeight: "bold" },
  logoText: { fontSize: 18, fontWeight: "bold", color: "#1C1C1E" },
  iconBtn: { padding: 8 },

  // Page Header
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  tallyToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#8E8E93",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  tallyToggleActive: {
    backgroundColor: "#007AFF",
  },
  tallyToggleText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  // Tally Panel
  tallyPanel: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#F8F9FA",
  },
  tallyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  tallyCard: {
    flex: 0.18,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    minHeight: 70,
  },
  tallyTotal: { backgroundColor: "#E3F2FD" },
  tallySafe: { backgroundColor: "#E8F5E9" },
  tallyEvacuated: { backgroundColor: "#E1F5FE" },
  tallyInjured: { backgroundColor: "#FFF3E0" },
  tallyDeceased: { backgroundColor: "#FCE4EC" },
  tallyNum: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  tallyLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },

  // Form
  form: { paddingHorizontal: 20, gap: 16, paddingBottom: 20 },
  formGroupRow: { flexDirection: "row", gap: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    textAlignVertical: "top",
    minHeight: 80,
  },
  submitBtn: {
    backgroundColor: "#34C759",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // Members
  membersBox: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  membersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  membersHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  addMemberBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  addMemberBtnText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  memberInput: {
    flex: 1.2,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  memberAge: {
    flex: 0.6,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  statusPicker: {
    flex: 0.9,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusPickerText: {
    fontSize: 14,
    fontWeight: "500",
  },
  removeMemberBtn: {
    padding: 8,
  },

  // Report List
  reportList: { paddingHorizontal: 20, paddingBottom: 20 },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#8E8E93",
  },

  reportCard: {
    backgroundColor: "#fff",
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  cardTitleRow: { gap: 8 },
  cardTitleContainer: { flexDirection: "row", alignItems: "center", gap: 6 },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#1C1C1E" },
  cardSub: { fontSize: 14, color: "#8E8E93" },
  deleteBtn: { padding: 8 },

  cardMeta: { gap: 8, marginBottom: 12 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { fontSize: 14, color: "#48484A" },

  membersTable: {
    marginBottom: 12,
  },
  membersTableHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  membersTableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#F8F8F8",
  },
  tableHeaderText: {
    flex: 1.2,
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  tableCell: {
    flex: 1.2,
    fontSize: 14,
    color: "#48484A",
  },
  memberBadge: {
    flex: 0.9,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: "center",
  },
  memberBadgeText: {
    fontSize: 12,
    fontWeight: "500",
  },

  miniTally: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  miniChip: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  miniChipText: {
    fontSize: 12,
    fontWeight: "500",
  },

  notesBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "#FFF3CD",
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9500",
    marginBottom: 12,
  },
  notesText: {
    flex: 1,
    fontSize: 14,
    color: "#856404",
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  footerText: {
    fontSize: 12,
    color: "#8E8E93",
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