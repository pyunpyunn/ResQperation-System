import { StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader.jsx';
import InfoPanel from '../../components/InfoPanel.jsx';
import colors from '../../theme/colors.js';
import spacing from '../../theme/spacing.js';

export default function HouseholdHomePage({ user, onLogout }) {
  return (
    <View style={styles.screen}>
      <AppHeader
        accentColor={colors.household}
        onLogout={onLogout}
        roleLabel="HOUSEHOLD"
        title="Resident Portal"
      />

      <View style={styles.content}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.meta}>Login ID: {user.login_id}</Text>

        <InfoPanel title="Household Status">No household alert has been loaded yet.</InfoPanel>

        <InfoPanel title="Help Requests">
          Request submission will appear here when that backend endpoint is ready.
        </InfoPanel>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
  },
  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  meta: {
    color: colors.textSoft,
    fontSize: 14,
    marginBottom: 20,
    marginTop: 6,
  },
});
