import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Treinos from '../../../shared/components/Treinos';
import Perfil from './Perfil';
import { TelaAlunoProps, AlunoTabParamList } from '../../../shared/types/navigation';
import { useTheme } from '../../../shared/theme';

const Tab = createBottomTabNavigator<AlunoTabParamList>();

export default function TelaPrincipal({ navigation }: TelaAlunoProps) {
  const { theme } = useTheme();
  
  const handleSettings = () => {
    navigation.navigate('Settings', {});
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.tabActive,
        tabBarInactiveTintColor: theme.tabInactive,
        tabBarStyle: {
          height: 95,
          paddingBottom: 30,
          backgroundColor: theme.tabBackground,
          borderTopWidth: 1,
          borderTopColor: theme.divider,
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
        name="SettingsTab"
        component={Perfil}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleSettings();
          },
        }}
        options={{
          tabBarLabel: 'Configurações',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
