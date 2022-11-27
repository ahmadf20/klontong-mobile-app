import {extendTheme, NativeBaseProvider} from 'native-base';
import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigation} from './src/navigation/appNavigation';
import {myTheme} from './src/themes';
import * as Sentry from '@sentry/react-native';
import {store} from './src/stores/store';

Sentry.init({
  dsn: 'https://ac2ed3b8fef44b2daf7ec609bc7e1e89@o413143.ingest.sentry.io/4504228435001344',
  tracesSampleRate: 1.0,
});

const theme = extendTheme(myTheme);

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={extendTheme(myTheme)}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

type CustomThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}

export default Sentry.wrap(App);
