import {
  AspectRatio,
  Box,
  Center,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../hooks';
import {useAppRoute} from '../hooks/useNavigation';
import {fetchProduct} from '../modules/product/services/productsServices';

export const ProductDetailScreen = () => {
  const {data, status} = useAppSelector(state => state.product);
  const appDispatch = useAppDispatch();
  const {params} = useAppRoute('ProductDetail');

  useEffect(() => {
    appDispatch(fetchProduct({id: params.id}));
  }, [appDispatch, params.id]);

  if (status === 'loading') {
    return (
      <Center safeArea flex="1">
        <Spinner />
      </Center>
    );
  }

  return (
    <VStack safeAreaBottom flex="1" p="4" space="4">
      <AspectRatio>
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
          <Text color="green.700" fontWeight="semibold" mt="2" fontSize="lg">
            {`$${data?.price}`}
          </Text>
        </Box>
      </HStack>
    </VStack>
  );
};
