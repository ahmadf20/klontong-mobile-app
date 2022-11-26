import {Box, FlatList, Pressable, Spinner} from 'native-base';
import React, {useCallback, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {useAppSelector, useAppDispatch} from '../hooks';
import {useAppNavigation} from '../hooks/useNavigation';
import {fetchProducts} from '../modules/product/services/productsServices';
import {ProductListCard} from '../ui/product/productListCard';
import {PageSpinner} from '../ui/_base';

const LIMIT = 10;

export const HomeScreen = () => {
  const {
    data,
    status,
    currentPage = 0,
    totalPage = 1,
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
      }),
    );
  }, [appDispatch]);

  const handleFetchMore = useCallback(async () => {
    if (currentPage < totalPage && !isLoadingMore) {
      appDispatch(
        fetchProducts({
          page: currentPage + 1,
          limit: LIMIT,
        }),
      );
    }
  }, [appDispatch, currentPage, isLoadingMore, totalPage]);

  useEffect(() => {
    if (isIdle) {
      handleFetch();
    }
  }, [handleFetch, isIdle]);

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <Box safeAreaBottom flex="1" bg="white">
      <FlatList
        flex="1"
        bg="white"
        refreshControl={
          <RefreshControl onRefresh={handleFetch} refreshing={isRefreshing} />
        }
        ListHeaderComponent={<Box h="4" />}
        data={data}
        onEndReachedThreshold={0.2}
        onEndReached={() => handleFetchMore()}
        ListFooterComponent={isLoadingMore ? <Spinner /> : null}
        renderItem={({item, index}) => {
          return (
            <Pressable
              key={index}
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
    </Box>
  );
};
