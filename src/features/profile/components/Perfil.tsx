import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getStyles } from '../styles/Perfil';
import { getUserData, saveUserData } from '../../../shared/services/storage';
import { UserData } from '../../../shared/types';
import { SharedComponentProps } from '../../../shared/types/navigation';
import { useTheme } from '../../../shared/theme';
import { AuthAPI } from '../../auth/services/auth';
import { logout as localLogout } from '../../auth/services/local-auth';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../../../shared/services/api';
import { mapProfilePayloadToUserData } from '../../../shared/services/profile';

export default function Perfil({ route, navigation }: SharedComponentProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [userData, setUserData] = useState<UserData>({});
  const userDataRef = useRef<UserData | undefined>(undefined);
  const isAluno = userData.userType === 'aluno';
  const isPersonal = userData.userType === 'personal';

  const routeUser = route?.params?.userData;
  const routeUserPayload = useMemo(() => {
    if (!routeUser) {
      return undefined;
    }
    return {
      user: {
        id: routeUser.uid,
        email: routeUser.email,
        role: routeUser.userType === 'personal' ? 'PERSONAL' : 'ALUNO',
        name: routeUser.name || routeUser.email?.split('@')[0],
      },
    };
  }, [routeUser]);

  const loadUserData = useCallback(async () => {
    const cached = await getUserData();
    if (cached) {
      setUserData(cached);
      return;
    }

    if (routeUserPayload) {
      const base = mapProfilePayloadToUserData(undefined, routeUserPayload);
      setUserData(base);
      await saveUserData(base);
    }
  }, [routeUserPayload]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  useEffect(() => {
    userDataRef.current = userData;
  }, [userData]);

  const refreshProfile = useCallback(async () => {
    const currentData = userDataRef.current;
    if (!currentData?.uid && !routeUserPayload) {
      return;
    }

    try {
      const response = await api.get('/users/profile');
      const payload = response.data || {};
      const fallbackBase = !currentData?.uid && routeUserPayload
        ? mapProfilePayloadToUserData(undefined, routeUserPayload)
        : undefined;
      const enriched = mapProfilePayloadToUserData(currentData?.uid ? currentData : fallbackBase, payload);
      setUserData(enriched);
      await saveUserData(enriched);
    } catch (error: any) {
      console.warn('Não foi possível atualizar perfil remoto:', error?.response?.data || error?.message || error);
    }
  }, [routeUserPayload]);

  useFocusEffect(
    useCallback(() => {
      refreshProfile();
      return () => {};
    }, [refreshProfile])
  );

  const handleLogout = async () => {
    try {
      await Promise.all([
        AuthAPI.logout(),
        localLogout()
      ]);
    } finally {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Inicio' }]
      });
    }
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

        {isAluno && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Status do Vínculo</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Situação:</Text>
              <Text style={styles.infoValue}>{userData.linkStatus || 'Sem vínculo'}</Text>
            </View>

            {userData.personal && (
              <>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Personal:</Text>
                  <Text style={styles.infoValue}>{userData.personal.name || 'Não vinculado'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Email do Personal:</Text>
                  <Text style={styles.infoValue}>{userData.personal.email || 'Não informado'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Telefone:</Text>
                  <Text style={styles.infoValue}>{userData.personal.phone || 'Não informado'}</Text>
                </View>
              </>
            )}
          </View>
        )}

        {isPersonal && (userData.training || (userData.linkedStudents && userData.linkedStudents.length > 0)) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações do Personal</Text>

            {userData.training && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Formação/Treinamento:</Text>
                <Text style={styles.infoValue}>{userData.training}</Text>
              </View>
            )}

            {userData.linkedStudents && userData.linkedStudents.length > 0 && (
              <View style={{ marginTop: 12 }}>
                <Text style={[styles.infoLabel, { marginBottom: 6 }]}>Alunos vinculados:</Text>
                {userData.linkedStudents.map((student, index) => (
                  <View key={student.id || student.email || `aluno-${index}`} style={[styles.infoRow, { marginBottom: 4 }]}>
                    <Text style={styles.infoValue}>
                      {student.name || 'Aluno'}
                      {student.linkStatus ? ` (${student.linkStatus})` : ''}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Botão de Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
