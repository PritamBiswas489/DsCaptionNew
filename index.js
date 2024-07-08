/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import i18n from './src/assets/language';
import { Provider } from 'react-redux';
import store from './src/store';
import Toast from 'react-native-toast-message';

LogBox.ignoreAllLogs();

const ReduxApp = () => (
    <Provider store={store}>
      <App />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
