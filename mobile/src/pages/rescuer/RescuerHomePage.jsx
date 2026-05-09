import { StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader.jsx';
import InfoPanel from '../../components/InfoPanel.jsx';
import colors from '../../theme/colors.js';
import spacing from '../../theme/spacing.js';

export default function RescuerHomePage({ user, onLogout }) {
  return (
    <View style={styles.screen}>
      <AppHeader
        accentColor={colors.rescuer}
        onLogout={onLogout}
        roleLabel="RESCUER"
        title="Field Console"
      />

      <View style={styles.content}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.meta}>Login ID: {user.login_id}</Text>

        <InfoPanel title="Current Status">Signed in and ready for dispatch updates.</InfoPanel>

        <InfoPanel title="Assignments">No active assignment has been loaded yet.</InfoPanel>
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
