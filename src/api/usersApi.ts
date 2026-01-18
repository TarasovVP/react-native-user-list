import type { AxiosInstance } from 'axios';
import { apiClient } from './client';
import { USERS_ENDPOINT } from '../utils/constants';
import { User, userUtils } from '../features/users/types/user';

interface ApiResponse {
  users: Array<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    image: string;
    age: number;
    birthDate: string;
    gender: string;
  }>;
  total: number;
  skip: number;
  limit: number;
}

export const createUsersApi = (client: AxiosInstance) => ({
  fetchUsers: async (): Promise<User[]> => {
    try {
      const response = await client.get<ApiResponse>(USERS_ENDPOINT);
      return response.data.users.map((apiUser) => userUtils.fromApi(apiUser));
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
});

export type UsersApi = ReturnType<typeof createUsersApi>;

export const usersApi: UsersApi = createUsersApi(apiClient);