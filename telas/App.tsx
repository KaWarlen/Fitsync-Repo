import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './Inicio';
import Login from '../telas/Login';
import CadastroFluxo from './CadastroFluxo';
import TelaAluno from './TelaAluno';
import AreaTreinador from './AreaTreinador';
import DetalheTreino from './DetalheTreino';
import TreinosCliente from './TreinosCliente';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Inicio"
        screenOptions={{
          headerShown: false,
          animation: 'none', // Desabilita animações
        }}
      >
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={CadastroFluxo} />
        <Stack.Screen name="TelaAluno" component={TelaAluno} />
        <Stack.Screen name="DetalheTreino" component={DetalheTreino} />
        <Stack.Screen name="AreaTreinador" component={AreaTreinador} />
        <Stack.Screen name="TreinosCliente" component={TreinosCliente} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
