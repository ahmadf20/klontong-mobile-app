import {Box, FlatList, Pressable, Spinner, Text} from 'native-base';
import React, {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../hooks';
import {fetchProducts} from '../modules/product/services/productServices';
import {ProductListCard} from '../ui/product/productListCard';

export const HomeScreen = () => {
  const {data, status} = useAppSelector(state => state.products);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      appDispatch(fetchProducts());
    }
  }, [appDispatch, status]);

  return (
    <Box safeArea flex="1">
      <Text textAlign="center" fontWeight="bold" fontSize="lg" py="4">
        List of Product
      </Text>
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <FlatList
          px="4"
          flex="1"
          data={data.products}
          renderItem={({item, index}) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  console.log(item.image);
                }}>
                <ProductListCard item={item} />
              </Pressable>
            );
          }}
        />
      )}
    </Box>
  );
};
