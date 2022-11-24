import {Box, Center, FlatList, Pressable, Spinner} from 'native-base';
import React, {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../hooks';
import {useAppNavigation, useAppRoute} from '../hooks/useNavigation';
import {fetchProducts} from '../modules/product/services/productServices';
import {ProductListCard} from '../ui/product/productListCard';

export const ProductDetailScreen = () => {
  const {data, status} = useAppSelector(state => state.products);
  const appDispatch = useAppDispatch();

  const {setOptions} = useAppNavigation();
  const {params} = useAppRoute('ProductDetail');

  useEffect(() => {
    setOptions({
      title: params.id,
    });
  }, [params.id, setOptions]);

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
    </Box>
  );
};
