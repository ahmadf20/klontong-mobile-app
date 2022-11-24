import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {HomeScreen, ProductDetailScreen} from '../screens';
import {RootStackParamList} from './appNavigationParamList';
import {Button, useTheme} from 'native-base';
import {useAppNavigation} from '../hooks/useNavigation';
import {AddProductScreen} from '../screens/AddProductScreen';
import {Icon} from '../ui/_base/icons';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigation = () => {
  const {navigate} = useAppNavigation();
  const {colors} = useTheme();

  const screenOptions: NativeStackNavigationOptions = {
    headerStyle: {},
    headerTitleStyle: {
      color: colors.black,
    },
    headerTintColor: colors.primary[700],
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerRight: () => (
            <Button onPress={() => navigate('AddProduct')} variant="ghost">
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
    </Stack.Navigator>
  );
};
