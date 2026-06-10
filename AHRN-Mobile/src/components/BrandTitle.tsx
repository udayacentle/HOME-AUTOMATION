import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/tokens';

export default function BrandTitle() {
  return (
    <View style={styles.row}>
      <View style={styles.logoWrap}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
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
  logo: { width: 36, height: 36 },
  title: { fontSize: 17, fontWeight: '700', color: colors.text, letterSpacing: 1.2 },
  subtitle: { fontSize: 10, fontWeight: '500', color: colors.textMuted, letterSpacing: 0.3 },
});
