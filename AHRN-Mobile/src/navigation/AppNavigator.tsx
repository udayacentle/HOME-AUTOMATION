import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BrandTitle from '../components/BrandTitle';
import DashboardScreen from '../screens/DashboardScreen';
import ForecastScreen from '../screens/ForecastScreen';
import BidsScreen from '../screens/BidsScreen';
import JobScreen from '../screens/JobScreen';
import AdminScreen from '../screens/AdminScreen';
import { colors, spacing } from '../theme/tokens';
import type { RootTabParamList } from './types';
import { tabBarIcon } from './tabIcons';

const Tab = createBottomTabNavigator<RootTabParamList>();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surfaceAlt,
    border: colors.border,
    primary: colors.accent,
    text: colors.text,
  },
};

const tabScreenOptions = {
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

export default function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator screenOptions={tabScreenOptions}>
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
          options={{
            title: 'Forecast',
            tabBarLabel: 'Forecast',
            tabBarIcon: tabBarIcon('Forecast'),
          }}
        />
        <Tab.Screen
          name="Bids"
          component={BidsScreen}
          options={{
            title: 'Bids',
            tabBarLabel: 'Bids',
            tabBarIcon: tabBarIcon('Bids'),
          }}
        />
        <Tab.Screen
          name="Job"
          component={JobScreen}
          options={{
            title: 'Job',
            tabBarLabel: 'Job',
            tabBarIcon: tabBarIcon('Job'),
          }}
        />
        <Tab.Screen
          name="Admin"
          component={AdminScreen}
          options={{
            title: 'Admin',
            tabBarLabel: 'Admin',
            tabBarIcon: tabBarIcon('Admin'),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
