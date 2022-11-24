import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigation} from './src/navigation/appNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
