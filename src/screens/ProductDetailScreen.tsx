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
    <VStack safeAreaBottom flex="1" bg="white">
      <ScrollView flex="1">
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
          <Text color="gray.500">
            {data?.description} Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Porro quaerat inventore non quos odio, in ipsam,
            doloribus vitae hic voluptate tempore, libero exercitationem
            blanditiis dolores possimus modi dignissimos laboriosam accusamus.
          </Text>
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
