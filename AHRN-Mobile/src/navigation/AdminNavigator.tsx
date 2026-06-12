import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogoutButton from '../components/LogoutButton';
import AdminComplianceScreen from '../screens/AdminComplianceScreen';
import AdminDisputesScreen from '../screens/AdminDisputesScreen';
import AdminScreen from '../screens/AdminScreen';
import { tabScreenOptions } from './sharedTabOptions';
import { tabBarIcon } from './tabIcons';
import type { AdminTabParamList } from './types';

const Tab = createBottomTabNavigator<AdminTabParamList>();

export default function AdminNavigator() {
  return (
    <Tab.Navigator screenOptions={{ ...tabScreenOptions, headerRight: () => <LogoutButton /> }}>
      <Tab.Screen
        name="AdminOverview"
        component={AdminScreen}
        options={{
          title: 'Admin Overview',
          tabBarLabel: 'Overview',
          tabBarIcon: tabBarIcon('Admin'),
        }}
      />
      <Tab.Screen
        name="AdminDisputes"
        component={AdminDisputesScreen}
        options={{
          title: 'Disputes',
          tabBarLabel: 'Disputes',
          tabBarIcon: tabBarIcon('Bids'),
        }}
      />
      <Tab.Screen
        name="AdminCompliance"
        component={AdminComplianceScreen}
        options={{
          title: 'Compliance',
          tabBarLabel: 'Compliance',
          tabBarIcon: tabBarIcon('Forecast'),
        }}
      />
    </Tab.Navigator>
  );
}
