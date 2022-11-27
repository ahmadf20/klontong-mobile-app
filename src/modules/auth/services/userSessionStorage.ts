import EncryptedStorage from 'react-native-encrypted-storage';
import {UserSession} from '../slices/authSlice';

const USER_SESSION_KEY = 'user_session';

const getUserSession = () => {
  return EncryptedStorage.getItem(USER_SESSION_KEY)
    .then(res => {
      if (res) {
        return JSON.parse(res) as UserSession;
      }
    })
    .catch(_ => {});
};

const storeUserSession = (data: UserSession) => {
  return EncryptedStorage.setItem(USER_SESSION_KEY, JSON.stringify(data))
    .then(() => true)
    .catch(() => false);
};

const clearUserSession = () => {
  return EncryptedStorage.removeItem(USER_SESSION_KEY)
    .then(() => true)
    .catch(() => false);
};

export {getUserSession, storeUserSession, clearUserSession};
