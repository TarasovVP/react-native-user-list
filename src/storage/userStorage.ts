import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../features/users/types/user';

const STORAGE_KEYS = {
  USERS: '@users_list',
  LAST_UPDATED: '@users_last_updated',
};

export const userStorage = {
  saveUsers: async (users: User[]): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(users);
      await AsyncStorage.setItem(STORAGE_KEYS.USERS, jsonValue);
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_UPDATED, Date.now().toString());
    } catch (error) {
      console.error('Failed to save users to storage', error);
    }
  },

  loadUsers: async (): Promise<User[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Failed to load users from storage', error);
      return [];
    }
  },

  clearUsers: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USERS);
      await AsyncStorage.removeItem(STORAGE_KEYS.LAST_UPDATED);
    } catch (error) {
      console.error('Failed to clear storage', error);
    }
  },

  getLastUpdated: async (): Promise<number> => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.LAST_UPDATED);
      return value ? parseInt(value, 10) : 0;
    } catch (error) {
      return 0;
    }
  },
};