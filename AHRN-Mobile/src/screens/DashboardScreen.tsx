import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import {
  activeAlerts,
  home,
  homeHealthScore,
  openClaims,
  scheduledMaintenance,
  upcomingRisks,
} from '../data/ahrnData';
import { resolveColor, type ColorKey } from '../theme/colorMap';
import { colors, spacing } from '../theme/tokens';
import type { HomeownerTabParamList } from '../navigation/types';

type Props = {
  navigation: BottomTabNavigationProp<HomeownerTabParamList, 'Dashboard'>;
};

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.h2}>{title}</Text>
      {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function SeverityBadge({ severity }: { severity: 'high' | 'medium' | 'low' }) {
  const palette = {
    high: colors.danger,
    medium: colors.warning,
    low: colors.accent,
  };
  const label = { high: 'High', medium: 'Medium', low: 'Low' };
  return (
    <View style={[styles.badge, { backgroundColor: palette[severity] + '33', borderColor: palette[severity] }]}>
      <Text style={[styles.badgeText, { color: palette[severity] }]}>{label[severity]}</Text>
    </View>
  );
}

function StatusPill({ label, colorKey }: { label: string; colorKey: ColorKey }) {
  const tint = resolveColor(colorKey);
  return (
    <View style={[styles.statusPill, { backgroundColor: tint + '22', borderColor: tint }]}>
      <Text style={[styles.statusPillText, { color: tint }]}>{label}</Text>
    </View>
  );
}

export default function DashboardScreen({ navigation }: Props) {
  const scoreColor =
    homeHealthScore.score >= 80
      ? colors.success
      : homeHealthScore.score >= 60
        ? colors.warning
        : colors.danger;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>{home.name}</Text>
      <Text style={styles.muted}>{home.address}</Text>

      <SectionHeader title="Home Health Score" subtitle="Composite reliability across all systems" />
      <View style={styles.healthCard}>
        <View style={styles.healthMain}>
          <View style={[styles.scoreRing, { borderColor: scoreColor }]}>
            <Text style={[styles.scoreValue, { color: scoreColor }]}>{homeHealthScore.score}</Text>
            <Text style={styles.scoreOf}>/ 100</Text>
          </View>
          <View style={styles.healthMeta}>
            <Text style={[styles.grade, { color: scoreColor }]}>{homeHealthScore.grade}</Text>
            <Text style={styles.trend}>{homeHealthScore.trend}</Text>
            <Text style={styles.healthSummary}>{homeHealthScore.summary}</Text>
          </View>
        </View>
        <View style={styles.factorRow}>
          {homeHealthScore.factors.map((factor) => (
            <View key={factor.label} style={styles.factorChip}>
              <Text style={styles.factorLabel}>{factor.label}</Text>
              <Text style={[styles.factorScore, { color: resolveColor(factor.colorKey) }]}>{factor.score}</Text>
            </View>
          ))}
        </View>
      </View>

      <SectionHeader title="Active Alerts" subtitle={`${activeAlerts.length} alerts need your attention`} />
      {activeAlerts.map((alert) => (
        <Card key={alert.id} accent={alert.severity === 'high' ? colors.danger : alert.severity === 'medium' ? colors.warning : colors.accent}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardTitle}>{alert.title}</Text>
            <SeverityBadge severity={alert.severity} />
          </View>
          <Text style={styles.muted}>{alert.system} · {alert.detected}</Text>
          <Text style={styles.cardBody}>{alert.body}</Text>
        </Card>
      ))}

      <SectionHeader title="Upcoming Risks" subtitle="AI-predicted failures and cost exposure" />
      {upcomingRisks.map((risk) => (
        <Card key={risk.id} accent={resolveColor(risk.colorKey)}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardTitle}>{risk.system}</Text>
            <Text style={[styles.riskPct, { color: resolveColor(risk.colorKey) }]}>{risk.riskPct}% risk</Text>
          </View>
          <Text style={styles.muted}>{risk.window}</Text>
          <Text style={styles.cardBody}>{risk.impact}</Text>
        </Card>
      ))}
      <PrimaryButton label="View Failure Forecast →" onPress={() => navigation.navigate('Forecast')} />

      <SectionHeader title="Open Claims" subtitle={`${openClaims.length} claims in progress`} />
      {openClaims.map((claim) => (
        <Card
          key={claim.id}
          accent={
            claim.status === 'Action needed'
              ? colors.danger
              : claim.status === 'In review'
                ? colors.warning
                : colors.success
          }
        >
          <View style={styles.cardTopRow}>
            <Text style={styles.cardTitle}>{claim.title}</Text>
            <StatusPill
              label={claim.status}
              colorKey={
                claim.status === 'Action needed' ? 'danger' : claim.status === 'In review' ? 'warning' : 'success'
              }
            />
          </View>
          <Text style={styles.muted}>{claim.id} · Filed {claim.filed}</Text>
          <Text style={styles.cardBody}>{claim.provider} · {claim.amount}</Text>
          <Text style={styles.nextStep}>{claim.nextStep}</Text>
        </Card>
      ))}

      <SectionHeader title="Scheduled Maintenance" subtitle="Upcoming visits and service windows" />
      {scheduledMaintenance.map((item) => (
        <Card key={item.id} accent={item.status === 'Confirmed' ? colors.success : colors.warning}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardTitle}>{item.task}</Text>
            <StatusPill label={item.status} colorKey={item.status === 'Confirmed' ? 'success' : 'warning'} />
          </View>
          <Text style={styles.muted}>{item.date} · {item.time}</Text>
          <Text style={styles.cardBody}>{item.provider}</Text>
          <Text style={styles.muted}>{item.id}</Text>
        </Card>
      ))}

      <PrimaryButton label="Track Active Job →" onPress={() => navigation.navigate('Job')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  h1: { fontSize: 26, fontWeight: '700', color: colors.text, marginBottom: 4 },
  h2: { fontSize: 18, fontWeight: '700', color: colors.text },
  sectionHeader: { marginTop: spacing.lg, marginBottom: spacing.md },
  sectionSubtitle: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  muted: { fontSize: 13, color: colors.textMuted, marginBottom: 4 },
  healthCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  healthMain: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, marginBottom: spacing.lg },
  scoreRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: { fontSize: 32, fontWeight: '800', lineHeight: 36 },
  scoreOf: { fontSize: 11, color: colors.textMuted },
  healthMeta: { flex: 1 },
  grade: { fontSize: 22, fontWeight: '700', marginBottom: 2 },
  trend: { fontSize: 13, color: colors.success, marginBottom: 6 },
  healthSummary: { fontSize: 13, color: colors.textMuted, lineHeight: 20 },
  factorRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  factorChip: {
    flexBasis: '47%',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  factorLabel: { fontSize: 12, color: colors.textMuted, marginBottom: 2 },
  factorScore: { fontSize: 18, fontWeight: '700' },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: 4,
  },
  cardTitle: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.text },
  cardBody: { fontSize: 14, color: colors.text, lineHeight: 20, marginTop: 4 },
  nextStep: { fontSize: 13, color: colors.accent, fontWeight: '600', marginTop: 6 },
  riskPct: { fontSize: 15, fontWeight: '700' },
  badge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  statusPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusPillText: { fontSize: 11, fontWeight: '700' },
});
