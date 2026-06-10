import { ScrollView, Pressable, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import { technicianFilters, technicianOpportunities } from '../data/ahrnData';
import { colors, spacing } from '../theme/tokens';

export default function TechnicianScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Technician Opportunity Feed</Text>
      <Text style={styles.muted}>
        Bid on upcoming failures by distance, device type, confidence, and guaranteed outcome.
      </Text>

      <View style={styles.filterGrid}>
        {technicianFilters.map((f) => (
          <Card key={f.label} style={styles.filterCard}>
            <Text style={styles.filterLabel}>{f.label}</Text>
            <Text style={styles.filterValue}>{f.value}</Text>
          </Card>
        ))}
      </View>

      {technicianOpportunities.map((job) => (
        <Card key={job.id} accent={colors.accent}>
          <Text style={styles.jobId}>{job.id}</Text>
          <Text style={styles.jobTitle}>{job.system}</Text>
          <Text style={styles.muted}>{job.outcome}</Text>
          <View style={styles.metrics}>
            <Metric label="Distance" value={job.distance} />
            <Metric label="Confidence" value={job.confidence} valueColor={colors.success} />
            <Metric label="Bid range" value={job.bidRange} valueColor={colors.accent} />
          </View>
          <Text style={styles.window}>{job.window}</Text>
          <Pressable style={styles.bidBtn}>
            <Text style={styles.bidBtnText}>Submit Bid</Text>
          </Pressable>
        </Card>
      ))}
    </ScrollView>
  );
}

function Metric({
  label,
  value,
  valueColor = colors.text,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, { color: valueColor }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  h1: { fontSize: 26, fontWeight: '700', color: colors.text, marginBottom: 4 },
  muted: { fontSize: 13, color: colors.textMuted, marginBottom: spacing.md },
  filterGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  filterCard: { width: '48%', minWidth: 150 },
  filterLabel: { fontSize: 12, color: colors.textMuted, marginBottom: 4 },
  filterValue: { fontWeight: '700', color: colors.text, fontSize: 13 },
  jobId: { fontSize: 12, color: colors.textMuted, marginBottom: 4 },
  jobTitle: { fontSize: 20, fontWeight: '600', color: colors.text, marginBottom: 4 },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginVertical: spacing.md },
  metric: { minWidth: 80 },
  metricLabel: { fontSize: 11, color: colors.textMuted },
  metricValue: { fontSize: 13, fontWeight: '700' },
  window: { fontSize: 13, color: colors.textMuted, marginBottom: spacing.md },
  bidBtn: {
    backgroundColor: colors.accent,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  bidBtnText: { color: '#fff', fontWeight: '700' },
});
