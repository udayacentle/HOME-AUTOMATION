import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogoutButton from '../components/LogoutButton';
import CompleteJobScreen from '../screens/CompleteJobScreen';
import TechnicianJobDetailScreen from '../screens/TechnicianJobDetailScreen';
import TechnicianScreen from '../screens/TechnicianScreen';
import { tabScreenOptions } from './sharedTabOptions';
import { tabBarIcon } from './tabIcons';
import type { TechnicianTabParamList } from './types';

const Tab = createBottomTabNavigator<TechnicianTabParamList>();

export default function TechnicianNavigator() {
  return (
    <Tab.Navigator screenOptions={{ ...tabScreenOptions, headerRight: () => <LogoutButton /> }}>
      <Tab.Screen
        name="TechFeed"
        component={TechnicianScreen}
        options={{
          title: 'Opportunity Feed',
          tabBarLabel: 'Feed',
          tabBarIcon: tabBarIcon('Technician'),
        }}
      />
      <Tab.Screen
        name="TechJob"
        component={TechnicianJobDetailScreen}
        options={{
          title: 'Job Details',
          tabBarLabel: 'Job',
          tabBarIcon: tabBarIcon('Job'),
        }}
      />
      <Tab.Screen
        name="TechComplete"
        component={CompleteJobScreen}
        options={{
          title: 'Complete Job',
          tabBarLabel: 'Complete',
          tabBarIcon: tabBarIcon('Bids'),
        }}
      />
    </Tab.Navigator>
  );
}
