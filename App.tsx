import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src';
import {HomeScreen} from './src/screens';

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <HomeScreen />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
