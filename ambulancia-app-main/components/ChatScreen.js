// ChatScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addMensaje } from '../redux/ambulanciaSlice';

export default function ChatScreen({ route }) {
  const { perfil } = route.params;
  const dispatch = useDispatch();
  const conversacion = useSelector((state) => state.ambulancia.conversacion);
  const [mensaje, setMensaje] = useState('');

  const enviarMensaje = () => {
    if (mensaje.trim()) {
      dispatch(addMensaje({ perfil, texto: mensaje, timestamp: new Date().toISOString() }));
      setMensaje('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={conversacion}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.mensajeContainer, item.perfil === perfil ? styles.enviado : styles.recibido]}>
            <Text>{item.texto}</Text>
            <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
          </View>
        )}
      />
      <TextInput
        label="Escribe un mensaje"
        value={mensaje}
        onChangeText={setMensaje}
        style={styles.input}
      />
      <Button mode="contained" onPress={enviarMensaje}>
        Enviar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  mensajeContainer: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  enviado: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  recibido: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    marginTop: 5,
  },
  input: {
    marginVertical: 10,
  },
});
