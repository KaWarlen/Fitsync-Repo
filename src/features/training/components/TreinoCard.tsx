import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/AreaTreinador';
import { TreinoPadrao } from '../types';

interface TreinoCardProps {
  treino: TreinoPadrao;
  onEditar: () => void;
  onExcluir: () => void;
}

export default function TreinoCard({ treino, onEditar, onExcluir }: TreinoCardProps) {
  return (
    <View style={styles.treinoCard}>
      <View style={styles.treinoCardHeader}>
        <Text style={styles.treinoCardTitle}>{treino.nomeTreino}</Text>
        <View style={styles.treinoCardActions}>
          <TouchableOpacity 
            style={styles.editTreinoCardButton}
            onPress={onEditar}
          >
            <Ionicons name="create-outline" size={20} color="#FF9800" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.deleteTreinoCardButton}
            onPress={onExcluir}
          >
            <Ionicons name="trash-outline" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.exercicioCount}>{treino.exercicios.length} exercícios</Text>
      {treino.exercicios.map((exercicio, exIndex) => (
        <View key={exIndex} style={styles.exercicioItem}>
          <View style={styles.exercicioItemContent}>
            <Text style={styles.exercicioText}>{exercicio.nomeExercicio}</Text>
            <Text style={styles.exercicioDetails}>
              {exercicio.series}x{exercicio.repeticao || exercicio.repeticoes} - {exercicio.peso}kg - {exercicio.diaSemana}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}