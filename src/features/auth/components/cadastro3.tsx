import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getStyles } from '../styles/cadastro3';
import { logger } from '../../../shared/services/logger';
import { useTheme } from '../../../shared/theme';

interface CadastroEtapa3Props {
  onFinish?: (data: any) => void;
  onBack?: () => void;
}

export default function CadastroEtapa3({ onFinish, onBack }: CadastroEtapa3Props) {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [horario, setHorario] = useState('');
  const [focos, setFocos] = useState<string[]>([]);

  const toggleFoco = (foco: string) => {
    if (focos.includes(foco)) {
      setFocos(focos.filter(f => f !== foco));
    } else {
      if (focos.length < 3) {
        setFocos([...focos, foco]);
      }
    }
  };

  const handleFinish = () => {
    if (onFinish) {
      onFinish({ horario, focos });
    } else {
      logger.debug('Cadastro Completo:', { horario, focos });
    }
  };

  const horarios = ['Manhã (6h-12h)', 'Tarde (12h-18h)', 'Noite (18h-22h)', 'Flexível'];
  const focos_opcoes = [
    'Perda de peso',
    'Ganho de massa muscular',
    'Condicionamento físico',
    'Fortalecimento',
    'Flexibilidade',
    'Saúde geral'
  ];

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
            <Text style={styles.stepIndicator}>Etapa 3 de 3</Text>
            <Text style={styles.subtitle}>Preferências de treino</Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Qual horário deseja que seus treinos sejam realizados?</Text>
              <View style={styles.optionsContainer}>
                {horarios.map((h) => (
                  <TouchableOpacity
                    key={h}
                    style={[styles.optionButton, horario === h && styles.optionButtonSelected]}
                    onPress={() => setHorario(h)}
                  >
                    <Text style={[styles.optionButtonText, horario === h && styles.optionButtonTextSelected]}>
                      {h}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Qual é o foco dos seus treinos?</Text>
              <Text style={styles.labelSubtext}>Selecione até 3 opções</Text>
              <View style={styles.optionsContainer}>
                {focos_opcoes.map((f) => (
                  <TouchableOpacity
                    key={f}
                    style={[styles.optionButton, focos.includes(f) && styles.optionButtonSelected]}
                    onPress={() => toggleFoco(f)}
                  >
                    <Text style={[styles.optionButtonText, focos.includes(f) && styles.optionButtonTextSelected]}>
                      {f}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.buttonRow}>
              {onBack && (
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                  <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                <Text style={styles.finishButtonText}>Finalizar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
