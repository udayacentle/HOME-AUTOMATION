import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import { adminDisputes } from '../data/ahrnData';
import { colors, spacing } from '../theme/tokens';

export default function AdminDisputesScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Disputes & Operations</Text>
      <Text style={styles.muted}>Platform visibility for active dispute queue</Text>

      {adminDisputes.map((dispute) => (
        <Card key={dispute.id} accent={colors.warning}>
          <Text style={styles.disputeId}>{dispute.id}</Text>
          <Text style={styles.body}>{dispute.issue}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.muted}>Owner: {dispute.owner}</Text>
            <Text style={styles.sla}>SLA: {dispute.sla}</Text>
          </View>
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
  disputeId: { fontSize: 12, color: colors.textMuted, marginBottom: 4 },
  body: { fontSize: 15, color: colors.text, marginBottom: spacing.sm },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  sla: { color: colors.warning, fontWeight: '600', fontSize: 13 },
});
