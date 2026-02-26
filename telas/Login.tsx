import { useTheme } from '../src/contexts/ThemeContext';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import getStyles from '../styles/Login';
import { loginWithEmail } from '../src/services/auth';

export default function Login({ navigation, route }: any) {
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Recebe userType da tela Inicio ('personal' ou 'aluno')
  const userType = route?.params?.userType || 'aluno';

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha email e senha');
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
    console.log('Esqueci minha senha');
  };

  const handleSignUp = () => {
    navigation.navigate('Cadastro', { userType });
  };

  const handleTrainerAccess = () => {
    // Navega para área do treinador
    navigation.navigate('AreaTreinador');
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
              <Image
                source={isDarkMode ? require('../assets/Fitsync-dark.png') : require('../assets/FitSync.png')}
                style={styles.logoImage}
              />
              {/* Removed FitSync text; logo already contains the name */}
            </View>
          <Text style={styles.subtitle}>Faça login para continuar</Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="mail-outline" size={20} color={isDarkMode ? '#aaa' : '#999'} style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="seu@email.com"
                placeholderTextColor="#999"
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
              <MaterialIcons name="lock-outline" size={20} color={isDarkMode ? '#aaa' : '#999'} style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="••••••••"
                placeholderTextColor="#999"
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
                <MaterialIcons name={userType === 'personal' ? 'fitness-center' : 'person'} size={20} color={isDarkMode ? '#333' : '#999'} style={styles.buttonIcon} />
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
