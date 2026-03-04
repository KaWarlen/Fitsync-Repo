import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getStyles } from '../styles/cadastro2';
import { logger } from '../../../shared/services/logger';
import { useTheme } from '../../../shared/theme';

interface CadastroEtapa2Props {
  onNext?: (data: any) => void;
  onBack?: () => void;
}

export default function CadastroEtapa2({ onNext, onBack }: CadastroEtapa2Props) {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [doenca, setDoenca] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');

  const handleNext = () => {
    if (onNext) {
      onNext({ doenca, peso, altura });
    } else {
      logger.debug('Etapa 2:', { doenca, peso, altura });
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Botão de voltar */}
      {onBack && (
        <TouchableOpacity style={styles.backIconButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
      )}
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.stepIndicator}>Etapa 2 de 3</Text>
            <Text style={styles.subtitle}>Informações de saúde</Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tem alguma doença? Se sim, descreva.</Text>
              <TextInput
                style={[styles.input, { minHeight: 80, textAlignVertical: 'top' }]}
                placeholder="Ex: Diabetes, Hipertensão, ou deixe vazio se não tiver"
                placeholderTextColor={theme.inputPlaceholder}
                value={doenca}
                onChangeText={setDoenca}
                autoCapitalize="sentences"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Qual é o seu peso? (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 70"
                placeholderTextColor={theme.inputPlaceholder}
                value={peso}
                onChangeText={setPeso}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Qual é a sua altura? (cm)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 175"
                placeholderTextColor={theme.inputPlaceholder}
                value={altura}
                onChangeText={setAltura}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.buttonRow}>
              {onBack && (
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                  <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
