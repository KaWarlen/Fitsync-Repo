import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getStyles } from '../styles/Login';
import { loginWithEmail } from '../services/auth';
import { LoginProps } from '../../../shared/types/navigation';
import { validateEmail } from '../../../shared/utils/validation';
import { logger } from '../../../shared/services/logger';
import { useTheme } from '../../../shared/theme';

export default function Login({ navigation, route }: LoginProps) {
  const { theme, isDark } = useTheme();
  const styles = getStyles(theme);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Recebe userType da tela Inicio ('personal' ou 'aluno')
  const userType = route?.params?.userType || 'aluno';

  // Seleciona a imagem baseada no tema
  const logoSource = isDark 
    ? require('../../../../assets/Fitsync-dark.png')
    : require('../../../../assets/FitSync.png');

  const handleLogin = () => {
    // Validar campos
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }
    
    // Validar formato de email
    if (!validateEmail(email)) {
      Alert.alert('Email inválido', 'Digite um email válido (exemplo: usuario@email.com)');
      return;
    }

    setLoading(true);
    loginWithEmail(email, password)
      .then(({ user }) => {
        const destino = userType === 'personal' ? 'AreaTreinador' : 'TelaAluno';
        navigation.navigate(destino, { userData: { email: user.email, uid: user.uid, userType } });
      })
      .catch((err) => {
        const message = err?.message || 'Erro ao fazer login';
        Alert.alert('Login falhou', message);
      })
      .finally(() => setLoading(false));
  };

  const handleForgotPassword = () => {
    logger.log('Função de recuperação de senha a ser implementada');
    Alert.alert('Em desenvolvimento', 'Funcionalidade de recuperação de senha será implementada em breve');
  };

  const handleSignUp = () => {
    navigation.navigate('Cadastro', { userType });
  };

  const handleTrainerAccess = () => {
    // Navega para área do treinador
    navigation.navigate('AreaTreinador', {});
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
              <Image source={logoSource} style={styles.logoImage} />
            </View>
          <Text style={styles.subtitle}>Faça login para continuar</Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color={theme.iconInactive} style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="seu@email.com"
                placeholderTextColor={theme.inputPlaceholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color={theme.iconInactive} style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="••••••••"
                placeholderTextColor={theme.inputPlaceholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
          </View>

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name={userType === 'personal' ? 'barbell' : 'person'} size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.loginButtonText}>
                  {userType === 'personal' ? 'Entrar como Personal' : 'Entrar como Aluno'}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
