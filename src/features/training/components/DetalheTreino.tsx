import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/DetalheTreino';
import { Exercicio } from '../types';
import { TrainingService } from '../services';
import ExercicioCard from './ExercicioCard';
import ProgressHeader from './ProgressHeader';

export default function DetalheTreino({ route, navigation }: any) {
  const { treino } = route.params;
  
  const [exercicios, setExercicios] = useState<Exercicio[]>([
    { id: '1', nomeExercicio: 'Supino Reto', nome: 'Supino Reto', series: '4', repeticoes: '12', peso: '60kg', concluido: false },
    { id: '2', nomeExercicio: 'Supino Inclinado', nome: 'Supino Inclinado', series: '3', repeticoes: '12', peso: '50kg', concluido: false },
    { id: '3', nomeExercicio: 'Crucifixo', nome: 'Crucifixo', series: '3', repeticoes: '15', peso: '20kg', concluido: false },
    { id: '4', nomeExercicio: 'Crossover', nome: 'Crossover', series: '3', repeticoes: '15', peso: '15kg', concluido: false },
    { id: '5', nomeExercicio: 'Flexão', nome: 'Flexão', series: '3', repeticoes: '20', peso: 'Corporal', concluido: false },
  ]);

  const toggleExercicio = (id: string) => {
    setExercicios(exercicios.map(ex => 
      ex.id === id ? { ...ex, concluido: !ex.concluido } : ex
    ));
  };

  const { total, concluidos: totalConcluidos, percentual } = TrainingService.calculateProgress(exercicios);
  const todosConcluidos = totalConcluidos === total;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{treino.nome}</Text>
          <Text style={styles.subtitle}>{treino.dia}</Text>
        </View>
      </View>

      {/* Progress */}
      <ProgressHeader 
        totalConcluidos={totalConcluidos}
        total={total}
        percentual={percentual}
        todosConcluidos={todosConcluidos}
      />

      {/* Exercícios */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {exercicios.map((exercicio) => (
          <ExercicioCard
            key={exercicio.id}
            exercicio={exercicio}
            onToggle={() => toggleExercicio(exercicio.id || '')}
          />
        ))}
      </ScrollView>

      {/* Botão Finalizar */}
      {todosConcluidos && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.finalizarButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="checkmark-circle" size={24} color="#fff" />
            <Text style={styles.finalizarButtonText}>Treino Completo!</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
