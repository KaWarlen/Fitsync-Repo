import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/DetalheTreino';
import { Exercicio } from '../types';

interface ExercicioCardProps {
  exercicio: Exercicio;
  onToggle: () => void;
}

export default function ExercicioCard({ exercicio, onToggle }: ExercicioCardProps) {
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
            color={exercicio.concluido ? "#00C853" : "#999"} 
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
          <Ionicons name="repeat" size={16} color="#666" />
          <Text style={styles.detalheText}>{exercicio.series} séries</Text>
        </View>
        <View style={styles.detalheItem}>
          <Ionicons name="fitness" size={16} color="#666" />
          <Text style={styles.detalheText}>{exercicio.repeticoes} reps</Text>
        </View>
        <View style={styles.detalheItem}>
          <Ionicons name="barbell" size={16} color="#666" />
          <Text style={styles.detalheText}>{exercicio.peso}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
