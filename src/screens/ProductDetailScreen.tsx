import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useCallback, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {useAppRoute} from '../hooks/useNavigation';
import {useAppDispatch, useAppSelector} from '../hooks/useRedux';
import {fetchProduct} from '../modules/product/services/productsServices';
import {PageSpinner} from '../ui/_base';

export const ProductDetailScreen = () => {
  const {data, status} = useAppSelector(state => state.product);
  const appDispatch = useAppDispatch();
  const {params} = useAppRoute('ProductDetail');

  const [isLoading, isRefreshing, isIdle] = [
    status === 'loading',
    status === 'refreshing',
    status === 'idle',
  ];

  const handleFetch = useCallback(async () => {
    appDispatch(fetchProduct({id: params.id}));
  }, [appDispatch, params.id]);

  const product = data?.filter(e => e.id === params.id)[0];

  useEffect(() => {
    if (isIdle || !product) {
      handleFetch();
    }
  }, [isIdle, handleFetch, product]);

  if (isLoading || !product) {
    return <PageSpinner />;
  }

  return (
    <VStack safeAreaBottom flex="1" bg="white">
      <ScrollView
        flex="1"
        refreshControl={
          <RefreshControl onRefresh={handleFetch} refreshing={isRefreshing} />
        }>
        <VStack space="3" p="4">
          <AspectRatio ratio={3 / 4}>
            <Image
              source={{
                uri: product?.image,
              }}
              alt={product?.name || 'Image'}
              rounded="md"
            />
          </AspectRatio>
          <Text fontSize="xl" bold mt="2">
            {product?.name}
          </Text>
          <Text color="gray.500">{product?.description}</Text>
          <HStack justifyContent="space-between">
            <Box>
              <Text>Stock</Text>
              <Text color="dark.300" fontWeight="semibold" mt="2" fontSize="lg">
                {`${product?.sku}`}
              </Text>
            </Box>
            <Box>
              <Text>Category</Text>
              <Text color="gray.700" fontWeight="semibold" mt="2" fontSize="lg">
                {`${product?.categoryName}`}
              </Text>
            </Box>
            <Box>
              <Text>Price</Text>
              <Text
                color="green.700"
                fontWeight="semibold"
                mt="2"
                fontSize="lg">
                {`$${product?.price}`}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </ScrollView>
      <Button m="4">Checkout</Button>
    </VStack>
  );
};
