import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { createClient } from '@supabase/supabase-js';

// Inicializando o Supabase com a URL do projeto e chave da API
const supabaseUrl = 'https://zbnivlqvqzrukeuwmqcm.supabase.co';  // Bota a sua chave professor
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpibml2bHF2cXpydWtldXdtcWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MzI4NjksImV4cCI6MjA0NzUwODg2OX0.w0mjN5XIy5IFbWexhgiOlQMw8PPylFlQrwk2DsFJwpI';  // Substitua pela chave da API do seu projeto
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Função para validar o e-mail (formato simples)
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Função para validar a senha (mínimo 6 caracteres)
  const validatePassword = (password) => password.length >= 6;

  // Função de cadastro de usuário
  const handleRegister = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      // Chamando o Supabase para cadastrar o usuário
      const { user, error } = await supabase.auth.signUp({ email, password });
      console.log('Resultado do Cadastro:', user, error); // Depuração
      if (error) throw error; // Lançar erro caso haja
      Alert.alert('Cadastro bem-sucedido', 'Você foi registrado com sucesso!');
    } catch (error) {
      console.error('Erro no Cadastro:', error); // Log de erro
      Alert.alert('Erro', error.message); // Exibe o erro
    }
  };

  // Função de login de usuário
  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      // Chamando o Supabase para autenticar o usuário
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log('Resultado do Login:', user, error); // Depuração
      if (error) throw error; // Lançar erro caso haja
      setIsLoggedIn(true); // Define o estado de logado como verdadeiro
      Alert.alert('Login bem-sucedido', `Bem-vindo, ${user.email}`);
    } catch (error) {
      console.error('Erro no Login:', error); // Log de erro
      Alert.alert('Erro', error.message); // Exibe o erro
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      {!isLoggedIn ? (
        <>
          <TextInput
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            style={{ width: '100%', marginBottom: 10 }}
          />
          <TextInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ width: '100%', marginBottom: 10 }}
          />
          <Button mode="contained" onPress={handleRegister} style={{ marginBottom: 10 }}>
            Cadastrar
          </Button>
          <Button mode="outlined" onPress={handleLogin}>
            Login
          </Button>
        </>
      ) : (
        <Text>Bem-vindo! Você está logado.</Text>
      )}
    </View>
  );
}
