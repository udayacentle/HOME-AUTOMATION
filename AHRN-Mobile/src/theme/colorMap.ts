import { colors } from './tokens';

export type ColorKey = 'success' | 'warning' | 'danger' | 'accent' | 'text' | 'textMuted';

export function resolveColor(key: ColorKey): string {
  return colors[key];
}
