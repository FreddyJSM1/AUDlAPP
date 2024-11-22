import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Text, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSolicitudEstado,
  setAmbulancePosition,
  setCurrentStep,
} from '../../redux/ambulanciaSlice';
import { routeCoordinates } from '../../routeCoordinates';
import { hospitalRouteCoordinates } from '../../hospitalRouteCoordinates'; 

import { useNavigation } from '@react-navigation/native';


import ambulanceIcon from '../../assets/ambulancia.png';
import userIcon from '../../assets/persona.png';
import hospitalIcon from '../../assets/hospital.png';

export default function AmbulanceMapScreen() {
  const dispatch = useDispatch();
  const comentario = useSelector((state) => state.ambulancia.comentario);
  const solicitudEstado = useSelector((state) => state.ambulancia.solicitudEstado);
  const ambulancePosition = useSelector((state) => state.ambulancia.ambulancePosition);
  const currentStep = useSelector((state) => state.ambulancia.currentStep);

  const navigation = useNavigation();

  const intervalRef = useRef(null);

  const userPosition = {
    latitude: 4.7110,
    longitude: -74.0721,
  };

  // hospital coordinates 4.69808, -74.07285
  const hospitalPosition = {
    latitude: 4.69808,
    longitude: -74.07285,
  };

  // Simula el movimiento de la ambulancia
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
            // Aquí se detecta que llegó al último punto
            dispatch(setSolicitudEstado('llegado')); // Cambia a 'llegado' o similar
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

  useEffect(() => {
    if (solicitudEstado === 'camino a hospital' && intervalRef.current === null) {
      // Reinicia el currentStep al iniciar la ruta hacia el hospital
      dispatch(setCurrentStep(0)); // Reinicia currentStep al inicio del trayecto al hospital
  
      intervalRef.current = setInterval(() => {
        dispatch((dispatch, getState) => {
          const state = getState();
          const prevStep = state.ambulancia.currentStep;
          const nextStep = prevStep + 1;
  
          // Chequea si hemos llegado al final de hospitalRouteCoordinates
          if (nextStep < hospitalRouteCoordinates.length) {
            const newPosition = hospitalRouteCoordinates[nextStep];
            dispatch(setAmbulancePosition(newPosition));
            dispatch(setCurrentStep(nextStep));
          } else {
            // Ambulancia ha llegado al hospital
            clearInterval(intervalRef.current);
            intervalRef.current = null;
  
            alert('La ambulancia ha llegado al hospital');
            dispatch(setSolicitudEstado('finalizado')); // Cambia el estado al finalizar
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
  
  
  

  const handleAceptarServicio = () => {
    dispatch(setSolicitudEstado('en proceso'));
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 4.7110,
          longitude: -74.0721,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {ambulancePosition && (
          <Marker coordinate={ambulancePosition} title="Ambulancia">
            <Image source={ambulanceIcon} style={styles.icon} />
          </Marker>
        )}
        {solicitudEstado === 'en proceso' && (
          <>
            <Marker coordinate={userPosition} title="Usuario"> 
              <Image source={userIcon} style={styles.icon} />
            </Marker>
            <Polyline coordinates={routeCoordinates} strokeColor="blue" strokeWidth={2} />
          </>
        )}
        {solicitudEstado === 'camino a hospital' && (
          <>
            <Marker coordinate={hospitalPosition} title="Hospital"> 
              <Image source={hospitalIcon} style={styles.icon} />
            </Marker>
            <Polyline coordinates={hospitalRouteCoordinates} strokeColor="red" strokeWidth={2} />
          </>
        )}
      </MapView>

      <View style={styles.infoContainer}>
        <Button
            mode="contained"
            onPress={() => navigation.navigate('Chat', { perfil: 'ambulancia' })} // En AmbulanceMapScreen
            disabled={solicitudEstado !== 'en proceso'}
            style={[styles.button, styles.chatButton]}
          >
            Abrir Chat
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              if (solicitudEstado === 'pendiente') {
                handleAceptarServicio(); // Cambia el estado a 'en proceso'
              } else if (solicitudEstado === 'llegado') {
                dispatch(setSolicitudEstado('camino a hospital')); // Cambia el estado a 'camino a hospital'
              }
            }}
            disabled={solicitudEstado !== 'pendiente' && solicitudEstado !== 'llegado'}
            style={{ marginBottom: 10 }} // Añadir margen inferior
          >
            {solicitudEstado === 'pendiente' ? 'Aceptar Servicio' : 'Ubicar Hospital'}
          </Button>

      </View>
    </View>
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
  infoContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  chatButton: {
    marginBottom: 10, 
  },
});
