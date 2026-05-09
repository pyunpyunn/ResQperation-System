import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { login } from '../../services/api.js';
import colors from '../../theme/colors.js';
import spacing from '../../theme/spacing.js';

export default function LoginPage({ apiBaseUrl, onLogin }) {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (isSubmitting) {
      return;
    }

    setError('');

    if (!loginId.trim() || !password) {
      setError('Enter your user ID and temporary password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const session = await login(loginId, password);
      onLogin(session);
    } catch (nextError) {
      setError(nextError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.brandBlock}>
          <Text style={styles.kicker}>RESQPERATION</Text>
          <Text style={styles.title}>Mobile Response</Text>
          <Text style={styles.subtitle}>Sign in with the account issued by HQ.</Text>
        </View>

        <View style={styles.panel}>
          <Text style={styles.label}>User ID</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setLoginId}
            placeholder="RTR-24001 or HHR-24001"
            placeholderTextColor="#7b8884"
            returnKeyType="next"
            style={styles.input}
            textContentType="username"
            value={loginId}
          />

          <Text style={styles.label}>Temporary password</Text>
          <TextInput
            onChangeText={setPassword}
            onSubmitEditing={handleSubmit}
            placeholder="Enter password"
            placeholderTextColor="#7b8884"
            returnKeyType="done"
            secureTextEntry
            style={styles.input}
            textContentType="password"
            value={password}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            disabled={isSubmitting}
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.button,
              pressed && !isSubmitting ? styles.buttonPressed : null,
              isSubmitting ? styles.buttonDisabled : null,
            ]}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Log in</Text>
            )}
          </Pressable>
        </View>

        <Text style={styles.apiHint}>API: {apiBaseUrl}</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.screen,
  },
  brandBlock: {
    marginBottom: spacing.xxl,
  },
  kicker: {
    color: colors.rescuer,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 10,
  },
  title: {
    color: colors.heading,
    fontSize: 34,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 23,
    marginTop: spacing.sm,
  },
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  label: {
    color: colors.textStrong,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.borderStrong,
    borderRadius: 6,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    marginBottom: spacing.lg,
    minHeight: 48,
    paddingHorizontal: 14,
  },
  error: {
    backgroundColor: colors.dangerBackground,
    borderColor: colors.dangerBorder,
    borderRadius: 6,
    borderWidth: 1,
    color: colors.dangerText,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.rescuer,
    borderRadius: 6,
    minHeight: 50,
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: colors.rescuerPressed,
  },
  buttonDisabled: {
    opacity: 0.72,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  apiHint: {
    color: colors.textSoft,
    fontSize: 12,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
});
