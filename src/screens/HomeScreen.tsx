import {Box, FlatList, Input, Pressable, Spinner} from 'native-base';
import React, {useCallback, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {useAppSelector, useAppDispatch} from '../hooks';
import {useAppNavigation} from '../hooks/useNavigation';
import {fetchProducts} from '../modules/product/services/productsServices';
import {setFilter} from '../modules/product/slices/productsSlice';
import {ProductListCard} from '../ui/product/ProductListCard';
import {PageSpinner} from '../ui/_base';
import {debounce} from '../utils/debounce';

const LIMIT = 10;

export const HomeScreen = () => {
  const {
    data,
    status,
    currentPage = 0,
    totalPage = 1,
    filter,
  } = useAppSelector(state => state.products);
  const appDispatch = useAppDispatch();
  const {navigate} = useAppNavigation();

  const [isLoading, isRefreshing, isIdle, isLoadingMore] = [
    status === 'loading',
    status === 'refreshing',
    status === 'idle',
    status === 'loadingMore',
  ];

  const handleFetch = useCallback(async () => {
    appDispatch(
      fetchProducts({
        page: 1,
        limit: LIMIT,
        filter,
      }),
    );
  }, [appDispatch, filter]);

  const handleFetchMore = useCallback(async () => {
    if (currentPage < totalPage && !isLoadingMore) {
      appDispatch(
        fetchProducts({
          page: currentPage + 1,
          limit: LIMIT,
          filter,
        }),
      );
    }
  }, [appDispatch, currentPage, filter, isLoadingMore, totalPage]);

  const debounceFilter = debounce(
    (val: string) => appDispatch(setFilter(val)),
    300,
  );

  const handleOnChangeText = (val: string) => {
    debounceFilter(val);
  };

  useEffect(() => {
    if (isIdle) {
      handleFetch();
    }
  }, [handleFetch, isIdle]);

  return (
    <Box safeAreaBottom flex="1" bg="white">
      <Input
        m="4"
        placeholder="Search product"
        onChangeText={handleOnChangeText}
      />

      {isLoading ? (
        <PageSpinner />
      ) : (
        <FlatList
          flex="1"
          bg="white"
          refreshControl={
            <RefreshControl onRefresh={handleFetch} refreshing={isRefreshing} />
          }
          data={data}
          onEndReachedThreshold={0.2}
          onEndReached={() => handleFetchMore()}
          ListFooterComponent={isLoadingMore ? <Spinner /> : null}
          renderItem={({item, index}) => {
            return (
              <Pressable
                key={`${index}-${item.id}`}
                onPress={() => {
                  navigate('ProductDetail', {
                    id: item.id.toString(),
                  });
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
