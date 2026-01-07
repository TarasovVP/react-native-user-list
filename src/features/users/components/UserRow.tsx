import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { User, userUtils } from '../types/user';

interface UserRowProps {
  user: User;
}

export const UserRow = ({ user }: UserRowProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.image }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{userUtils.getFullName(user)}</Text>
        <Text style={styles.birthDate}>{userUtils.formatBirthDate(user)}</Text>
        <Text style={styles.detail}>Email: {user.email}</Text>
        <Text style={styles.detail}>Phone: {user.phone}</Text>
        <Text style={styles.detail}>Gender: {user.gender}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  birthDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  detail: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
});