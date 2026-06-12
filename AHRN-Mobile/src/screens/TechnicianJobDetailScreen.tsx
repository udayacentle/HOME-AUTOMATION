import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { job, technicianOpportunities } from '../data/ahrnData';
import { colors, spacing } from '../theme/tokens';

const activeJob = technicianOpportunities[0];

export default function TechnicianJobDetailScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Job Details</Text>
      <Text style={styles.muted}>#{activeJob.id} — {activeJob.system}</Text>

      <Card title="Job Context" accent={colors.accent}>
        <Text style={styles.body}>{job.title}</Text>
        <Text style={styles.muted}>Service window: {activeJob.window}</Text>
        <Text style={styles.muted}>Distance: {activeJob.distance}</Text>
      </Card>

      <Card title="Requirements">
        <Text style={styles.body}>Outcome guarantee: {activeJob.outcome}</Text>
        <Text style={styles.body}>Forecast confidence: {activeJob.confidence}</Text>
        <Text style={styles.body}>Bid range: {activeJob.bidRange}</Text>
      </Card>

      <Card title="Action Buttons" accent={colors.success}>
        <Text style={styles.muted}>Mobile-first actions for on-site technicians</Text>
        <View style={styles.actions}>
          <PrimaryButton label="Navigate to Site" onPress={() => undefined} />
          <PrimaryButton label="Upload Evidence" onPress={() => undefined} />
          <PrimaryButton label="Mark On Site" onPress={() => undefined} />
        </View>
      </Card>

      <Card title="Progress">
        {job.steps.map((step) => (
          <View key={step.label} style={styles.stepRow}>
            <Text style={styles.stepLabel}>{step.label}</Text>
            <Text style={styles.muted}>{step.time}</Text>
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
  muted: { fontSize: 13, color: colors.textMuted },
  body: { fontSize: 14, color: colors.text, marginBottom: spacing.xs },
  actions: { gap: spacing.sm, marginTop: spacing.sm },
  stepRow: { marginBottom: spacing.sm },
  stepLabel: { fontWeight: '600', color: colors.text },
});
