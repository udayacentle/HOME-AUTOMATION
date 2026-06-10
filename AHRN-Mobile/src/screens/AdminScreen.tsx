import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import {
  accuracyMonths,
  accuracyTrend,
  adminComplianceChecks,
  adminDisputes,
  adminKpis,
  pofOutcomes,
} from '../data/ahrnData';
import { resolveColor } from '../theme/colorMap';
import { colors, spacing } from '../theme/tokens';

export default function AdminScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Admin Market Dashboard</Text>
      <Text style={styles.muted}>Platform-wide reliability and cost metrics</Text>

      {adminKpis.map((kpi) => (
        <Card key={kpi.label} accent={resolveColor(kpi.colorKey)}>
          <Text style={styles.muted}>{kpi.label}</Text>
          <Text style={[styles.kpiValue, { color: resolveColor(kpi.colorKey) }]}>{kpi.value}</Text>
          <Text style={styles.muted}>{kpi.change}</Text>
        </Card>
      ))}

      <Card title="Prediction Accuracy Trend">
        <View style={styles.chart}>
          {accuracyTrend.map((val, i) => (
            <View key={accuracyMonths[i]} style={styles.barCol}>
              <View style={[styles.bar, { height: val * 1.2, opacity: 0.6 + i * 0.08 }]} />
              <Text style={styles.barLabel}>{accuracyMonths[i]}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card title="Proof-of-Fix Outcomes">
        {pofOutcomes.map((item) => (
          <View key={item.label} style={styles.outcomeRow}>
            <View style={styles.outcomeHeader}>
              <Text style={styles.outcomeLabel}>{item.label}</Text>
              <Text style={styles.outcomePct}>{item.pct}%</Text>
            </View>
            <View style={styles.track}>
              <View
                style={[styles.fill, { width: `${item.pct}%`, backgroundColor: resolveColor(item.colorKey) }]}
              />
            </View>
          </View>
        ))}
      </Card>

      <Card title="Dispute Resolution Queue" accent={colors.warning}>
        {adminDisputes.map((dispute) => (
          <View key={dispute.id} style={styles.disputeRow}>
            <Text style={styles.disputeId}>{dispute.id}</Text>
            <Text style={styles.outcomeLabel}>{dispute.issue}</Text>
            <Text style={styles.muted}>{dispute.owner}</Text>
            <Text style={[styles.disputeSla, { color: colors.warning }]}>{dispute.sla}</Text>
          </View>
        ))}
      </Card>

      <Card title="Compliance Readiness" accent={colors.success}>
        {adminComplianceChecks.map((check) => (
          <View key={check.label} style={styles.complianceRow}>
            <Text style={styles.muted}>{check.label}</Text>
            <Text style={styles.complianceStatus}>{check.status}</Text>
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
  muted: { fontSize: 13, color: colors.textMuted, marginBottom: 4 },
  kpiValue: { fontSize: 28, fontWeight: '700', marginVertical: 4 },
  chart: { flexDirection: 'row', alignItems: 'flex-end', height: 120, marginTop: spacing.sm },
  barCol: { flex: 1, alignItems: 'center' },
  bar: { width: '75%', backgroundColor: colors.accent, borderRadius: 4, marginBottom: 4 },
  barLabel: { fontSize: 10, color: colors.textMuted },
  outcomeRow: { marginBottom: spacing.md },
  outcomeHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  outcomeLabel: { fontSize: 13, color: colors.text },
  outcomePct: { fontSize: 13, fontWeight: '600', color: colors.text },
  track: { height: 8, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
  disputeRow: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.sm,
    marginBottom: spacing.sm,
    gap: 4,
  },
  disputeId: { fontWeight: '700', color: colors.text },
  disputeSla: { fontSize: 13, fontWeight: '700' },
  complianceRow: { marginBottom: spacing.md },
  complianceStatus: { fontSize: 14, fontWeight: '700', color: colors.text },
});
