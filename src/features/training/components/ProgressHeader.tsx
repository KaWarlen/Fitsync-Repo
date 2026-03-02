import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../shared/theme';

interface ProgressHeaderProps {
  totalConcluidos: number;
  total: number;
  percentual: number;
  todosConcluidos: boolean;
  styles: any;
}

export default function ProgressHeader({ totalConcluidos, total, percentual, todosConcluidos, styles }: ProgressHeaderProps) {
  const { theme } = useTheme();
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressInfo}>
        <Text style={styles.progressText}>
          {totalConcluidos} / {total} exercícios concluídos
        </Text>
        {todosConcluidos && (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={20} color={theme.success} />
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
