import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { forecastAi, riskData } from '../data/ahrnData';
import { colors, spacing } from '../theme/tokens';
import type { HomeownerTabParamList } from '../navigation/types';

type Props = {
  navigation: BottomTabNavigationProp<HomeownerTabParamList, 'Forecast'>;
};

export default function ForecastScreen({ navigation }: Props) {
  const maxRisk = 100;
  const { costImpact } = forecastAi;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>AI Forecast</Text>
      <Text style={styles.muted}>HVAC Compressor — AI-powered risk prediction</Text>

      <Card title="Risk Over Time">
        <View style={styles.chart}>
          {riskData.map((point) => (
            <View key={point.day} style={styles.barCol}>
              <View
                style={[
                  styles.bar,
                  {
                    height: Math.max(4, (point.risk / maxRisk) * 120),
                    backgroundColor:
                      point.risk > 70 ? colors.danger : point.risk > 40 ? colors.warning : colors.success,
                  },
                ]}
              />
              <Text style={styles.barLabel}>D{point.day}</Text>
              <Text style={styles.barValue}>{point.risk}%</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card title="AI Explanation" accent={colors.accent}>
        <Text style={styles.body}>{forecastAi.explanation}</Text>
        <Text style={styles.muted}>Model: {forecastAi.model}</Text>
        <Text style={styles.muted}>Confidence: {forecastAi.confidence}</Text>
      </Card>

      <Card title="Recommended Actions" accent={colors.success}>
        <Text style={styles.sectionHint}>Clear next steps based on the detected issue</Text>
        {forecastAi.recommendedActions.map((action) => (
          <View key={action.id} style={styles.actionRow}>
            <Text style={styles.check}>✓</Text>
            <View style={styles.actionText}>
              <Text style={styles.actionLabel}>{action.label}</Text>
              <Text style={styles.muted}>{action.detail}</Text>
            </View>
          </View>
        ))}
      </Card>

      <Card title="Cost Impact" accent={colors.warning}>
        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Preventive Repair</Text>
          <Text style={[styles.costValue, { color: colors.success }]}>
            ${costImpact.preventiveRepair.toLocaleString()}
          </Text>
        </View>
        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Potential Failure Cost</Text>
          <Text style={[styles.costValue, { color: colors.danger }]}>
            ${costImpact.potentialFailureCost.toLocaleString()}
          </Text>
        </View>
        <View style={[styles.costRow, styles.savingsRow]}>
          <Text style={styles.savingsLabel}>Potential Savings</Text>
          <Text style={styles.savingsValue}>${costImpact.potentialSavings.toLocaleString()}</Text>
        </View>
        <Text style={styles.savingsNote}>
          Acting now avoids emergency pricing, downtime, and secondary damage risk.
        </Text>
      </Card>

      <PrimaryButton label="Compare Repair Bids →" onPress={() => navigation.navigate('Bids')} />
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
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 150,
    marginTop: spacing.sm,
  },
  barCol: { flex: 1, alignItems: 'center' },
  bar: { width: '70%', borderRadius: 4, marginBottom: 4 },
  barLabel: { fontSize: 10, color: colors.textMuted },
  barValue: { fontSize: 11, fontWeight: '600', color: colors.text },
  actionRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  check: { fontSize: 18, fontWeight: '700', color: colors.success, marginTop: 2 },
  actionText: { flex: 1 },
  actionLabel: { fontSize: 15, fontWeight: '600', color: colors.text, marginBottom: 2 },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  costLabel: { fontSize: 14, color: colors.textMuted },
  costValue: { fontSize: 18, fontWeight: '700' },
  savingsRow: { borderBottomWidth: 0, marginTop: 4 },
  savingsLabel: { fontSize: 15, fontWeight: '700', color: colors.text },
  savingsValue: { fontSize: 22, fontWeight: '800', color: colors.success },
  savingsNote: { fontSize: 13, color: colors.textMuted, marginTop: spacing.sm, lineHeight: 20 },
});
