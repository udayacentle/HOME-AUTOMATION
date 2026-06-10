import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../theme/tokens';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
};

export default function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
