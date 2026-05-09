import { Pressable, StyleSheet, Text } from 'react-native';
import colors from '../theme/colors.js';
import spacing from '../theme/spacing.js';

export default function LogoutButton({ onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
    >
      <Text style={styles.text}>Logout</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: colors.borderStrong,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
  },
  buttonPressed: {
    backgroundColor: colors.surfaceMuted,
  },
  text: {
    color: colors.textStrong,
    fontSize: 13,
    fontWeight: '800',
  },
});
