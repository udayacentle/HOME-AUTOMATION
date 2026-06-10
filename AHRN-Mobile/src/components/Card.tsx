import { ReactNode } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, spacing } from '../theme/tokens';

type CardProps = {
  title?: string;
  accent?: string;
  children: ReactNode;
  style?: ViewStyle;
};

export default function Card({ title, accent, children, style }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        accent ? { borderLeftWidth: 4, borderLeftColor: accent } : undefined,
        style,
      ]}
    >
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
});
