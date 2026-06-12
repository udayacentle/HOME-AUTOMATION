import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import { adminComplianceChecks } from '../data/ahrnData';
import { colors, spacing } from '../theme/tokens';

export default function AdminComplianceScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Compliance Readiness</Text>
      <Text style={styles.muted}>Governance and audit controls for platform operations</Text>

      {adminComplianceChecks.map((check) => (
        <Card key={check.label}>
          <Text style={styles.label}>{check.label}</Text>
          <Text style={styles.status}>{check.status}</Text>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  h1: { fontSize: 26, fontWeight: '700', color: colors.text, marginBottom: 4 },
  muted: { fontSize: 13, color: colors.textMuted, marginBottom: spacing.md },
  label: { fontWeight: '700', color: colors.text, marginBottom: 4 },
  status: { fontSize: 14, color: colors.textMuted },
});
