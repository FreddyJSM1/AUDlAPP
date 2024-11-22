import React from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { resetState } from '../../redux/ambulanciaSlice';

export default function AdminScreen() {
  const dispatch = useDispatch();

  const handleReset = () => {
    Alert.alert(
      "Reiniciar Estado",
      "¿Estás seguro que quieres reiniciar todos los datos?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { text: "Reiniciar", onPress: () => dispatch(resetState()) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Reiniciar Estado" onPress={handleReset} color="#E57373" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
