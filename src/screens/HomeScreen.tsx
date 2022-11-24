import {Box, Center, FlatList, Pressable, Spinner} from 'native-base';
import React, {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../hooks';
import {useAppNavigation} from '../hooks/useNavigation';
import {fetchProducts} from '../modules/product/services/productsServices';
import {ProductListCard} from '../ui/product/productListCard';

export const HomeScreen = () => {
  const {data, status} = useAppSelector(state => state.products);
  const appDispatch = useAppDispatch();
  const {navigate} = useAppNavigation();

  useEffect(() => {
    if (status === 'idle') {
      appDispatch(fetchProducts());
    }
  }, [appDispatch, status]);

  if (status === 'loading') {
    return (
      <Center safeArea flex="1">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box safeAreaBottom flex="1">
      <FlatList
        px="4"
        flex="1"
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
