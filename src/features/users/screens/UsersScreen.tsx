import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import { UserRow } from '../components/UserRow';
import { User } from '../types/user';
import { usersApi } from '../../../api/usersApi';
import { userStorage } from '../../../storage/userStorage';

export const UsersScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingCache, setUsingCache] = useState(false);

  useEffect(() => {
    loadUsersWithCache();
  }, []);

  const loadUsersWithCache = async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!forceRefresh) {
        const cachedUsers = await userStorage.loadUsers();
        if (cachedUsers.length > 0) {
          setUsers(cachedUsers);
          setUsingCache(true);
          setIsLoading(false);
        }
      }
      
      const freshData = await usersApi.fetchUsers();
      
      await userStorage.saveUsers(freshData);
      
      setUsers(freshData);
      setUsingCache(false);
      
    } catch (err) {
      console.error(err);
      
      if (users.length === 0) {
        setError('Failed to load users. Please check your connection.');
      } else {
        setError('Using cached data. Connection error.');
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadUsersWithCache(true);
  };

  const handleRetry = async () => {
    await loadUsersWithCache(true);
  };

  if (isLoading && users.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading users...</Text>
      </View>
    );
  }

  if (error && users.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={handleRetry}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Users List</Text>
        <Text style={styles.subtitle}>
          React Native with Real API {usingCache && '(Cached)'}
        </Text>
        {error && users.length > 0 && (
          <Text style={styles.cacheWarning}>⚠️ Using cached data</Text>
        )}
      </View>
      
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserRow user={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  cacheWarning: {
    fontSize: 14,
    color: '#FF9500',
    textAlign: 'center',
    marginTop: 4,
    fontStyle: 'italic',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 8,
  },
  retryText: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 16,
  },
});