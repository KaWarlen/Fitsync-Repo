import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Treinos from './Treinos';
import Perfil from './Perfil';

const Tab = createBottomTabNavigator();

export default function TelaPrincipal({ navigation }: any) {
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 95,
          paddingBottom: 30,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
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
