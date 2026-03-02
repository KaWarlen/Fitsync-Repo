import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Inicio } from '../features/onboarding';
import { Login, CadastroFluxo } from '../features/auth';
import { TelaAluno, Settings } from '../features/profile';
import { AreaTreinador, DetalheTreino, TreinosCliente } from '../features/training';
import { RootStackParamList } from './types/navigation';
import { ThemeProvider, useTheme } from './theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { isDark } = useTheme();
  
  return (
    <>
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
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
