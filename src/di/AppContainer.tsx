import React, { createContext, useContext, useMemo } from 'react';
import type { AxiosInstance } from 'axios';
import type { Database } from '@nozbe/watermelondb';

import { createApiClient } from '../api/client';
import { createUsersApi, type UsersApi } from '../api/usersApi';

import { database } from '../db/database';
import { usersDB } from '../db/usersDB';

import { createUserStore, type UserStoreHook } from '../features/users/store/createUserStore';

export type AppDeps = {
  apiClient: AxiosInstance;
  usersApi: UsersApi;

  database: Database;
  usersDB: typeof usersDB;
};

type AppContainer = {
  deps: AppDeps;
  useUserStore: UserStoreHook;
};

const AppContainerContext = createContext<AppContainer | null>(null);

export const AppContainerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const container = useMemo<AppContainer>(() => {
    const apiClient = createApiClient();
    const usersApi = createUsersApi(apiClient);

    const deps: AppDeps = {
      apiClient,
      usersApi,
      database,
      usersDB,
    };

    const useUserStore = createUserStore({
      usersApi: deps.usersApi,
      usersDB: deps.usersDB,
    });

    return { deps, useUserStore };
  }, []);

  return <AppContainerContext.Provider value={container}>{children}</AppContainerContext.Provider>;
};

export const useAppContainer = (): AppContainer => {
  const container = useContext(AppContainerContext);
  if (!container) throw new Error('AppContainerProvider is missing');
  return container;
};

export const useAppDeps = (): AppDeps => useAppContainer().deps;
