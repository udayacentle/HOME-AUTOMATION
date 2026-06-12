import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BrandTitle from '../components/BrandTitle';
import LogoutButton from '../components/LogoutButton';
import BidsScreen from '../screens/BidsScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ForecastScreen from '../screens/ForecastScreen';
import JobScreen from '../screens/JobScreen';
import { tabScreenOptions } from './sharedTabOptions';
import { tabBarIcon } from './tabIcons';
import type { HomeownerTabParamList } from './types';

const Tab = createBottomTabNavigator<HomeownerTabParamList>();

export default function HomeownerNavigator() {
  return (
    <Tab.Navigator screenOptions={{ ...tabScreenOptions, headerRight: () => <LogoutButton /> }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerTitle: () => <BrandTitle />,
          tabBarLabel: 'Home',
          tabBarIcon: tabBarIcon('Dashboard'),
        }}
      />
      <Tab.Screen
        name="Forecast"
        component={ForecastScreen}
        options={{ title: 'Forecast', tabBarLabel: 'Forecast', tabBarIcon: tabBarIcon('Forecast') }}
      />
      <Tab.Screen
        name="Bids"
        component={BidsScreen}
        options={{ title: 'Bids', tabBarLabel: 'Bids', tabBarIcon: tabBarIcon('Bids') }}
      />
      <Tab.Screen
        name="Job"
        component={JobScreen}
        options={{ title: 'Job', tabBarLabel: 'Job', tabBarIcon: tabBarIcon('Job') }}
      />
    </Tab.Navigator>
  );
}
