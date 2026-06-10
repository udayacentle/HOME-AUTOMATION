import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { home, roleCoverage, systems } from '../data/ahrnData';
import { resolveColor } from '../theme/colorMap';
import { colors, spacing } from '../theme/tokens';
import type { RootTabParamList } from '../navigation/types';

type Props = {
  navigation: BottomTabNavigationProp<RootTabParamList, 'Dashboard'>;
};

export default function DashboardScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>{home.name}</Text>
      <Text style={styles.muted}>{home.address}</Text>

      <View style={styles.hriCard}>
        <View>
          <Text style={styles.muted}>Home Reliability Index</Text>
          <Text style={styles.hriScore}>{home.hri}</Text>
          <Text style={styles.muted}>{home.hriSummary}</Text>
        </View>
        <View style={styles.hriRing}>
          <Text style={styles.ringLabel}>HRI</Text>
        </View>
      </View>

      <View style={styles.alert}>
        <Text style={styles.alertTitle}>{home.alertTitle}</Text>
        <Text style={styles.alertBody}>{home.alertBody}</Text>
      </View>

      <Text style={styles.h2}>System Status</Text>
        {systems.map((sys) => (
          <Card key={sys.name} accent={resolveColor(sys.colorKey)}>
          <Text style={styles.sysName}>{sys.name}</Text>
            <Text style={[styles.sysStatus, { color: resolveColor(sys.colorKey) }]}>{sys.status}</Text>
          <Text style={styles.muted}>{sys.risk}</Text>
        </Card>
      ))}

      <PrimaryButton label="View Failure Forecast →" onPress={() => navigation.navigate('Forecast')} />

      <Text style={styles.h2}>SRS Role Coverage</Text>
      {roleCoverage.map((item) => (
        <Card key={item.role} accent={colors.accent}>
          <Text style={styles.sysName}>{item.role}</Text>
          <Text style={styles.muted}>{item.capability}</Text>
          <PrimaryButton
            label={`Open ${item.role} →`}
            onPress={() => navigation.navigate(item.screen)}
          />
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  h1: { fontSize: 26, fontWeight: '700', color: colors.text, marginBottom: 4 },
  h2: { fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: spacing.md, marginTop: spacing.sm },
  muted: { fontSize: 13, color: colors.textMuted, marginBottom: 4 },
  hriCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.lg,
    marginVertical: spacing.lg,
  },
  hriScore: { fontSize: 48, fontWeight: '700', color: colors.success, marginVertical: 4 },
  hriRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 6,
    borderColor: colors.success,
    borderTopColor: colors.warning,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringLabel: { fontSize: 11, color: colors.textMuted },
  alert: {
    backgroundColor: colors.danger + '22',
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  alertTitle: { color: colors.text, fontWeight: '600', marginBottom: 4 },
  alertBody: { fontSize: 13, color: colors.textMuted },
  sysName: { fontSize: 16, fontWeight: '600', color: colors.text },
  sysStatus: { fontSize: 13, fontWeight: '500', marginVertical: 2 },
});
