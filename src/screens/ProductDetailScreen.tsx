import {
  AspectRatio,
  Box,
  Button,
  Center,
  HStack,
  Image,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React, {useCallback, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {useAppSelector, useAppDispatch} from '../hooks';
import {useAppRoute} from '../hooks/useNavigation';
import {fetchProduct} from '../modules/product/services/productsServices';

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

  useEffect(() => {
    if (isIdle) {
      handleFetch();
    }
  }, [isIdle, handleFetch]);

  if (isLoading) {
    return (
      <Center safeArea flex="1">
        <Spinner />
      </Center>
    );
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
                uri: data?.image,
              }}
              alt={data?.name || 'Image'}
              rounded="md"
            />
          </AspectRatio>
          <Text fontSize="xl" bold>
            {data?.name}
          </Text>
          <Text color="gray.500">{data?.description}</Text>
          <HStack justifyContent="space-between">
            <Box>
              <Text>Stock</Text>
              <Text color="dark.300" fontWeight="semibold" mt="2" fontSize="lg">
                {`${data?.sku}`}
              </Text>
            </Box>
            <Box>
              <Text>Category</Text>
              <Text color="gray.700" fontWeight="semibold" mt="2" fontSize="lg">
                {`${data?.categoryName}`}
              </Text>
            </Box>
            <Box>
              <Text>Price</Text>
              <Text
                color="green.700"
                fontWeight="semibold"
                mt="2"
                fontSize="lg">
                {`$${data?.price}`}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </ScrollView>
      <Button m="4">Checkout</Button>
    </VStack>
  );
};
