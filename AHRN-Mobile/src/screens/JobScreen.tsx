import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import { job } from '../data/ahrnData';
import { colors, spacing } from '../theme/tokens';

export default function JobScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Job #{job.id}</Text>
      <Text style={styles.muted}>{job.title}</Text>

      <Card title="Progress Timeline">
        {job.steps.map((step, i) => (
          <View key={step.label} style={styles.stepRow}>
            <View style={styles.stepRail}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      step.status === 'done'
                        ? colors.success
                        : step.status === 'active'
                          ? colors.accent
                          : colors.border,
                  },
                ]}
              >
                <Text style={styles.dotText}>{step.status === 'done' ? '✓' : i + 1}</Text>
              </View>
              {i < job.steps.length - 1 ? (
                <View
                  style={[
                    styles.line,
                    { backgroundColor: step.status === 'done' ? colors.success : colors.border },
                  ]}
                />
              ) : null}
            </View>
            <View style={styles.stepBody}>
              <Text style={styles.stepLabel}>{step.label}</Text>
              <Text style={styles.muted}>{step.time}</Text>
            </View>
          </View>
        ))}
      </Card>

      <Card title="SLA Countdown" accent={colors.warning}>
        <Text style={styles.sla}>{job.slaRemaining}</Text>
        <Text style={styles.muted}>Remaining to complete on-site work</Text>
      </Card>

      <Card title="Sensor Verification">
        <Text style={styles.body}>IoT sensors will confirm repair quality post-completion.</Text>
        <Text style={styles.chip}>{job.sensorStatus}</Text>
      </Card>

      <Card title="Evidence Requirements" accent={colors.accent}>
        {job.evidence.map((item) => (
          <View key={item.label} style={styles.evidenceRow}>
            <Text style={styles.stepLabel}>{item.label}</Text>
            <Text style={styles.muted}>{item.value}</Text>
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
  body: { fontSize: 14, color: colors.text, marginBottom: spacing.sm },
  stepRow: { flexDirection: 'row', marginBottom: 4 },
  stepRail: { alignItems: 'center', width: 32 },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  line: { width: 2, height: 36 },
  stepBody: { flex: 1, paddingBottom: spacing.md },
  stepLabel: { fontWeight: '600', color: colors.text },
  sla: { fontSize: 32, fontWeight: '700', color: colors.warning },
  chip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent + '33',
    color: colors.accent,
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  evidenceRow: { marginBottom: spacing.sm },
});
