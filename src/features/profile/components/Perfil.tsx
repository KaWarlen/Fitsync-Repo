import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/Perfil';
import { getUserData } from '../../../shared/services/storage';
import { UserData } from '../../../shared/types';
import { SharedComponentProps } from '../../../shared/types/navigation';

export default function Perfil({ route, navigation }: SharedComponentProps) {
  const [userData, setUserData] = useState<UserData>({});

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const data = await getUserData();
    if (data) {
      setUserData(data);
    } else if (route?.params && 'userData' in route.params && route.params.userData) {
      setUserData(route.params.userData);
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login', {});
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Ionicons name="person-circle" size={50} color="#fff" />
        </View>
        <Text style={styles.title}>
          Olá {userData.primeiroNome && userData.nomeDoMeio 
            ? `${userData.primeiroNome} ${userData.nomeDoMeio}` 
            : userData.primeiroNome || 'Usuário'}!
        </Text>
        <Text style={styles.subtitle}>Aqui é seu perfil</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{userData.email || 'Não informado'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ID do Cliente:</Text>
            <Text style={styles.infoValue}>{userData.uid || 'Não disponível'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Idade:</Text>
            <Text style={styles.infoValue}>{userData.idade ? `${userData.idade} anos` : 'Não informado'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sexo:</Text>
            <Text style={styles.infoValue}>{userData.sexo || 'Não informado'}</Text>
          </View>
        </View>

        {/* Informações de Saúde */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações de Saúde</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Peso:</Text>
            <Text style={styles.infoValue}>{userData.peso ? `${userData.peso} kg` : 'Não informado'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Altura:</Text>
            <Text style={styles.infoValue}>{userData.altura ? `${userData.altura} cm` : 'Não informado'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Doença:</Text>
            <Text style={styles.infoValue}>
              {userData.doenca || 'Nenhuma'}
            </Text>
          </View>
        </View>

        {/* Preferências de Treino */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências de Treino</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Horário:</Text>
            <Text style={styles.infoValue}>{userData.horario || 'Não informado'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Foco:</Text>
            <Text style={[styles.infoValue, { flexWrap: 'wrap', flex: 1 }]}>
              {userData.focos && Array.isArray(userData.focos) 
                ? userData.focos.join(', ') 
                : ('Não informado')}
            </Text>
          </View>
        </View>

        {/* Botão de Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
