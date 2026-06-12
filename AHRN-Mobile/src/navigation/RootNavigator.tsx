import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import RoleLoginScreen from '../screens/auth/RoleLoginScreen';
import RoleSelectScreen from '../screens/auth/RoleSelectScreen';
import AdminNavigator from './AdminNavigator';
import HomeownerNavigator from './HomeownerNavigator';
import { navTheme } from './sharedTabOptions';
import SuperAdminNavigator from './SuperAdminNavigator';
import TechnicianNavigator from './TechnicianNavigator';

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: navTheme.colors.background,
    card: navTheme.colors.card,
    border: navTheme.colors.border,
    primary: navTheme.colors.primary,
    text: navTheme.colors.text,
  },
};

function AuthFlow() {
  const { pendingRole } = useAuth();
  return pendingRole ? <RoleLoginScreen /> : <RoleSelectScreen />;
}

function RoleApp() {
  const { user } = useAuth();
  if (!user) return null;

  switch (user.role) {
    case 'homeowner':
      return <HomeownerNavigator />;
    case 'technician':
      return <TechnicianNavigator />;
    case 'admin':
      return <AdminNavigator />;
    case 'superadmin':
      return <SuperAdminNavigator />;
    default:
      return null;
  }
}

export default function RootNavigator() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <RoleApp /> : <AuthFlow />}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: navTheme.colors.background,
  },
});
