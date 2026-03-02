import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/TreinosCliente';
import { Exercicio, Treino } from '../types';
import { TrainingService } from '../services';
import { DIAS_SEMANA } from '../constants';

export default function TreinosCliente({ route, navigation }: any) {
  const { cliente, treinos } = route.params;
  const treinosCliente = treinos.filter((t: Treino) => t.clienteId === cliente.id);
  const [exerciciosConcluidos, setExerciciosConcluidos] = useState<Set<string>>(new Set());

  const toggleExercicioConcluido = (diaIndex: number, exercicioIndex: number) => {
    const key = `${diaIndex}-${exercicioIndex}`;
    const newSet = new Set(exerciciosConcluidos);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    setExerciciosConcluidos(newSet);
  };

  // Agrupar exercícios por dia da semana
  const todosExercicios: Exercicio[] = [];
  treinosCliente.forEach((treino: Treino) => {
    todosExercicios.push(...treino.exercicios);
  });
  
  const treinosPorDia = TrainingService.groupExerciciosByDia(todosExercicios);
  const diasOrdenados = [...DIAS_SEMANA, 'Sem dia definido'];
  const diasFiltrados = diasOrdenados.filter(dia => treinosPorDia[dia]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Treinos de {cliente.nome}</Text>
      </View>

      <ScrollView style={styles.content}>
        {treinosCliente.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="barbell-outline" size={80} color="#ccc" />
            <Text style={styles.emptyStateText}>Nenhum treino cadastrado</Text>
            <Text style={styles.emptyStateSubtext}>para este cliente</Text>
          </View>
        ) : (
          diasFiltrados.map((dia, diaIndex) => (
            <View key={dia} style={styles.diaContainer}>
              <View style={styles.diaHeader}>
                <Ionicons name="calendar" size={20} color="#007AFF" />
                <Text style={styles.diaTitle}>{dia}</Text>
              </View>
              
              {treinosPorDia[dia].map((exercicio, index) => {
                const key = `${diaIndex}-${index}`;
                const isConcluido = exerciciosConcluidos.has(key);
                
                return (
                  <TouchableOpacity 
                    key={index} 
                    style={[
                      styles.exercicioCard,
                      isConcluido && styles.exercicioCardConcluido
                    ]}
                    onPress={() => toggleExercicioConcluido(diaIndex, index)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.exercicioHeader}>
                      <View style={styles.exercicioNomeContainer}>
                        <Text style={styles.exercicioNome}>{exercicio.nomeExercicio}</Text>
                        {isConcluido && (
                          <Ionicons name="checkmark-circle" size={24} color="#00C853" />
                        )}
                      </View>
                      {exercicio.nomeTreino && (
                        <View style={styles.treinoBadge}>
                          <Text style={styles.treinoBadgeText}>{exercicio.nomeTreino}</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.exercicioDetalhes}>
                      <View style={styles.detalheItem}>
                        <Ionicons name="fitness" size={16} color="#666" />
                        <Text style={styles.detalheText}>{exercicio.area}</Text>
                      </View>
                      <View style={styles.detalheItem}>
                        <Ionicons name="barbell" size={16} color="#666" />
                        <Text style={styles.detalheText}>{exercicio.peso}kg</Text>
                      </View>
                      <View style={styles.detalheItem}>
                        <Text style={styles.detalheText}>{exercicio.series}x{exercicio.repeticao}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
