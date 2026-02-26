import { useTheme } from '../src/contexts/ThemeContext';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
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
        <Image
          source={isDarkMode ? require('../assets/Fitsync-dark.png') : require('../assets/FitSync.png')}
          style={styles.logoImage}
        />
      </View>

      {/* Pergunta */}
      <Text style={styles.question}>Você é Personal Trainer ou Aluno?</Text>

      {/* Botões */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePersonal}>
          <MaterialIcons name="fitness-center" size={24} color={isDarkMode ? '#333' : '#ffffff'} />
          <Text style={styles.buttonText}>Sou Personal Trainer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={handleAluno}>
          <MaterialIcons name="person" size={24} color={isDarkMode ? '#64b5f6' : '#007AFF'} />
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Sou Aluno</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
