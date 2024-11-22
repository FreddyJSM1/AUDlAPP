import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Image } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { TextInput, Button, Modal, Portal, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setSolicitudEstado, setComentario, setAmbulancePosition, setCurrentStep } from '../../redux/ambulanciaSlice.js';
import { routeCoordinates } from '../../routeCoordinates';
import { useNavigation } from '@react-navigation/native';

import mapStyle from '../../mapStyle.json';


import ambulanceIcon from '../../assets/ambulancia.png';
import userIcon from '../../assets/persona.png';

export default function RequestAmbulanceScreen() {
  const dispatch = useDispatch();
  const solicitudEstado = useSelector(state => state.ambulancia.solicitudEstado);
  const comentario = useSelector(state => state.ambulancia.comentario);
  const ambulancePosition = useSelector(state => state.ambulancia.ambulancePosition);
  const currentStep = useSelector(state => state.ambulancia.currentStep);

  const intervalRef = useRef(null); // Usar una referencia para manejar el intervalo
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const initialRegion = {
    latitude: 4.7110,
    longitude: -74.0721,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Movimiento de la ambulancia en el mapa del usuario
  useEffect(() => {
    if (solicitudEstado === 'en proceso' && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        dispatch((dispatch, getState) => {
          const state = getState();
          const prevStep = state.ambulancia.currentStep;
          const nextStep = prevStep + 1;

          if (nextStep < routeCoordinates.length) {
            const newPosition = routeCoordinates[nextStep];
            dispatch(setAmbulancePosition(newPosition));
            dispatch(setCurrentStep(nextStep));
          } else {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [solicitudEstado, dispatch]);

  // Condición para mostrar solo la ambulancia y la ruta cuando el servicio ha sido aceptado
  const showAmbulance = solicitudEstado === 'en proceso';

  const handleRequestAmbulance = () => {
    setModalVisible(true);
  };

  const confirmRequest = () => {
    setLoading(true);
    setModalVisible(false);
    dispatch(setSolicitudEstado('pendiente'));
    
    setTimeout(() => {
      setLoading(false);
      alert('Ambulancia solicitada con éxito.');
    }, 1000);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <MapView customMapStyle={mapStyle} provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={initialRegion}>
        <Marker coordinate={initialRegion} title="Tu ubicación">
          <Image source={userIcon} style={styles.icon} />
        </Marker>
        {showAmbulance && ambulancePosition && (
          <>
            <Marker coordinate={ambulancePosition} title="Ambulancia">
              <Image source={ambulanceIcon} style={styles.icon} />
            </Marker>
            <Polyline coordinates={routeCoordinates} strokeColor="blue" strokeWidth={2} />
          </>
        )}
      </MapView>

      <View style={styles.form}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Chat', { perfil: 'usuario' })} // En RequestAmbulanceScreen
          disabled={solicitudEstado === ''}
          style={[styles.button, styles.chatButton]}
        >
          Abrir Chat
        </Button>
        <Button
          mode="contained"
          onPress={handleRequestAmbulance}
          style={styles.button}
          disabled={solicitudEstado !== ''}
          loading={solicitudEstado !== ''}
        >
          {solicitudEstado === 'pendiente'
            ? 'Buscando Ambulancia'
            : solicitudEstado === 'en proceso'
            ? 'Ambulancia en Camino'
            : 'Pedir Ambulancia'}
        </Button>
      </View>

      <Portal>
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>¿Estás seguro que quieres solicitar una ambulancia?</Text>
            <Button mode="contained" onPress={confirmRequest} style={styles.modalButton}>
              Sí, estoy seguro
            </Button>
            <Button mode="text" onPress={() => setModalVisible(false)}>
              Cancelar
            </Button>
          </View>
        </Modal>
      </Portal>

      {loading && (
        <View style={styles.loadingContainer}>
          <Text>Solicitando Ambulancia...</Text>
          <Button loading={true} icon="ambulance" mode="contained">
            Cargando
          </Button>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain', 
  },
  form: {
    padding: 20,
    backgroundColor: '#fff',
  },
  textInput: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalContent: {
    padding: 20,
    alignItems: 'center',
  },
  modalButton: {
    marginBottom: 10,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
  },
  chatButton: {
    marginBottom: 10,
  },
});
