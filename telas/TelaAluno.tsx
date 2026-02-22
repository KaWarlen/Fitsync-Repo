import { useTheme } from '../src/contexts/ThemeContext';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Treinos from './Treinos';
import Perfil from './Perfil';

const Tab = createBottomTabNavigator();

export default function TelaPrincipal({ navigation }: any) {
  const { isDarkMode } = useTheme();

  const handleLogout = () => {
    navigation.navigate('Login');
  };

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
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="barbell" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="PerfilTab"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="person" size={size} color={color} />
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
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="log-out" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
