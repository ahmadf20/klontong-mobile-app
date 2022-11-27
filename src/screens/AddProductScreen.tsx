import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  ScrollView,
  Select,
  Text,
  TextArea,
  useTheme,
  VStack,
} from 'native-base';
import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useAppNavigation} from '../hooks/useNavigation';
import {useAppDispatch, useAppSelector} from '../hooks/useRedux';
import {AddProductRequest} from '../modules/product/dto/addProductDTO';
import {
  fetchCategories,
  fetchProducts,
  postProduct,
} from '../modules/product/services/productsServices';
import {FormControl} from '../ui/_base';
import {Icon} from '../ui/_base';
import {allowOnlyNumber} from '../utils/formValidator';

type FormData = AddProductRequest;

export const AddProductScreen = () => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {goBack} = useAppNavigation();

  const appDispatch = useAppDispatch();
  const {data: categories = [], status} = useAppSelector(
    state => state.categories,
  );

  const isLoading = status === 'loading';

  useEffect(() => {
    appDispatch(fetchCategories());
  }, [appDispatch]);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid, isSubmitting},
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {},
  });

  const onSubmit = async (formData: FormData) => {
    try {
      await dispatch(postProduct(formData));
      dispatch(
        fetchProducts({
          page: 1,
          limit: 10,
        }),
      );
      goBack();
    } catch (error) {}
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

        <Controller
          name="image"
          control={control}
          rules={defaultRules}
          render={({field: {onChange, value}}) => (
            <>
              {value ? (
                <Image
                  source={{
                    uri: value,
                  }}
                  alt={value || 'Image'}
                  size={32}
                  rounded="md"
                />
              ) : (
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
              )}
              <Text
                fontSize="xs"
                color="gray.500"
                mt="2"
                onPress={() =>
                  onChange(
                    'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/888.jpg',
                  )
                }>
                Generate Image
              </Text>
            </>
          )}
        />

        <VStack space="1" mt="3">
          <FormControl label="Product Name" error={errors.name?.message}>
            <Controller
              name="name"
              control={control}
              rules={{
                ...defaultRules,
                maxLength: {
                  value: 80,
                  message: 'Max 80 Chars',
                },
                minLength: {
                  value: 10,
                  message: 'Min 10 Chars',
                },
              }}
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
              rules={{
                ...defaultRules,
                maxLength: {
                  value: 300,
                  message: 'Max 300 Chars',
                },
                minLength: {
                  value: 10,
                  message: 'Min 10 Chars',
                },
              }}
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
                rules={defaultRules}
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
                rules={defaultRules}
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
                  }
                  isDisabled={isLoading}>
                  {categories?.map((item, index) => (
                    <Select.Item
                      label={item.name}
                      value={item.id.toString()}
                      key={`${item.id}-${index}`}
                    />
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </VStack>
      </ScrollView>

      <Button
        isDisabled={!isValid}
        m="4"
        onPress={handleSubmit(onSubmit)}
        isLoading={isSubmitting}>
        Save
      </Button>
    </VStack>
  );
};
