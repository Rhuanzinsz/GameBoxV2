import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth).catch(error => console.error("Erro ao sair:", error));
  };

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={100} color="white" />
      <Text style={styles.email}>{user?.email}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair do Aplicativo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  email: {
    color: 'white',
    fontSize: 18,
    marginVertical: 20,
  },
  logoutButton: {
    backgroundColor: '#aa2222',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 30,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;