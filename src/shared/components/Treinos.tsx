import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/Treinos';

export default function Treinos({ navigation }: any) {
  // Lista começa vazia — treinos aparecem apenas quando vinculados por um Personal Trainer
  const [treinos, setTreinos] = React.useState<any[]>([]);

  const renderTreino = ({ item }: any) => (
    <TouchableOpacity style={styles.treinoCard} onPress={() => navigation.navigate('DetalheTreino', { treino: item })}>
      <View style={styles.treinoHeader}>
        <View style={styles.treinoHeaderRow}>
          <Text style={styles.treinoNome}>{item.nome}</Text>
          {item.concluido && (
            <Ionicons name="checkmark-circle" size={24} color="#00C853" />
          )}
        </View>
        <Text style={styles.treinoDia}>{item.dia}</Text>
      </View>
      <View style={styles.treinoFooter}>
        <Text style={styles.treinoInfo}>⏱ {item.duracao}</Text>
        <Text style={styles.treinoInfo}> {item.exercicios} exercícios</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Ionicons name="barbell" size={36} color="#fff" />
          <Text style={styles.title}>Seus Treinos</Text>
        </View>
      </View>

      <FlatList
        data={treinos}
        renderItem={renderTreino}
        keyExtractor={(item) => item.id}
        contentContainerStyle={treinos.length === 0 ? styles.emptyList : styles.listContent}
        scrollEnabled={true}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <Ionicons name="calendar-outline" size={64} color="#bbb" />
            <Text style={{ color: '#888', fontSize: 16, marginTop: 16, textAlign: 'center' }}>
              Nenhum treino vinculado ainda.{'\n'}Aguarde seu Personal Trainer adicionar treinos para você.
            </Text>
          </View>
        }
      />
    </View>
  );
}
