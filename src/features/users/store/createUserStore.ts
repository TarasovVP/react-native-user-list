import { create } from 'zustand';
import { User } from '../types/user';
import type { UsersApi } from '../../../api/usersApi';
import type { usersDB as usersDBValue } from '../../../db/usersDB';

export interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  usingCache: boolean;

  loadUsers: (forceRefresh?: boolean) => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
}

export type UserStoreDeps = {
  usersApi: UsersApi;
  usersDB: typeof usersDBValue;
};

export const createUserStore = (deps: UserStoreDeps) =>
  create<UserState>((set, get) => ({
    users: [],
    isLoading: false,
    error: null,
    usingCache: false,

    loadUsers: async (forceRefresh = false) => {
      if (get().isLoading) return;

      set({ isLoading: true, error: null });

      try {
        if (!forceRefresh) {
          const cachedUsers = await deps.usersDB.loadUsers();
          if (cachedUsers.length > 0) {
            set({
              users: cachedUsers,
              isLoading: false,
              usingCache: true,
            });
          }
        }

        const freshUsers = await deps.usersApi.fetchUsers();
        await deps.usersDB.saveUsers(freshUsers);

        set({
          users: freshUsers,
          isLoading: false,
          usingCache: false,
        });
      } catch (error) {
        console.error('Failed to load users:', error);

        const cachedUsers = await deps.usersDB.loadUsers();

        if (cachedUsers.length > 0) {
          set({
            users: cachedUsers,
            error: 'Using cached data. Connection error.',
            isLoading: false,
            usingCache: true,
          });
        } else {
          set({
            error: 'Failed to load users. Please try again.',
            isLoading: false,
          });
        }
      }
    },

    refresh: async () => {
      await get().loadUsers(true);
    },

    clearError: () => {
      set({ error: null });
    },
  }));

export type UserStoreHook = ReturnType<typeof createUserStore>;