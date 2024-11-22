// screens/ambulanceScreens/AmbulanceHome.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Avatar, Badge, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function AmbulanceHome() {
  const navigation = useNavigation();
  const solicitudEstado = useSelector(state => state.ambulancia.solicitudEstado); // Accedemos al estado de la solicitud
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido, Ambulancia</Text>
      <Card style={styles.card} onPress={() => navigation.navigate('AmbulanciaMap')}>
        <Card.Title 
          title="Ver Solicitudes" 
          left={(props) => <Avatar.Icon {...props} icon="account" />} // Icono de persona
          right={(props) => (
            solicitudEstado === 'pendiente' && (
              <Badge style={styles.badge} size={10} /> // Indicador de notificación solo si hay servicio pendiente
            )
          )}
          titleStyle={styles.cardTitle}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: 300,
    marginVertical: 15,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: '#333',
  },
  text: {
    fontSize: 24,
    marginTop: 20,
    textAlign: 'center',
  },
  badge: {
    backgroundColor: 'red',
    position: 'absolute',
    top: -4,
    right: -4,
  },
});
