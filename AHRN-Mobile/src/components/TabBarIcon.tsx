import type { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import type { RootTabParamList } from '../navigation/types';

type TabName = keyof RootTabParamList;
type IconProps = { color: string; size: number };

type Props = {
  name: TabName;
  color: string;
  size: number;
};

const STROKE = 2.5;

/** Home — house with roof and door */
function IconHome({ color, size }: IconProps) {
  const s = size;
  return (
    <View style={[styles.box, { width: s, height: s }]}>
      <View
        style={{
          position: 'absolute',
          top: s * 0.06,
          width: 0,
          height: 0,
          borderLeftWidth: s * 0.5,
          borderRightWidth: s * 0.5,
          borderBottomWidth: s * 0.36,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: s * 0.62,
          height: s * 0.46,
          backgroundColor: color,
          borderRadius: 2,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          width: s * 0.2,
          height: s * 0.22,
          backgroundColor: '#020617',
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
      />
    </View>
  );
}

/** Forecast — upward trend line with arrow */
function IconForecast({ color, size }: IconProps) {
  const s = size;
  return (
    <View style={[styles.box, { width: s, height: s }]}>
      <View style={{ position: 'absolute', bottom: s * 0.18, left: s * 0.1, width: s * 0.22, height: STROKE, backgroundColor: color, transform: [{ rotate: '-28deg' }] }} />
      <View style={{ position: 'absolute', bottom: s * 0.32, left: s * 0.28, width: s * 0.22, height: STROKE, backgroundColor: color, transform: [{ rotate: '18deg' }] }} />
      <View style={{ position: 'absolute', bottom: s * 0.48, left: s * 0.46, width: s * 0.28, height: STROKE, backgroundColor: color, transform: [{ rotate: '-22deg' }] }} />
      <View
        style={{
          position: 'absolute',
          top: s * 0.12,
          right: s * 0.12,
          width: 0,
          height: 0,
          borderLeftWidth: s * 0.12,
          borderRightWidth: s * 0.12,
          borderBottomWidth: s * 0.16,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: color,
          transform: [{ rotate: '0deg' }],
        }}
      />
    </View>
  );
}

/** Bids — clipboard / document list */
function IconBids({ color, size }: IconProps) {
  const s = size;
  return (
    <View style={[styles.box, { width: s, height: s }]}>
      <View
        style={{
          position: 'absolute',
          top: s * 0.08,
          alignSelf: 'center',
          width: s * 0.28,
          height: s * 0.1,
          borderWidth: STROKE,
          borderColor: color,
          borderBottomWidth: 0,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      />
      <View
        style={{
          width: s * 0.68,
          height: s * 0.76,
          borderWidth: STROKE,
          borderColor: color,
          borderRadius: 3,
          marginTop: s * 0.14,
          paddingTop: s * 0.16,
          paddingHorizontal: s * 0.12,
          gap: s * 0.1,
        }}
      >
        <View style={{ height: STROKE, backgroundColor: color }} />
        <View style={{ height: STROKE, width: '65%', backgroundColor: color }} />
        <View style={{ height: STROKE, backgroundColor: color }} />
      </View>
    </View>
  );
}

/** Job — briefcase */
function IconJob({ color, size }: IconProps) {
  const s = size;
  return (
    <View style={[styles.box, { width: s, height: s }]}>
      <View
        style={{
          position: 'absolute',
          top: s * 0.16,
          alignSelf: 'center',
          width: s * 0.28,
          height: s * 0.14,
          borderWidth: STROKE,
          borderColor: color,
          borderBottomWidth: 0,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: s * 0.28,
          width: s * 0.74,
          height: s * 0.52,
          borderWidth: STROKE,
          borderColor: color,
          borderRadius: 4,
          backgroundColor: 'transparent',
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: s * 0.44,
          width: s * 0.74,
          height: STROKE,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

/** Admin — gear / settings */
function IconAdmin({ color, size }: IconProps) {
  const s = size;
  const cx = s * 0.5;
  const cy = s * 0.5;
  const r = s * 0.18;
  return (
    <View style={[styles.box, { width: s, height: s }]}>
      <View
        style={{
          position: 'absolute',
          left: cx - r,
          top: cy - r,
          width: r * 2,
          height: r * 2,
          borderRadius: r,
          borderWidth: STROKE,
          borderColor: color,
        }}
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <View
          key={deg}
          style={{
            position: 'absolute',
            left: cx - s * 0.045,
            top: cy - s * 0.38,
            width: s * 0.09,
            height: s * 0.16,
            backgroundColor: color,
            borderRadius: 1,
            transform: [{ rotate: `${deg}deg` }, { translateY: -s * 0.24 }],
          }}
        />
      ))}
    </View>
  );
}

function IconTechnician({ color, size }: IconProps) {
  const s = size;
  return (
    <View style={[styles.box, { width: s, height: s }]}>
      <View style={{ position: 'absolute', top: s * 0.06, width: s * 0.36, height: s * 0.36, borderRadius: s * 0.18, backgroundColor: color }} />
      <View style={{ position: 'absolute', bottom: 0, width: s * 0.66, height: s * 0.36, borderTopLeftRadius: s * 0.2, borderTopRightRadius: s * 0.2, backgroundColor: color }} />
    </View>
  );
}

function IconSuperAdmin({ color, size }: IconProps) {
  const s = size;
  return (
    <View style={[styles.box, { width: s, height: s }]}>
      <View
        style={{
          position: 'absolute',
          top: s * 0.2,
          width: 0,
          height: 0,
          borderLeftWidth: s * 0.26,
          borderRightWidth: s * 0.26,
          borderBottomWidth: s * 0.24,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: color,
        }}
      />
      <View style={{ position: 'absolute', bottom: s * 0.14, width: s * 0.76, height: STROKE, backgroundColor: color }} />
    </View>
  );
}

const icons: Partial<Record<TabName, (props: IconProps) => JSX.Element>> = {
  Dashboard: IconHome,
  Forecast: IconForecast,
  Bids: IconBids,
  Job: IconJob,
  Technician: IconTechnician,
  Admin: IconAdmin,
  SuperAdmin: IconSuperAdmin,
  TechFeed: IconTechnician,
  TechJob: IconJob,
  TechComplete: IconBids,
  AdminOverview: IconAdmin,
  AdminDisputes: IconBids,
  AdminCompliance: IconForecast,
  SuperAI: IconSuperAdmin,
  SuperGovernance: IconAdmin,
};

export default function TabBarIcon({ name, color, size }: Props) {
  const Icon = icons[name] ?? IconHome;
  return <Icon color={color} size={Math.max(size, 26)} />;
}

const styles = StyleSheet.create({
  box: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
