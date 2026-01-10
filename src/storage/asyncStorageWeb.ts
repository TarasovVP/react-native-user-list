interface Storage {
  readonly length: number;
  clear(): void;
  getItem(key: string): string | null;
  key(index: number): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
}

declare const localStorage: Storage;

const isLocalStorageAvailable = (): boolean => {
  try {
    // @ts-ignore
    return typeof window !== 'undefined' && 
           typeof localStorage !== 'undefined' &&
           localStorage !== null;
  } catch (e) {
    return false;
  }
};

const getStorage = (): Storage | null => {
  if (isLocalStorageAvailable()) {
    return localStorage;
  }
  return null;
};

const asyncStorageWeb = {
  getItem: async (key: string): Promise<string | null> => {
    const storage = getStorage();
    if (!storage) {
      return Promise.resolve(null);
    }
    try {
      const value = storage.getItem(key);
      return Promise.resolve(value);
    } catch (error) {
      console.error('AsyncStorage.web.getItem error:', error);
      return Promise.resolve(null);
    }
  },

  setItem: async (key: string, value: string): Promise<void> => {
    const storage = getStorage();
    if (!storage) {
      return Promise.resolve();
    }
    try {
      storage.setItem(key, value);
      return Promise.resolve();
    } catch (error) {
      console.error('AsyncStorage.web.setItem error:', error);
      return Promise.resolve();
    }
  },

  removeItem: async (key: string): Promise<void> => {
    const storage = getStorage();
    if (!storage) {
      return Promise.resolve();
    }
    try {
      storage.removeItem(key);
      return Promise.resolve();
    } catch (error) {
      console.error('AsyncStorage.web.removeItem error:', error);
      return Promise.resolve();
    }
  },

  clear: async (): Promise<void> => {
    const storage = getStorage();
    if (!storage) {
      return Promise.resolve();
    }
    try {
      storage.clear();
      return Promise.resolve();
    } catch (error) {
      console.error('AsyncStorage.web.clear error:', error);
      return Promise.resolve();
    }
  },

  getAllKeys: async (): Promise<string[]> => {
    const storage = getStorage();
    if (!storage) {
      return Promise.resolve([]);
    }
    try {
      const keys: string[] = [];
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key !== null) {
          keys.push(key);
        }
      }
      return Promise.resolve(keys);
    } catch (error) {
      console.error('AsyncStorage.web.getAllKeys error:', error);
      return Promise.resolve([]);
    }
  },

  mergeItem: async (key: string, value: string): Promise<void> => {
    const storage = getStorage();
    if (!storage) {
      return Promise.resolve();
    }
    try {
      const existing = storage.getItem(key);
      const existingObj = existing ? JSON.parse(existing) : {};
      const newObj = JSON.parse(value);
      const merged = { ...existingObj, ...newObj };
      storage.setItem(key, JSON.stringify(merged));
      return Promise.resolve();
    } catch (error) {
      console.error('AsyncStorage.web.mergeItem error:', error);
      return Promise.resolve();
    }
  },

  multiGet: async (keys: string[]): Promise<[string, string | null][]> => {
    const storage = getStorage();
    if (!storage) {
      return Promise.resolve([]);
    }
    try {
      const result = keys.map(key => [key, storage.getItem(key)]);
      return Promise.resolve(result as [string, string | null][]);
    } catch (error) {
      console.error('AsyncStorage.web.multiGet error:', error);
      return Promise.resolve([]);
    }
  },

  multiSet: async (keyValuePairs: [string, string][]): Promise<void> => {
    const storage = getStorage();
    if (!storage) {
      return Promise.resolve();
    }
    try {
      keyValuePairs.forEach(([key, value]) => {
        storage.setItem(key, value);
      });
      return Promise.resolve();
    } catch (error) {
      console.error('AsyncStorage.web.multiSet error:', error);
      return Promise.resolve();
    }
  },

  multiRemove: async (keys: string[]): Promise<void> => {
    const storage = getStorage();
    if (!storage) {
      return Promise.resolve();
    }
    try {
      keys.forEach(key => storage.removeItem(key));
      return Promise.resolve();
    } catch (error) {
      console.error('AsyncStorage.web.multiRemove error:', error);
      return Promise.resolve();
    }
  },

  multiMerge: async (keyValuePairs: [string, string][]): Promise<void> => {
    const storage = getStorage();
    if (!storage) {
      return Promise.resolve();
    }
    try {
      await Promise.all(
        keyValuePairs.map(async ([key, value]) => {
          const existing = storage.getItem(key);
          const existingObj = existing ? JSON.parse(existing) : {};
          const newObj = JSON.parse(value);
          const merged = { ...existingObj, ...newObj };
          storage.setItem(key, JSON.stringify(merged));
        })
      );
      return Promise.resolve();
    } catch (error) {
      console.error('AsyncStorage.web.multiMerge error:', error);
      return Promise.resolve();
    }
  },
};

export default asyncStorageWeb;