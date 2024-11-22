import { createSlice } from '@reduxjs/toolkit';
import { routeCoordinates } from '../routeCoordinates'; // Asegúrate de importar esto


const initialState = {
  solicitudEstado: '',  // Estado inicial de la solicitud '' o 'pendiente' o 'en proceso' 
  conversacion: [],
  comentario: '',
  ambulancePosition: routeCoordinates[0],
  currentStep: 0, 
};

export const ambulanciaSlice = createSlice({
  name: 'ambulancia',
  initialState,
  reducers: {
    setSolicitudEstado: (state, action) => {
      state.solicitudEstado = action.payload;
    },
    addMensaje: (state, action) => {
      state.conversacion.push(action.payload);
    },
    setComentario: (state, action) => {
      state.comentario = action.payload;
    },
    setAmbulancePosition: (state, action) => {
      state.ambulancePosition = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetState: (state) => {
      return initialState;
    },
  },
});

export const { setSolicitudEstado, addMensaje, setComentario, setAmbulancePosition, setCurrentStep, resetState } = ambulanciaSlice.actions;

export default ambulanciaSlice.reducer;
