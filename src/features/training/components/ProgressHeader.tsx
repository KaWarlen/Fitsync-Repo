import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/DetalheTreino';

interface ProgressHeaderProps {
  totalConcluidos: number;
  total: number;
  percentual: number;
  todosConcluidos: boolean;
}

export default function ProgressHeader({ totalConcluidos, total, percentual, todosConcluidos }: ProgressHeaderProps) {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressInfo}>
        <Text style={styles.progressText}>
          {totalConcluidos} / {total} exercícios concluídos
        </Text>
        {todosConcluidos && (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={20} color="#00C853" />
            <Text style={styles.completedText}>Dia Registrado!</Text>
          </View>
        )}
      </View>
      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${percentual}%` }
          ]} 
        />
      </View>
    </View>
  );
}
