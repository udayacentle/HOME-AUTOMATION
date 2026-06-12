import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/tokens';

export default function BrandTitle() {
  return (
    <View style={styles.row}>
      <View style={styles.logoWrap}>
        <View style={styles.logoHouse} />
        <View style={styles.logoCheck} />
      </View>
      <View>
        <Text style={styles.title}>AHRN</Text>
        <Text style={styles.subtitle}>Home Reliability</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  logoHouse: {
    width: 18,
    height: 14,
    backgroundColor: colors.accent,
    borderRadius: 2,
    marginTop: 8,
  },
  logoCheck: {
    position: 'absolute',
    bottom: 6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
  },
  title: { fontSize: 17, fontWeight: '700', color: colors.text, letterSpacing: 1.2 },
  subtitle: { fontSize: 10, fontWeight: '500', color: colors.textMuted, letterSpacing: 0.3 },
});
