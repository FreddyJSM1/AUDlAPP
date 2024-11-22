// screens/LoginScreen.js
import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const validUsers = [
    { username: 'Usuario ', password: '1234', type: 'usuario' },
    { username: 'Ambulancia ', password: '1234', type: 'ambulancia' },
    { username: 'Admin ', password: '1234', type: 'admin' },
  ];

  const handleLogin = () => {
    const user = validUsers.find(u => u.username === username && u.password === password);
    if (user) {
      if (user.type === 'usuario') {
        navigation.navigate('InicioUsuario');
      } else if (user.type === 'ambulancia') {
        navigation.navigate('InicioAmbulancia');
      } else {
        navigation.navigate('Admin');
      }
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text variant="titleLarge" style={{ marginBottom: 20, textAlign: 'center' }}>Iniciar Sesión</Text>
      <TextInput
        label="Usuario"
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Contraseña"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={{ marginBottom: 20 }}
      />
      <Button mode="contained" onPress={handleLogin}>
        Iniciar Sesión
      </Button>
    </View>
  );
}
