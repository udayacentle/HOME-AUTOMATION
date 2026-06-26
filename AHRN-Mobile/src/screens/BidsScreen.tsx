import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import WeightSlider from '../components/WeightSlider';
import {
  aiBidRecommendation,
  bidScoringGuide,
  bids,
  defaultBidWeights,
  type BidWeights,
} from '../data/ahrnData';
import { colors, spacing } from '../theme/tokens';
import type { HomeownerTabParamList } from '../navigation/types';

type Props = {
  navigation: BottomTabNavigationProp<HomeownerTabParamList, 'Bids'>;
};

type ScoredBid = (typeof bids)[number] & { weightedScore: number };

function computeWeightedScore(bid: (typeof bids)[number], weights: BidWeights): number {
  const total = weights.price + weights.eta + weights.coverage + weights.warranty || 1;
  const score =
    (bid.rankFactors.price * weights.price +
      bid.rankFactors.eta * weights.eta +
      bid.rankFactors.coverage * weights.coverage +
      bid.rankFactors.warranty * weights.warranty) /
    total;
  return Math.round(score);
}

export default function BidsScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [weights, setWeights] = useState<BidWeights>(defaultBidWeights);

  const rankedBids = useMemo<ScoredBid[]>(() => {
    return [...bids]
      .map((bid) => ({ ...bid, weightedScore: computeWeightedScore(bid, weights) }))
      .sort((a, b) => b.weightedScore - a.weightedScore);
  }, [weights]);

  const topBid = rankedBids[0];

  const updateWeight = (key: keyof BidWeights, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Compare Bids</Text>
      <Text style={styles.muted}>Technicians compete on Repair Guarantee — not just price</Text>

      <Card title="AI Recommended" accent={colors.success}>
        <Text style={styles.aiBadge}>AI RECOMMENDED</Text>
        <Text style={styles.aiProvider}>{aiBidRecommendation.provider}</Text>
        <Text style={styles.aiScore}>Score: {aiBidRecommendation.score}/100</Text>
        <Text style={styles.body}>{aiBidRecommendation.summary}</Text>
        {aiBidRecommendation.reasons.map((reason) => (
          <Text key={reason} style={styles.reasonItem}>• {reason}</Text>
        ))}
      </Card>

      <Card title="Your Priority Weights" accent={colors.accent}>
        <Text style={styles.sectionHint}>Drag sliders to emphasize what matters most to you</Text>
        <WeightSlider label="Price" value={weights.price} onChange={(v) => updateWeight('price', v)} />
        <WeightSlider label="ETA" value={weights.eta} onChange={(v) => updateWeight('eta', v)} />
        <WeightSlider label="Coverage" value={weights.coverage} onChange={(v) => updateWeight('coverage', v)} />
        <WeightSlider label="Warranty" value={weights.warranty} onChange={(v) => updateWeight('warranty', v)} />
      </Card>

      <Card title="Bid Comparison">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View style={styles.tableHeader}>
              <Text style={[styles.cell, styles.colProvider, styles.headerText]}>Provider</Text>
              <Text style={[styles.cell, styles.colNum, styles.headerText]}>Price</Text>
              <Text style={[styles.cell, styles.colNum, styles.headerText]}>ETA</Text>
              <Text style={[styles.cell, styles.colWarranty, styles.headerText]}>Warranty</Text>
              <Text style={[styles.cell, styles.colNum, styles.headerText]}>Score</Text>
            </View>
            {rankedBids.map((bid, index) => (
              <Pressable
                key={bid.id}
                style={[styles.tableRow, selected === bid.id && styles.tableRowSelected, index === 0 && styles.topRow]}
                onPress={() => setSelected(bid.id)}
              >
                <View style={[styles.cell, styles.colProvider]}>
                  <Text style={styles.providerCell}>{bid.provider}</Text>
                  {index === 0 ? <Text style={styles.rankTag}>Top match</Text> : null}
                </View>
                <Text style={[styles.cell, styles.colNum, styles.cellText]}>${bid.price}</Text>
                <Text style={[styles.cell, styles.colNum, styles.cellText]}>{bid.eta}</Text>
                <Text style={[styles.cell, styles.colWarranty, styles.cellText]}>{bid.warranty}</Text>
                <Text style={[styles.cell, styles.colNum, styles.scoreCell]}>{bid.weightedScore}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </Card>

      <Card title="How AI Scores Bids" accent={colors.accent}>
        <Text style={styles.body}>{bidScoringGuide.summary}</Text>
        {bidScoringGuide.factors.map((factor) => (
          <View key={factor.key} style={styles.factorBlock}>
            <Text style={styles.factorTitle}>{factor.label}</Text>
            <Text style={styles.muted}>{factor.description}</Text>
          </View>
        ))}
      </Card>

      {rankedBids.map((bid) => (
        <Card key={bid.id} accent={bid.recommended ? colors.success : undefined}>
          {bid.recommended ? <Text style={styles.badge}>VERIFIED PICK</Text> : null}
          <Text style={styles.provider}>{bid.provider}</Text>
          <Text style={styles.guarantee}>{bid.guaranteeLabel}</Text>
          <Text style={styles.muted}>{bid.whyRanked}</Text>
          <View style={styles.metrics}>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Price</Text>
              <Text style={[styles.metricValue, { color: colors.accent }]}>${bid.price}</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>ETA</Text>
              <Text style={styles.metricValue}>{bid.eta}</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Warranty</Text>
              <Text style={styles.metricValue}>{bid.warranty}</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Your Score</Text>
              <Text style={[styles.metricValue, { color: colors.success }]}>{bid.weightedScore}</Text>
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
        <Card title="Repair Guarantee">
          <Text style={styles.body}>
            Sensor-verified outcome tracking with a Verified Repair Warranty. If HVAC fails within the guarantee
            period, re-repair is covered at no additional cost.
          </Text>
          <Text style={styles.muted}>
            Selected: {rankedBids.find((b) => b.id === selected)?.provider ?? topBid.provider}
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
  muted: { fontSize: 13, color: colors.textMuted, marginBottom: 4 },
  body: { fontSize: 14, color: colors.text, lineHeight: 22, marginBottom: spacing.sm },
  sectionHint: { fontSize: 13, color: colors.textMuted, marginBottom: spacing.md },
  aiBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.success + '33',
    color: colors.success,
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  aiProvider: { fontSize: 20, fontWeight: '700', color: colors.text },
  aiScore: { fontSize: 16, fontWeight: '700', color: colors.success, marginVertical: 4 },
  reasonItem: { fontSize: 13, color: colors.text, lineHeight: 20, marginTop: 2 },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 8 },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableRowSelected: { backgroundColor: colors.accent + '18' },
  topRow: { backgroundColor: colors.success + '12' },
  headerText: { fontSize: 11, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase' },
  cell: { paddingHorizontal: 6 },
  colProvider: { width: 130 },
  colNum: { width: 64, textAlign: 'center' },
  colWarranty: { width: 88, textAlign: 'center' },
  providerCell: { fontSize: 13, fontWeight: '600', color: colors.text },
  rankTag: { fontSize: 10, color: colors.success, fontWeight: '600', marginTop: 2 },
  cellText: { fontSize: 13, color: colors.text, textAlign: 'center' },
  scoreCell: { fontSize: 14, fontWeight: '700', color: colors.accent, textAlign: 'center' },
  factorBlock: { marginBottom: spacing.sm },
  factorTitle: { fontSize: 14, fontWeight: '600', color: colors.text },
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
  guarantee: { fontSize: 14, fontWeight: '600', color: colors.accent, marginVertical: 4 },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: spacing.md, gap: 8 },
  metric: { alignItems: 'center', minWidth: '22%' },
  metricLabel: { fontSize: 11, color: colors.textMuted },
  metricValue: { fontSize: 16, fontWeight: '700', color: colors.text },
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
