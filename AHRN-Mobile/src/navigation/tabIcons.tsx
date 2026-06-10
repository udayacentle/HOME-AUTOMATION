import TabBarIcon from '../components/TabBarIcon';
import type { RootTabParamList } from './types';

export function tabBarIcon(screen: keyof RootTabParamList) {
  return ({ color, size }: { color: string; size: number }) => (
    <TabBarIcon name={screen} color={color} size={size} />
  );
}
