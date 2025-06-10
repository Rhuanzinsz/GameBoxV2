import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleLogin = () => {

const handleLogin = () => {
  console.log("--- Botão 'Entrar' foi clicado! ---");

  if (email === '' || password === '') {
    console.log("Erro: Campos vazios.");
    Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    return;
  }

  console.log(`Tentando logar com o email: ${email}`);
  console.log("CHAMANDO A FUNÇÃO DO FIREBASE: signInWithEmailAndPassword...");

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log("SUCESSO! O Firebase respondeu. Usuário logado:", userCredential.user.email);
    })
    .catch(error => {
      console.error("ERRO DO FIREBASE:", error.code, error.message);
      Alert.alert('Erro de Login', `Ocorreu um erro: ${error.message}`);
    });

  console.log("...aguardando a resposta do Firebase.");
};
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('Usuário logado:', userCredential.user.email);
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro de Login', 'Email ou senha inválidos.');
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

     <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
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
    padding: 20,
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 50,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#00aaff',
    marginTop: 20,
  },
});

export default LoginScreen;