import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const UsersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native User List</Text>
      <Text style={styles.subtitle}>
        KMP/Flutter/React Native Comparison Project
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold', 
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
