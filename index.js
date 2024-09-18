/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import i18n from './src/assets/language'; // Ensure this is initialized properly in App or another file
import { Provider } from 'react-redux';
import store from './src/store';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType  } from '@notifee/react-native';
import {PermissionsAndroid} from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

// Ignore all log warnings
LogBox.ignoreAllLogs();

// Main application component with Redux and Toast providers
const ReduxApp = () => {
  return (
    <Provider store={store}>
      <App />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  );
};

// Register the main application component
AppRegistry.registerComponent(appName, () => ReduxApp);
