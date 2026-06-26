import { useCallback, useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/tokens';

type WeightSliderProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export default function WeightSlider({ label, value, onChange }: WeightSliderProps) {
  const [trackWidth, setTrackWidth] = useState(1);

  const setFromX = useCallback(
    (x: number) => {
      const pct = Math.round((x / trackWidth) * 100);
      onChange(Math.max(0, Math.min(100, pct)));
    },
    [onChange, trackWidth],
  );

  const onLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width || 1);
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}%</Text>
      </View>
      <Pressable
        style={styles.track}
        onLayout={onLayout}
        onPress={(e) => setFromX(e.nativeEvent.locationX)}
      >
        <View style={[styles.fill, { width: `${value}%` }]} />
        <View style={[styles.thumb, { left: `${value}%` }]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 14, fontWeight: '600', color: colors.text },
  value: { fontSize: 14, fontWeight: '700', color: colors.accent },
  track: {
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.accent + '55',
    borderRadius: 14,
  },
  thumb: {
    position: 'absolute',
    width: 22,
    height: 22,
    marginLeft: -11,
    borderRadius: 11,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: '#fff',
    top: 2,
  },
});
