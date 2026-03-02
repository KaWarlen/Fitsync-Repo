import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Exercicio } from '../types';
import { useTheme } from '../../../shared/theme';

interface ExercicioCardProps {
  exercicio: Exercicio;
  onToggle: () => void;
  styles: any;
}

export default function ExercicioCard({ exercicio, onToggle, styles }: ExercicioCardProps) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.exercicioCard,
        exercicio.concluido && styles.exercicioCardConcluido
      ]}
      onPress={onToggle}
    >
      <View style={styles.exercicioHeader}>
        <View style={styles.exercicioTitleContainer}>
          <Ionicons 
            name={exercicio.concluido ? "checkmark-circle" : "ellipse-outline"} 
            size={28} 
            color={exercicio.concluido ? theme.success : theme.iconInactive} 
          />
          <Text style={[
            styles.exercicioNome,
            exercicio.concluido && styles.exercicioNomeConcluido
          ]}>
            {exercicio.nome}
          </Text>
        </View>
      </View>
      
      <View style={styles.exercicioDetalhes}>
        <View style={styles.detalheItem}>
          <Ionicons name="repeat" size={16} color={theme.icon} />
          <Text style={styles.detalheText}>{exercicio.series} séries</Text>
        </View>
        <View style={styles.detalheItem}>
          <Ionicons name="fitness" size={16} color={theme.icon} />
          <Text style={styles.detalheText}>{exercicio.repeticoes} reps</Text>
        </View>
        <View style={styles.detalheItem}>
          <Ionicons name="barbell" size={16} color={theme.icon} />
          <Text style={styles.detalheText}>{exercicio.peso}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
