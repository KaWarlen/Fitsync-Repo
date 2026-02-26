import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Inicio from './Inicio';
import Login from '../telas/Login';
import CadastroFluxo from './CadastroFluxo';
import TelaAluno from './TelaAluno';
import AreaTreinador from './AreaTreinador';
import DetalheTreino from './DetalheTreino';
import TreinosCliente from './TreinosCliente';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import CustomDrawerContent from '../src/components/CustomDrawerContent';
import { TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../src/contexts/ThemeContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Create a simple drawer button hook component so it uses generic useNavigation
const DrawerToggleButton = () => {
  const navigation = useNavigation<any>();
  const { isDarkMode } = useTheme();

  return (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 15 }}>
      <MaterialIcons name="menu" size={28} color={isDarkMode ? '#e0e0e0' : '#000000'} />
    </TouchableOpacity>
  );
};

function StackNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
        animation: 'none',
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
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: true, // Show drawer header so user can open menu
            headerTransparent: true, // Make it transparent so it floats over screens
            headerTitle: '',
            headerLeft: () => <DrawerToggleButton />,
          }}
        >
          <Drawer.Screen name="HomeStack" component={StackNavigator} />
        </Drawer.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </ThemeProvider>
  );
}
