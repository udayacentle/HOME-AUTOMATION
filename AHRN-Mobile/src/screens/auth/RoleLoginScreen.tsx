import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ROLE_META } from '../../auth/credentials';
import PrimaryButton from '../../components/PrimaryButton';
import { useAuth } from '../../context/AuthContext';
import { colors, spacing } from '../../theme/tokens';

export default function RoleLoginScreen() {
  const { pendingRole, clearPendingRole, login } = useAuth();
  const meta = pendingRole ? ROLE_META[pendingRole] : null;
  const [email, setEmail] = useState(meta?.demoEmail ?? '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (meta) {
      setEmail(meta.demoEmail);
      setPassword(meta.demoPassword);
      setError(null);
    }
  }, [meta?.demoEmail, meta?.demoPassword, pendingRole]);

  if (!meta || !pendingRole) return null;

  const handleLogin = () => {
    const err = login(pendingRole, email, password);
    setError(err);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Pressable onPress={clearPendingRole} style={styles.backBtn}>
          <Text style={styles.backText}>← All roles</Text>
        </Pressable>

        <View style={[styles.badge, { backgroundColor: meta.accent + '22', borderColor: meta.accent }]}>
          <Text style={[styles.badgeText, { color: meta.accent }]}>{meta.title}</Text>
        </View>

        <Text style={styles.h1}>Sign in</Text>
        <Text style={styles.muted}>{meta.subtitle}</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor={colors.textMuted}
            placeholder="you@example.com"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={colors.textMuted}
            placeholder="Enter password"
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <PrimaryButton label={`Enter as ${meta.title}`} onPress={handleLogin} />

          <View style={styles.demoBox}>
            <Text style={styles.demoTitle}>Demo credentials</Text>
            <Text style={styles.demoLine}>Email: {meta.demoEmail}</Text>
            <Text style={styles.demoLine}>Password: {meta.demoPassword}</Text>
          </View>

          <Text style={styles.screensTitle}>Screens after login</Text>
          {meta.screens.map((screen) => (
            <Text key={screen} style={styles.screenItem}>
              ✓ {screen}
            </Text>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  backBtn: { marginBottom: spacing.md },
  backText: { color: colors.accent, fontSize: 14, fontWeight: '600' },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: spacing.md,
  },
  badgeText: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  h1: { fontSize: 28, fontWeight: '700', color: colors.text, marginBottom: 4 },
  muted: { fontSize: 14, color: colors.textMuted, marginBottom: spacing.lg },
  form: { gap: spacing.sm },
  label: { fontSize: 13, color: colors.textMuted, fontWeight: '600', marginTop: spacing.sm },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 15,
  },
  error: { color: colors.danger, fontSize: 13, marginTop: spacing.xs },
  demoBox: {
    marginTop: spacing.md,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 4,
  },
  demoTitle: { color: colors.text, fontWeight: '700', marginBottom: 4 },
  demoLine: { color: colors.textMuted, fontSize: 13 },
  screensTitle: { color: colors.text, fontWeight: '700', marginTop: spacing.lg, marginBottom: 4 },
  screenItem: { color: colors.textMuted, fontSize: 13, lineHeight: 22 },
});
