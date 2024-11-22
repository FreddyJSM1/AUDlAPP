// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
//screens
import LoginScreen from './screens/LoginScreen';
//userScreens
import HomeScreen from './screens/userScreens/HomeScreen';
import AmbulanceScreen from './screens/userScreens/AmbulanceScreen';
import PsychologistScreen from './screens/userScreens/PsychologistScreen';
//ambulanceScreens
import AmbulanceHome from './screens/ambulanceScreens/AmbulanceHome';  
import AmbulanceMapScreen from './screens/ambulanceScreens/AmbulanceMapScreen';
//adminScreens
import AdminScreen from './screens/admin/adminHome';
// Redux
import { Provider } from 'react-redux';
import { store } from './redux/store';

import ChatScreen from './components/ChatScreen';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6553A6',
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="IniciarSesion">
            <Stack.Screen 
              name="IniciarSesion" 
              component={LoginScreen} 
              options={{ title: 'Iniciar Sesión' }} 
            />
            <Stack.Screen 
              name="InicioUsuario" 
              component={HomeScreen} 
              options={{ title: 'Inicio Usuario' }} 
            />
            <Stack.Screen 
              name="InicioAmbulancia" 
              component={AmbulanceHome} 
              options={{ title: 'Inicio Ambulancia' }} 
            /> 
            <Stack.Screen 
              name="AmbulanciaMap" 
              component={AmbulanceMapScreen} 
              options={{ title: 'Servicio de Ambulancia' }} 
            />
            <Stack.Screen 
              name="Ambulancia" 
              component={AmbulanceScreen} 
              options={{ title: 'Solicitud de Ambulancia' }} 
            />
            <Stack.Screen 
              name="Psicologo" 
              component={PsychologistScreen} 
              options={{ title: 'Chat con Psicólogo' }} 
            />
            <Stack.Screen 
              name="Admin" 
              component={AdminScreen} 
              options={{ title: 'Admin' }} 
            />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
