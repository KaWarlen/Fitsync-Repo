import { useTheme } from '../src/contexts/ThemeContext';
import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Treinos from './Treinos';
import Perfil from './Perfil';

const Tab = createBottomTabNavigator();

export default function TelaPrincipal({ navigation }: any) {
  const { isDarkMode } = useTheme();

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const iconContainerStyle = (focused: boolean) => ({
    backgroundColor: focused ? (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 122, 255, 0.1)') : 'transparent',
    borderRadius: 20,
    padding: 8,
    shadowColor: isDarkMode ? '#fff' : '#000',
    shadowOffset: { width: 0, height: focused ? 3 : 0 },
    shadowOpacity: focused ? (isDarkMode ? 0.3 : 0.2) : 0,
    shadowRadius: focused ? 4 : 0,
    elevation: focused ? (isDarkMode ? 6 : 3) : 0,
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDarkMode ? '#64b5f6' : '#007AFF',
        tabBarInactiveTintColor: isDarkMode ? '#777' : '#999',
        tabBarStyle: {
          height: 95,
          paddingBottom: 30,
          backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
          borderTopWidth: 1,
          borderTopColor: isDarkMode ? '#333' : '#f0f0f0',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="TreinosTab"
        component={Treinos}
        options={{
          tabBarLabel: 'Treinos',
          tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
            <View style={iconContainerStyle(focused)}>
              <MaterialIcons name="fitness-center" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="PerfilTab"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
            <View style={iconContainerStyle(focused)}>
              <MaterialIcons name="person" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SairTab"
        component={Perfil}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleLogout();
          },
        }}
        options={{
          tabBarLabel: 'Sair',
          tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
            <View style={iconContainerStyle(focused)}>
              <MaterialIcons name="logout" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
