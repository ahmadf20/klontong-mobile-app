import {Box, HStack, Image, Text} from 'native-base';
import React from 'react';
import {Product} from '../../modules/product/dto/productsDTO';

export const ProductListCard = ({item}: {item: Product}) => {
  return (
    <HStack space="3" bg="white" px="4" pb="4" rounded="lg">
      <Image
        source={{
          uri: item.image,
        }}
        alt={item.name || 'Image'}
        size="lg"
        rounded="md"
      />
      <Box flex="1">
        <Text fontSize="md" bold noOfLines={1}>
          {item.name}
        </Text>
        <Text color="gray.500" fontSize="xs" noOfLines={2}>
          {item.description}
        </Text>
        <HStack>
          <Text color="dark.300" fontWeight="semibold" mt="2" fontSize="sm">
            {`${item.sku} • `}
          </Text>
          <Text color="green.700" fontWeight="semibold" mt="2" fontSize="sm">
            {`$${item.price}`}
          </Text>
        </HStack>
      </Box>
    </HStack>
  );
};
