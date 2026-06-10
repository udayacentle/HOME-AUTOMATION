import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { forecastAi, riskData } from '../data/ahrnData';
import { colors, spacing } from '../theme/tokens';
import type { RootTabParamList } from '../navigation/types';

type Props = {
  navigation: BottomTabNavigationProp<RootTabParamList, 'Forecast'>;
};

export default function ForecastScreen({ navigation }: Props) {
  const maxRisk = 100;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Failure Forecast</Text>
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

      <Card title="Recommended Action">
        <Text style={styles.body}>
          Schedule preventive maintenance now. Estimated cost without action:{' '}
          <Text style={{ color: colors.danger, fontWeight: '700' }}>${forecastAi.emergencyCost.toLocaleString()}</Text>{' '}
          (emergency + downtime).
        </Text>
        <PrimaryButton label="View Outcome-Based Bids →" onPress={() => navigation.navigate('Bids')} />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  h1: { fontSize: 26, fontWeight: '700', color: colors.text, marginBottom: 4 },
  muted: { fontSize: 13, color: colors.textMuted, marginBottom: 4 },
  body: { fontSize: 14, color: colors.text, lineHeight: 22, marginBottom: spacing.sm },
  chart: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 150, marginTop: spacing.sm },
  barCol: { flex: 1, alignItems: 'center' },
  bar: { width: '70%', borderRadius: 4, marginBottom: 4 },
  barLabel: { fontSize: 10, color: colors.textMuted },
  barValue: { fontSize: 11, fontWeight: '600', color: colors.text },
});
