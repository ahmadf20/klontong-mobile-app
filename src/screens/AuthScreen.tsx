import {Box, Button, Input, ScrollView, Text} from 'native-base';
import React from 'react';
import {useAppDispatch} from '../hooks/useRedux';
import {login} from '../modules/auth/slices/authSlice';
import {FormControl} from '../ui/_base';

export const AuthScreen = () => {
  const appDispatch = useAppDispatch();

  const handleLogin = async () => {
    await appDispatch(
      login({
        token: 'DUMMY_TOKEN',
        username: 'DUMMY_USERNAME',
      }),
    );
  };

  return (
    <Box flex="1" safeArea bg="white">
      <ScrollView p="4">
        <Text fontSize="2xl" fontWeight="semibold" mb="2">
          Welcome to Klontong
        </Text>
        <Text mb="6" color="gray.500">
          Please login with your registered username and password
        </Text>
        <FormControl label="Username">
          <Input />
        </FormControl>

        <FormControl label="Password" mt="2">
          <Input />
        </FormControl>
        <Button mt="6" onPress={handleLogin}>
          LOGIN
        </Button>
      </ScrollView>
    </Box>
  );
};
