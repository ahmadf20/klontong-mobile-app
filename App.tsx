import {extendTheme, NativeBaseProvider} from 'native-base';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigation} from './src/navigation/appNavigation';
import {ButtonStyle, InputStyle, TextAreaStyle} from './src/themes';

const theme = extendTheme({
  colors: {},
  components: {
    Button: ButtonStyle,
    Input: InputStyle,
    TextArea: TextAreaStyle,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
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

export default App;
