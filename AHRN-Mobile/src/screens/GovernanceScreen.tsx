import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import { superAdminPolicies } from '../data/ahrnData';
import { colors, spacing } from '../theme/tokens';

export default function GovernanceScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>AI / Governance</Text>
      <Text style={styles.muted}>Model info, risk artifacts, and platform policies</Text>

      <Card title="Risk Artifacts" accent={colors.warning}>
        <Text style={styles.body}>Explainability logs retained for 365 days (PII-redacted)</Text>
        <Text style={styles.body}>Canary traffic: 12% on LLaMA Reliability v2.1</Text>
        <Text style={styles.body}>Rollback ready to Rules-only fallback v1.4</Text>
      </Card>

      <Card title="Platform Policies" accent={colors.accent}>
        {superAdminPolicies.map((policy) => (
          <View key={policy} style={styles.policyRow}>
            <Text style={styles.policyOk}>OK</Text>
            <Text style={styles.policyText}>{policy}</Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  h1: { fontSize: 26, fontWeight: '700', color: colors.text, marginBottom: 4 },
  muted: { fontSize: 13, color: colors.textMuted, marginBottom: spacing.md },
  body: { fontSize: 14, color: colors.text, marginBottom: spacing.sm },
  policyRow: { flexDirection: 'row', gap: 10, marginBottom: spacing.sm },
  policyOk: { color: colors.success, fontWeight: '700' },
  policyText: { flex: 1, fontSize: 14, color: colors.text, lineHeight: 20 },
});
