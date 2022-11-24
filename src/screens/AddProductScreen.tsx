import {
  Box,
  Button,
  HStack,
  Input,
  ScrollView,
  Select,
  Text,
  TextArea,
  useTheme,
  VStack,
} from 'native-base';
import React from 'react';
import {Icon} from '../ui/_base/icons';

export const AddProductScreen = () => {
  const {colors} = useTheme();

  return (
    <VStack safeAreaBottom flex="1" bg="white">
      <ScrollView flex="1" p="4">
        <VStack space="4">
          <Text color="gray.500">Product Image</Text>
          <Box
            w="32"
            h="32"
            borderColor="gray.300"
            borderWidth="1"
            bg="gray.50"
            justifyContent="center"
            alignItems="center"
            rounded="md">
            <Icon.Image width={24} height={24} fill="gray" />
          </Box>
          <Text mt="2" color="gray.500">
            Product Detail
          </Text>
          <Input placeholder="Product Name" />
          <TextArea placeholder="Description" autoCompleteType="" />
          <HStack space="4">
            <Input placeholder="Price" flex="1" keyboardType="number-pad" />
            <Input placeholder="Stock" flex="1" keyboardType="number-pad" />
          </HStack>
          <Select
            placeholder="Category"
            dropdownIcon={
              <Box pr="2">
                <Icon.CircleDropDown fill={colors.gray[400]} />
              </Box>
            }>
            <Select.Item label="Satu" value="1" />
            <Select.Item label="Dua" value="2" />
            <Select.Item label="Tiga" value="3" />
          </Select>
        </VStack>
      </ScrollView>

      <Button m="4">Save</Button>
    </VStack>
  );
};
