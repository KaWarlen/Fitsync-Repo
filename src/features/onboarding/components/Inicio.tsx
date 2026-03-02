import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getStyles } from '../styles/Inicio';
import { Image } from 'react-native';
import { InicioProps } from '../../../shared/types/navigation';
import { useTheme } from '../../../shared/theme';

export default function Inicio({ navigation }: InicioProps) {
  const { theme, isDark } = useTheme();
  const styles = getStyles(theme);
  
  const handlePersonal = () => {
    navigation.navigate('Login', { userType: 'personal' });
  };

  const handleAluno = () => {
    navigation.navigate('Login', { userType: 'aluno' });
  };

  // Seleciona a imagem baseada no tema
  const logoSource = isDark 
    ? require('../../../../assets/Fitsync-dark.png')
    : require('../../../../assets/FitSync.png');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoSource} style={styles.logoImage} />
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
          <Ionicons name="person" size={24} color={theme.primary} />
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Sou Aluno</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
