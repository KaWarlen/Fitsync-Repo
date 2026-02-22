import { useTheme } from '../src/contexts/ThemeContext';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import getStyles from '../styles/Inicio';
import { Image } from 'react-native';

export default function Inicio({ navigation }: any) {
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);

  const handlePersonal = () => {
    navigation.navigate('Login', { userType: 'personal' });
  };

  const handleAluno = () => {
    navigation.navigate('Login', { userType: 'aluno' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/FitSync.png')} style={styles.logoImage} />
      </View>

      {/* Pergunta */}
      <Text style={styles.question}>Você é Personal Trainer ou Aluno?</Text>

      {/* Botões */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePersonal}>
          <Ionicons name="barbell" size={24} color="#fff" />
          <Text style={styles.buttonText}>Sou Personal Trainer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={handleAluno}>
          <Ionicons name="person" size={24} color="#007AFF" />
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Sou Aluno</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
