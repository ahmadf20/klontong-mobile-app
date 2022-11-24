import {Box, Center, FlatList, Pressable, Spinner} from 'native-base';
import React, {useCallback, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {useAppSelector, useAppDispatch} from '../hooks';
import {useAppNavigation} from '../hooks/useNavigation';
import {fetchProducts} from '../modules/product/services/productsServices';
import {ProductListCard} from '../ui/product/productListCard';

export const HomeScreen = () => {
  const {data, status} = useAppSelector(state => state.products);
  const appDispatch = useAppDispatch();
  const {navigate} = useAppNavigation();

  const [isLoading, isRefreshing, isIdle] = [
    status === 'loading',
    status === 'refreshing',
    status === 'idle',
  ];

  const handleFetch = useCallback(async () => {
    appDispatch(fetchProducts());
  }, [appDispatch]);

  useEffect(() => {
    if (isIdle) {
      handleFetch();
    }
  }, [handleFetch, isIdle]);

  if (isLoading) {
    return (
      <Center safeArea flex="1">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box safeAreaBottom flex="1" bg="white">
      <FlatList
        flex="1"
        bg="white"
        refreshControl={
          <RefreshControl onRefresh={handleFetch} refreshing={isRefreshing} />
        }
        ListHeaderComponent={<Box h="4" />}
        data={data?.items}
        renderItem={({item, index}) => {
          return (
            <Pressable
              key={index}
              onPress={() => {
                navigate('ProductDetail', {
                  id: item.id.toString(),
                });
              }}>
              <ProductListCard item={item} />
            </Pressable>
          );
        }}
      />
    </Box>
  );
};
