import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { getStyles } from '../styles/cadastro1';
import { validateEmail, validatePassword, getEmailErrorMessage, getPasswordErrorMessage } from '../../../shared/utils/validation';
import { logger } from '../../../shared/services/logger';
import { useTheme } from '../../../shared/theme';

interface CadastroEtapa1Props {
  onNext?: (data: any) => void;
}

export default function CadastroEtapa1({ onNext }: CadastroEtapa1Props) {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [primeiroNome, setPrimeiroNome] = useState('');
  const [nomeDoMeio, setNomeDoMeio] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');

  const handleNext = () => {
    // Validar campos obrigatórios
    if (!primeiroNome.trim()) {
      Alert.alert('Campo obrigatório', 'Por favor, preencha seu primeiro nome');
      return;
    }
    
    // Validar email
    if (!email.trim()) {
      Alert.alert('Campo obrigatório', 'Por favor, preencha seu email');
      return;
    }
    if (!validateEmail(email)) {
      const errorMsg = getEmailErrorMessage(email);
      Alert.alert('Email inválido', errorMsg);
      return;
    }
    
    // Validar senha
    if (!senha.trim()) {
      Alert.alert('Campo obrigatório', 'Por favor, preencha sua senha');
      return;
    }
    if (!validatePassword(senha)) {
      const errorMsg = getPasswordErrorMessage(senha);
      Alert.alert('Senha inválida', errorMsg);
      return;
    }
    
    if (!idade.trim()) {
      Alert.alert('Campo obrigatório', 'Por favor, preencha sua idade');
      return;
    }
    if (!sexo) {
      Alert.alert('Campo obrigatório', 'Por favor, selecione seu sexo');
      return;
    }

    if (onNext) {
      onNext({ primeiroNome, nomeDoMeio, email, senha, idade, sexo });
    } else {
      logger.debug('Etapa 1:', { primeiroNome, nomeDoMeio, email: email.substring(0, 3) + '***', idade, sexo });
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.stepIndicator}>Etapa 1 de 3</Text>
            <Text style={styles.subtitle}>Vamos conhecer você</Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Qual é seu primeiro nome?</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu primeiro nome"
                placeholderTextColor={theme.inputPlaceholder}
                value={primeiroNome}
                onChangeText={setPrimeiroNome}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Qual é seu nome do meio?</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome do meio (opcional)"
                placeholderTextColor={theme.inputPlaceholder}
                value={nomeDoMeio}
                onChangeText={setNomeDoMeio}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor={theme.inputPlaceholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={theme.inputPlaceholder}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Qual é a sua idade?</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 25"
                placeholderTextColor={theme.inputPlaceholder}
                value={idade}
                onChangeText={setIdade}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Qual é o seu sexo?</Text>
              <View style={styles.sexButtonContainer}>
                <TouchableOpacity 
                  style={[styles.sexButton, sexo === 'Masculino' && styles.sexButtonSelected]}
                  onPress={() => setSexo('Masculino')}
                >
                  <Text style={[styles.sexButtonText, sexo === 'Masculino' && styles.sexButtonTextSelected]}>
                    Masculino
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.sexButton, sexo === 'Feminino' && styles.sexButtonSelected]}
                  onPress={() => setSexo('Feminino')}
                >
                  <Text style={[styles.sexButtonText, sexo === 'Feminino' && styles.sexButtonTextSelected]}>
                    Feminino
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.sexButton, sexo === 'Outro' && styles.sexButtonSelected]}
                  onPress={() => setSexo('Outro')}
                >
                  <Text style={[styles.sexButtonText, sexo === 'Outro' && styles.sexButtonTextSelected]}>
                    Outro
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
