import { Pressable, StyleSheet, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/tokens';

export default function LogoutButton() {
  const { logout } = useAuth();
  return (
    <Pressable onPress={logout} style={styles.btn} hitSlop={8}>
      <Text style={styles.text}>Logout</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { marginRight: 12, paddingVertical: 4, paddingHorizontal: 8 },
  text: { color: colors.accent, fontSize: 13, fontWeight: '600' },
});
