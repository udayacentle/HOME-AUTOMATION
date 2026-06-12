import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ROLE_META } from '../../auth/credentials';
import type { UserRole } from '../../auth/types';
import BrandTitle from '../../components/BrandTitle';
import { useAuth } from '../../context/AuthContext';
import { colors, spacing } from '../../theme/tokens';

const roleOrder: UserRole[] = ['homeowner', 'technician', 'admin', 'superadmin'];

export default function RoleSelectScreen() {
  const { selectRole } = useAuth();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <BrandTitle />
        <Text style={styles.tagline}>Select your role to sign in</Text>
      </View>

      {roleOrder.map((role) => {
        const meta = ROLE_META[role];
        return (
          <Pressable
            key={role}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed, { borderLeftColor: meta.accent }]}
            onPress={() => selectRole(role)}
          >
            <Text style={[styles.roleTitle, { color: meta.accent }]}>{meta.title}</Text>
            <Text style={styles.subtitle}>{meta.subtitle}</Text>
            <View style={styles.screenList}>
              {meta.screens.map((screen) => (
                <Text key={screen} style={styles.screenItem}>
                  • {screen}
                </Text>
              ))}
            </View>
            <Text style={styles.signInHint}>Tap to open login →</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  header: { marginBottom: spacing.lg, gap: spacing.sm },
  tagline: { fontSize: 15, color: colors.textMuted },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardPressed: { opacity: 0.85 },
  roleTitle: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 13, color: colors.textMuted, marginBottom: spacing.sm },
  screenList: { gap: 2, marginBottom: spacing.sm },
  screenItem: { fontSize: 12, color: colors.text },
  signInHint: { fontSize: 12, color: colors.accent, fontWeight: '600' },
});
