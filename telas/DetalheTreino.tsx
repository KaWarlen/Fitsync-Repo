import { useTheme } from '../src/contexts/ThemeContext';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import getStyles from '../styles/DetalheTreino';

interface Exercicio {
  id: string;
  nome: string;
  series: string;
  repeticoes: string;
  peso: string;
  concluido: boolean;
}

export default function DetalheTreino({ route, navigation }: any) {
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);

  const { treino } = route.params;
  
  const [exercicios, setExercicios] = useState<Exercicio[]>([
    { id: '1', nome: 'Supino Reto', series: '4', repeticoes: '12', peso: '60kg', concluido: false },
    { id: '2', nome: 'Supino Inclinado', series: '3', repeticoes: '12', peso: '50kg', concluido: false },
    { id: '3', nome: 'Crucifixo', series: '3', repeticoes: '15', peso: '20kg', concluido: false },
    { id: '4', nome: 'Crossover', series: '3', repeticoes: '15', peso: '15kg', concluido: false },
    { id: '5', nome: 'Flexão', series: '3', repeticoes: '20', peso: 'Corporal', concluido: false },
  ]);

  const toggleExercicio = (id: string) => {
    setExercicios(exercicios.map(ex => 
      ex.id === id ? { ...ex, concluido: !ex.concluido } : ex
    ));
  };

  const todosConcluidos = exercicios.every(ex => ex.concluido);
  const totalConcluidos = exercicios.filter(ex => ex.concluido).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{treino.nome}</Text>
          <Text style={styles.subtitle}>{treino.dia}</Text>
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {totalConcluidos} / {exercicios.length} exercícios concluídos
          </Text>
          {todosConcluidos && (
            <View style={styles.completedBadge}>
              <MaterialIcons name="check-circle" size={20} color="#00C853" />
              <Text style={styles.completedText}>Dia Registrado!</Text>
            </View>
          )}
        </View>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${(totalConcluidos / exercicios.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {/* Exercícios */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {exercicios.map((exercicio) => (
          <TouchableOpacity
            key={exercicio.id}
            style={[
              styles.exercicioCard,
              exercicio.concluido && styles.exercicioCardConcluido
            ]}
            onPress={() => toggleExercicio(exercicio.id)}
          >
            <View style={styles.exercicioHeader}>
              <View style={styles.exercicioTitleContainer}>
                <MaterialIcons 
                  name={exercicio.concluido ? "check-circle" : "radio-button-unchecked"} 
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
                <MaterialIcons name="repeat" size={16} color={isDarkMode ? '#999' : '#666'} />
                <Text style={styles.detalheText}>{exercicio.series} séries</Text>
              </View>
              <View style={styles.detalheItem}>
                <MaterialIcons name="fitness-center" size={16} color={isDarkMode ? '#999' : '#666'} />
                <Text style={styles.detalheText}>{exercicio.repeticoes} reps</Text>
              </View>
              <View style={styles.detalheItem}>
                <MaterialIcons name="fitness-center" size={16} color={isDarkMode ? '#999' : '#666'} />
                <Text style={styles.detalheText}>{exercicio.peso}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Botão Finalizar */}
      {todosConcluidos && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.finalizarButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="check-circle" size={24} color="#fff" />
            <Text style={styles.finalizarButtonText}>Treino Completo!</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
