import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/tokens';

export default function BrandTitle() {
  return (
    <View style={styles.row}>
      <Image source={require('../../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>AHRN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 32, height: 32, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: '700', color: colors.text },
});
