import { StyleSheet, Text, View } from 'react-native';
import colors from '../theme/colors.js';
import spacing from '../theme/spacing.js';
import LogoutButton from './LogoutButton.jsx';

export default function AppHeader({ roleLabel, title, accentColor, onLogout }) {
  return (
    <View style={styles.header}>
      <View style={styles.titleBlock}>
        <Text style={[styles.kicker, { color: accentColor }]}>{roleLabel}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <LogoutButton onPress={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingTop: 56,
  },
  titleBlock: {
    flex: 1,
    paddingRight: spacing.md,
  },
  kicker: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
  },
  title: {
    color: colors.heading,
    fontSize: 24,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
});
