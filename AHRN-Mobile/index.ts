import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { enableScreens } from 'react-native-screens';

import App from './App';

// Avoid native-screen overlay issues on some Android emulators (black screen).
enableScreens(false);

registerRootComponent(App);
