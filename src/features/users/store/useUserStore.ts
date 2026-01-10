import { create } from 'zustand';
import { User } from '../types/user';
import { usersApi } from '../../../api/usersApi';
import { userStorage } from '../../../storage/userStorage';

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  usingCache: boolean;
  
  loadUsers: (forceRefresh?: boolean) => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  usingCache: false,

  loadUsers: async (forceRefresh = false) => {
    if (get().isLoading) return;
    
    set({ isLoading: true, error: null });

    try {
      if (!forceRefresh) {
        const cachedUsers = await userStorage.loadUsers();
        if (cachedUsers.length > 0) {
          set({ 
            users: cachedUsers, 
            isLoading: false, 
            usingCache: true 
          });
        }
      }

      const freshUsers = await usersApi.fetchUsers();
      
      await userStorage.saveUsers(freshUsers);

      set({ 
        users: freshUsers, 
        isLoading: false, 
        usingCache: false 
      });

    } catch (error) {
      console.error('Failed to load users:', error);
      
      const cachedUsers = await userStorage.loadUsers();
      
      if (cachedUsers.length > 0) {
        set({ 
          users: cachedUsers, 
          error: 'Using cached data. Connection error.',
          isLoading: false,
          usingCache: true
        });
      } else {
        set({ 
          error: 'Failed to load users. Please try again.',
          isLoading: false 
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