import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import getStyles from '../styles/Settings';
import { useTheme } from '../../../shared/theme';
import { SettingsProps } from '../../../shared/types/navigation';
import { AuthAPI } from '../../auth/services/auth';
import { logout as localLogout } from '../../auth/services/local-auth';

export default function Settings({ navigation }: SettingsProps) {
  const { theme, isDark, toggleTheme } = useTheme();
  const styles = getStyles(theme);
  const [deleting, setDeleting] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut || deleting) return;
    setLoggingOut(true);
    try {
      await Promise.all([
        AuthAPI.logout(),
        localLogout()
      ]);
    } finally {
      setLoggingOut(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Inicio' }]
      });
    }
  };

  const handleDeleteAccount = () => {
    if (deleting || loggingOut) return;
    Alert.alert(
      'Encerrar conta',
      'Isso vai remover sua conta e vínculos. Deseja continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Encerrar',
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            try {
              await AuthAPI.deleteAccount();
              await localLogout();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Inicio' }]
              });
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível encerrar a conta. Tente novamente.');
            } finally {
              setDeleting(false);
            }
          }
        }
      ]
    );
  };

  const handleNavigate = (screen: string) => {
    // Navegação futura para outras telas
    console.log('Navegar para:', screen);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      {/* Conteúdo */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        
        {/* Seção: Aparência */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aparência</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="moon" size={24} color={theme.icon} style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>Modo Escuro</Text>
                <Text style={styles.settingDescription}>
                  {isDark ? 'Ativado' : 'Desativado'}
                </Text>
              </View>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.inputBorder, true: theme.primary }}
              thumbColor={isDark ? theme.buttonText : theme.inputBackground}
            />
          </View>
        </View>

        {/* Seção: Conta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => handleNavigate('EditProfile')}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="person" size={24} color={theme.icon} style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>Editar Perfil</Text>
                <Text style={styles.settingDescription}>Nome, email, telefone</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.iconSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => handleNavigate('ChangePassword')}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="lock-closed" size={24} color={theme.icon} style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>Alterar Senha</Text>
                <Text style={styles.settingDescription}>Redefinir sua senha</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.iconSecondary} />
          </TouchableOpacity>
        </View>

        {/* Seção: Notificações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => handleNavigate('Notifications')}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={24} color={theme.icon} style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>Preferências</Text>
                <Text style={styles.settingDescription}>Gerenciar notificações</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.iconSecondary} />
          </TouchableOpacity>
        </View>

        {/* Seção: Suporte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suporte</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => handleNavigate('Help')}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="help-circle" size={24} color={theme.icon} style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>Ajuda</Text>
                <Text style={styles.settingDescription}>FAQ e suporte</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.iconSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => handleNavigate('About')}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="information-circle" size={24} color={theme.icon} style={styles.settingIcon} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>Sobre</Text>
                <Text style={styles.settingDescription}>Versão e informações</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.iconSecondary} />
          </TouchableOpacity>
        </View>

        {/* Botão Sair */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={loggingOut || deleting}
        >
          {loggingOut ? (
            <ActivityIndicator color={theme.error} />
          ) : (
            <Ionicons name="log-out" size={24} color={theme.error} />
          )}
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDeleteAccount}
          disabled={deleting || loggingOut}
        >
          {deleting ? (
            <ActivityIndicator color={theme.buttonText} />
          ) : (
            <Ionicons name="trash" size={24} color={theme.buttonText} />
          )}
          <Text style={styles.deleteButtonText}>Encerrar Conta</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}
