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
  await notifee.createChannel({
    id: 'default_channel_id',
    name: 'Default Channel',
    sound: 'notification_sound', // Use the same name as the MP3 file without extension
    importance: AndroidImportance.HIGH,
  });
  await notifee.displayNotification({
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
    android: {
      channelId: 'default_channel_id',
      smallIcon: 'ic_launcher', // optional, defaults to your app icon
    },
  });
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
