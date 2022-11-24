import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/appNavigationParamList';

export const useAppNavigation = () => {
  return useNavigation<
    NativeStackNavigationProp<RootStackParamList, keyof RootStackParamList>
  >();
};

export const useAppRoute = <T extends keyof RootStackParamList>(
  routeName: T,
) => {
  return useRoute<RouteProp<RootStackParamList, typeof routeName>>();
};
