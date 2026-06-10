import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { bids } from '../data/ahrnData';
import { colors, spacing } from '../theme/tokens';
import type { RootTabParamList } from '../navigation/types';

type Props = {
  navigation: BottomTabNavigationProp<RootTabParamList, 'Bids'>;
};

export default function BidsScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Compare Outcomes</Text>
      <Text style={styles.muted}>Technicians compete on Proof-of-Fix — not just price</Text>

      {bids.map((bid) => (
        <Card key={bid.id} accent={bid.recommended ? colors.success : undefined}>
          {bid.recommended ? <Text style={styles.badge}>AI RECOMMENDED</Text> : null}
          <Text style={styles.provider}>{bid.provider}</Text>
          <Text style={styles.muted}>{bid.outcome}</Text>
          <View style={styles.metrics}>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>PoF</Text>
              <Text style={[styles.metricValue, { color: colors.success }]}>{bid.pof}</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>ETA</Text>
              <Text style={styles.metricValue}>{bid.eta}</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Price</Text>
              <Text style={[styles.metricValue, { color: colors.accent }]}>${bid.price}</Text>
            </View>
          </View>
          <Pressable
            style={[styles.selectBtn, selected === bid.id && styles.selectBtnActive]}
            onPress={() => setSelected(bid.id)}
          >
            <Text style={styles.selectBtnText}>{selected === bid.id ? 'Selected ✓' : 'Select Bid'}</Text>
          </Pressable>
        </Card>
      ))}

      {selected ? (
        <Card title="Proof-of-Fix Guarantee">
          <Text style={styles.body}>
            Sensor-verified outcome tracking. If HVAC fails within the guarantee period, re-repair is covered.
          </Text>
          <PrimaryButton label="Start Job →" onPress={() => navigation.navigate('Job')} />
        </Card>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  h1: { fontSize: 26, fontWeight: '700', color: colors.text, marginBottom: 4 },
  muted: { fontSize: 13, color: colors.textMuted, marginBottom: spacing.md },
  body: { fontSize: 14, color: colors.text, lineHeight: 22, marginBottom: spacing.md },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.success + '33',
    color: colors.success,
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  provider: { fontSize: 18, fontWeight: '600', color: colors.text },
  metrics: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: spacing.md },
  metric: { alignItems: 'center' },
  metricLabel: { fontSize: 11, color: colors.textMuted },
  metricValue: { fontSize: 18, fontWeight: '700', color: colors.text },
  selectBtn: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  selectBtnActive: { backgroundColor: colors.success, borderColor: colors.success },
  selectBtnText: { color: '#fff', fontWeight: '600' },
});
