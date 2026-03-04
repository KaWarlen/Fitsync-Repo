import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Treinos from '../../../shared/components/Treinos';
import Perfil from './Perfil';
import { TelaAlunoProps, AlunoTabParamList } from '../../../shared/types/navigation';
import { useTheme } from '../../../shared/theme';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { TrainingService } from '../../training/services';
import { useFocusEffect } from '@react-navigation/native';
import { useVinculo } from '../../../shared/context/VinculoContext';

const Tab = createBottomTabNavigator<AlunoTabParamList>();

export default function TelaPrincipal({ navigation, route }: TelaAlunoProps) {
  const { theme } = useTheme();
  const { listaDeVinculosPendentes, modalVinculoAberto, setModalVinculoAberto, refreshVinculos } = useVinculo();
  const userData = route.params?.userData;

  useFocusEffect(
    React.useCallback(() => {
      refreshVinculos();
      return () => {};
    }, [refreshVinculos])
  );
  
  const handleSettings = () => {
    navigation.navigate('Settings', { userData });
  };

  const pendingInfo = listaDeVinculosPendentes[0];

  return (
    <>
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
    <Modal visible={modalVinculoAberto} transparent animationType="fade" onRequestClose={() => setModalVinculoAberto(false)}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <View style={{ backgroundColor: theme.card, borderRadius: 16, padding: 20, width: '100%', maxWidth: 420 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: theme.text }}>Solicitação de vínculo</Text>
            <TouchableOpacity onPress={() => setModalVinculoAberto(false)}>
              <Ionicons name="close" size={24} color={theme.icon} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 15, color: theme.textSecondary, marginBottom: 20 }}>
            {pendingInfo?.personalName || 'Seu personal'} quer se vincular a você.
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: theme.error, paddingVertical: 12, borderRadius: 12, alignItems: 'center' }}
              onPress={async () => {
                try {
                  await TrainingService.respondLink(false);
                } catch {}
                setModalVinculoAberto(false);
                await refreshVinculos({ suppressModal: true });
              }}
            >
              <Text style={{ color: theme.buttonText, fontWeight: '700' }}>Recusar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: theme.primary, paddingVertical: 12, borderRadius: 12, alignItems: 'center' }}
              onPress={async () => {
                try {
                  await TrainingService.respondLink(true);
                } catch {
                  // Silencia erro pontual; experiência amigável
                }
                setModalVinculoAberto(false);
                await refreshVinculos({ suppressModal: true });
              }}
            >
              <Text style={{ color: theme.buttonText, fontWeight: '700' }}>Aceitar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    </>
  );
}
