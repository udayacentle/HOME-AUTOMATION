import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogoutButton from '../components/LogoutButton';
import GovernanceScreen from '../screens/GovernanceScreen';
import SuperAdminScreen from '../screens/SuperAdminScreen';
import { tabScreenOptions } from './sharedTabOptions';
import { tabBarIcon } from './tabIcons';
import type { SuperAdminTabParamList } from './types';

const Tab = createBottomTabNavigator<SuperAdminTabParamList>();

export default function SuperAdminNavigator() {
  return (
    <Tab.Navigator screenOptions={{ ...tabScreenOptions, headerRight: () => <LogoutButton /> }}>
      <Tab.Screen
        name="SuperAI"
        component={SuperAdminScreen}
        options={{
          title: 'AI Console',
          tabBarLabel: 'AI Console',
          tabBarIcon: tabBarIcon('SuperAdmin'),
        }}
      />
      <Tab.Screen
        name="SuperGovernance"
        component={GovernanceScreen}
        options={{
          title: 'Governance',
          tabBarLabel: 'Governance',
          tabBarIcon: tabBarIcon('Admin'),
        }}
      />
    </Tab.Navigator>
  );
}
