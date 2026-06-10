import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import {
  modelVersions,
  superAdminPolicies,
  superAdminTenants,
} from '../data/ahrnData';
import { colors, spacing } from '../theme/tokens';

export default function SuperAdminScreen() {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [modelIndex, setModelIndex] = useState(0);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Super Admin AI Console</Text>
      <Text style={styles.muted}>
        Manage tenants, policies, model versions, kill switches, and audit controls.
      </Text>

      <Card title="AI Kill Switch" accent={aiEnabled ? colors.success : colors.danger}>
        <Text style={[styles.bigStatus, { color: aiEnabled ? colors.success : colors.danger }]}>
          {aiEnabled ? 'Enabled' : 'Disabled'}
        </Text>
        <Text style={styles.muted}>
          When disabled, forecasts revert to rules-only mode and every event is audit logged.
        </Text>
        <Pressable
          style={[styles.toggleBtn, { backgroundColor: aiEnabled ? colors.danger : colors.success }]}
          onPress={() => setAiEnabled((v) => !v)}
        >
          <Text style={styles.toggleBtnText}>{aiEnabled ? 'Disable AI' : 'Enable AI'}</Text>
        </Pressable>
      </Card>

      <Card title="Model Versioning" accent={colors.accent}>
        <Text style={styles.muted}>Active forecasting model</Text>
        <View style={styles.modelRow}>
          {modelVersions.map((m, i) => (
            <Pressable
              key={m}
              style={[styles.modelChip, modelIndex === i && styles.modelChipActive]}
              onPress={() => setModelIndex(i)}
            >
              <Text style={[styles.modelChipText, modelIndex === i && styles.modelChipTextActive]}>
                {m.replace('LLaMA ', '').replace('Rules-only ', 'Rules ')}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.muted}>
          Current: {modelVersions[modelIndex]}. Canary at 12% traffic, rollback ready.
        </Text>
      </Card>

      <Card title="Tenant Management">
        {superAdminTenants.map((tenant) => (
          <View key={tenant.name} style={styles.tenantRow}>
            <View style={styles.tenantMain}>
              <Text style={styles.tenantName}>{tenant.name}</Text>
              <Text style={styles.muted}>{tenant.region}</Text>
            </View>
            <Text style={styles.tenantMeta}>{tenant.policy}</Text>
            <Text style={styles.tenantMeta}>{tenant.users.toLocaleString()} users</Text>
            <Text
              style={[
                styles.statusBadge,
                { color: tenant.status === 'Active' ? colors.success : colors.warning },
              ]}
            >
              {tenant.status}
            </Text>
          </View>
        ))}
      </Card>

      <Card title="Platform Policies" accent={colors.warning}>
        {superAdminPolicies.map((policy) => (
          <View key={policy} style={styles.policyRow}>
            <Text style={styles.policyOk}>OK</Text>
            <Text style={styles.policyText}>{policy}</Text>
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
  muted: { fontSize: 13, color: colors.textMuted, marginBottom: spacing.sm },
  bigStatus: { fontSize: 32, fontWeight: '700', marginVertical: spacing.sm },
  toggleBtn: {
    marginTop: spacing.md,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleBtnText: { color: '#fff', fontWeight: '700' },
  modelRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginVertical: spacing.md },
  modelChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  modelChipActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  modelChipText: { fontSize: 12, color: colors.textMuted },
  modelChipTextActive: { color: '#fff', fontWeight: '600' },
  tenantRow: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: 4,
  },
  tenantMain: { marginBottom: 4 },
  tenantName: { fontWeight: '700', color: colors.text },
  tenantMeta: { fontSize: 13, color: colors.text },
  statusBadge: { fontSize: 12, fontWeight: '600', marginTop: 4 },
  policyRow: { flexDirection: 'row', gap: 10, marginBottom: spacing.sm },
  policyOk: { color: colors.success, fontWeight: '700' },
  policyText: { flex: 1, fontSize: 14, color: colors.text, lineHeight: 20 },
});
