import { StyleSheet, Text, View } from 'react-native';
import colors from '../theme/colors.js';
import spacing from '../theme/spacing.js';

export default function InfoPanel({ title, children }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.title}>{title}</Text>
      {typeof children === 'string' ? <Text style={styles.text}>{children}</Text> : children}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    padding: spacing.lg,
  },
  title: {
    color: colors.textStrong,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  text: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
});
