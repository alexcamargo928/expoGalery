import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import RegistrarseScreen from './RegistrarseScreen';
import StackScreen from './StackScreen';
import App from './ScreenImagenes';
import TakeCameraScreen from './ScreenCamera';
import Videos from './ScreenVideos';
import ScreenP from './ScreenPerfil';




const Stack = createStackNavigator();

export default function AppNavigator() { 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registro"
          component={RegistrarseScreen}
          options={{
            headerStyle: {
              backgroundColor: 'purple',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
        />
        
        <Stack.Screen
          name="StackScreen"
          component={StackScreen}
          options={{
            headerTitle: 'Home',
            headerStyle: {
              backgroundColor: 'purple',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen 
          name="Profile" 
          component={ScreenP} 
          options={{
            headerTitle: 'Perfil',
            headerStyle: {
              backgroundColor: 'purple',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="Galeria"
          component={App}
          options={{
            headerTitle: 'Galeria De imagenes.',
            headerStyle: {
              backgroundColor: 'purple',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="Camara"
          component={TakeCameraScreen}
          options={{
            headerTitle: 'Camara',
            headerStyle: {
              backgroundColor: 'purple',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
        />
        
        
        <Stack.Screen
          name="Videos"
          component={Videos}
          options={{
            headerTitle: 'Galeria De Videos.',
            headerStyle: {
              backgroundColor: 'purple',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="Audios"
          component={App} 
          options={{ title: 'Audios' }}
        />

        <Stack.Screen
          name="Ocio"
          component={App} 
          options={{ title: 'Ocio' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
