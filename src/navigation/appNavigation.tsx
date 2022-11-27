import React, {useEffect} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {
  HomeScreen,
  ProductDetailScreen,
  AddProductScreen,
  AuthScreen,
} from '../screens';
import {RootStackParamList} from './appNavigationParamList';
import {Box, Button, useTheme} from 'native-base';
import {useAppNavigation} from '../hooks/useNavigation';
import {Icon, PageSpinner} from '../ui/_base';
import {logout, restoreToken} from '../modules/auth/slices/authSlice';
import {
  clearUserSession,
  getUserSession,
} from '../modules/auth/services/userSessionStorage';
import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigation = () => {
  const {navigate} = useAppNavigation();
  const {colors} = useTheme();
  const {data, status} = useAppSelector(state => state.auth);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    getUserSession().then(e => {
      appDispatch(
        restoreToken({
          token: e?.token,
          username: e?.username,
        }),
      );
    });
  }, [appDispatch]);

  const screenOptions: NativeStackNavigationOptions = {
    headerStyle: {},
    headerTitleStyle: {
      color: colors.black,
    },
    headerTintColor: colors.primary[700],
  };

  if (status === 'loading') {
    return <PageSpinner />;
  }

  const handleLogout = () => {
    clearUserSession().then(() => appDispatch(logout()));
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {!data?.token ? (
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{
            header: () => <Box />,
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
              headerTitleAlign: 'center',
              headerLeft: () => (
                <Button onPress={handleLogout} variant="ghost" rounded="full">
                  LOGOUT
                </Button>
              ),
              headerRight: () => (
                <Button
                  onPress={() => navigate('AddProduct')}
                  variant="ghost"
                  rounded="full">
                  <Icon.Add fill={colors.primary[700]} />
                </Button>
              ),
            }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{title: 'Product Detail'}}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={{title: 'Add Product'}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
