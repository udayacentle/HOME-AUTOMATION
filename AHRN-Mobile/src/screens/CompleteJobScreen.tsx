import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { job } from '../data/ahrnData';
import { colors, spacing } from '../theme/tokens';

const checklist = [
  { id: 'photo', label: 'Technician photo uploaded' },
  { id: 'sensor', label: 'Sensor packet captured' },
  { id: 'notes', label: 'Repair notes submitted' },
  { id: 'pof', label: 'Proof-of-Fix attestation' },
];

export default function CompleteJobScreen() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const allDone = checklist.every((item) => done[item.id]);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Complete Job</Text>
      <Text style={styles.muted}>Job #{job.id} — submit completion and status update</Text>

      <Card title="Status Update" accent={colors.warning}>
        <Text style={styles.status}>On Site → Repair Complete</Text>
        <Text style={styles.muted}>SLA remaining: {job.slaRemaining}</Text>
      </Card>

      <Card title="Evidence Checklist">
        {checklist.map((item) => (
          <Pressable
            key={item.id}
            style={styles.checkRow}
            onPress={() => setDone((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
          >
            <View style={[styles.checkbox, done[item.id] && styles.checkboxDone]}>
              {done[item.id] ? <Text style={styles.checkMark}>✓</Text> : null}
            </View>
            <Text style={styles.checkLabel}>{item.label}</Text>
          </Pressable>
        ))}
      </Card>

      <Card title="Submit Completion" accent={colors.success}>
        <Text style={styles.muted}>
          Backend hook: POST /jobs/{job.id}/complete with evidence hash and audit event.
        </Text>
        <PrimaryButton
          label={allDone ? 'Submit Completion' : 'Complete checklist first'}
          onPress={() => undefined}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  h1: { fontSize: 26, fontWeight: '700', color: colors.text, marginBottom: 4 },
  muted: { fontSize: 13, color: colors.textMuted, marginBottom: spacing.sm },
  status: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 4 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: { backgroundColor: colors.success, borderColor: colors.success },
  checkMark: { color: '#fff', fontSize: 12, fontWeight: '700' },
  checkLabel: { color: colors.text, fontSize: 14, flex: 1 },
});
