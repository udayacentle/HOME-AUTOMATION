import { colors, spacing } from '../theme/tokens';

export const tabScreenOptions = {
  sceneStyle: { backgroundColor: colors.background },
  headerStyle: { backgroundColor: colors.surfaceAlt },
  headerTintColor: colors.text,
  headerTitleStyle: { fontWeight: '700' as const },
  tabBarStyle: {
    backgroundColor: colors.surfaceAlt,
    borderTopColor: colors.border,
    height: 64,
    paddingBottom: spacing.sm,
    paddingTop: spacing.xs,
  },
  tabBarActiveTintColor: colors.accent,
  tabBarInactiveTintColor: colors.textMuted,
  tabBarLabelStyle: { fontSize: 10, fontWeight: '500' as const },
  tabBarIconStyle: { marginTop: 2 },
  tabBarScrollEnabled: false,
};

export const navTheme = {
  dark: true,
  colors: {
    primary: colors.accent,
    background: colors.background,
    card: colors.surfaceAlt,
    text: colors.text,
    border: colors.border,
    notification: colors.accent,
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' as const },
    medium: { fontFamily: 'System', fontWeight: '500' as const },
    bold: { fontFamily: 'System', fontWeight: '700' as const },
    heavy: { fontFamily: 'System', fontWeight: '800' as const },
  },
};
