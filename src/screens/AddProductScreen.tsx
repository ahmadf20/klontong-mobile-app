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
import {Controller, useForm} from 'react-hook-form';
import {ProductDetail} from '../modules/product/dto/productDTO';
import {FormControl} from '../ui/_base';
import {Icon} from '../ui/_base/icons';
import {allowOnlyNumber} from '../utils/formValidator';

type FormData = Omit<ProductDetail, 'categoryName' | 'id'>;
const categories = ['A', 'B', 'C', 'D'];

export const AddProductScreen = () => {
  const {colors} = useTheme();
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      // id: new Date().getUTCMilliseconds().toString() + Math.random().toString(),
      createdAt: new Date(),
    },
  });

  const onSubmit = (data: FormData) => {
    return console.log(data);
  };

  const defaultRules = {
    required: {
      value: true,
      message: 'Required',
    },
  };

  return (
    <VStack safeAreaBottom flex="1" bg="white">
      <ScrollView flex="1" p="4">
        <Text color="gray.500" mb="2" fontWeight="medium">
          Product Image
        </Text>
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

        <VStack space="1" mt="3">
          <FormControl label="Product Name" error={errors.name?.message}>
            <Controller
              name="name"
              control={control}
              rules={defaultRules}
              render={({field: {onBlur, onChange, value}}) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={val => onChange(val)}
                />
              )}
            />
          </FormControl>

          <FormControl label="Description" error={errors.description?.message}>
            <Controller
              name="description"
              control={control}
              rules={defaultRules}
              render={({field: {onBlur, onChange, value}}) => (
                <TextArea
                  autoCompleteType=""
                  value={value}
                  onBlur={onBlur}
                  onChangeText={val => onChange(val)}
                />
              )}
            />
          </FormControl>

          <HStack space="4">
            <FormControl label="Price" error={errors.price?.message} flex="1">
              <Controller
                name="price"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Required',
                  },
                }}
                render={({field: {onBlur, onChange, value}}) => (
                  <Input
                    keyboardType="number-pad"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={val => onChange(allowOnlyNumber(val))}
                  />
                )}
              />
            </FormControl>
            <FormControl label="Stock" error={errors.sku?.message} flex="1">
              <Controller
                name="sku"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Required',
                  },
                }}
                render={({field: {onBlur, onChange, value}}) => (
                  <Input
                    keyboardType="number-pad"
                    value={value?.toString()}
                    onBlur={onBlur}
                    onChangeText={val => onChange(allowOnlyNumber(val))}
                  />
                )}
              />
            </FormControl>
          </HStack>

          <FormControl label="Category" error={errors.sku?.message} flex="1">
            <Controller
              name="categoryId"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Required',
                },
              }}
              render={({field: {onChange, value}}) => (
                <Select
                  selectedValue={value?.toString()}
                  onValueChange={val => onChange(val)}
                  dropdownIcon={
                    <Box pr="2">
                      <Icon.CircleDropDown fill={colors.gray[400]} />
                    </Box>
                  }>
                  {categories.map((item, index) => (
                    <Select.Item
                      label={`Category ${item}`}
                      value={index.toString()}
                    />
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </VStack>
      </ScrollView>

      <Button isDisabled={!isValid} m="4" onPress={handleSubmit(onSubmit)}>
        Save
      </Button>
    </VStack>
  );
};
