import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Cliente } from '../types';

interface ClienteCardProps {
  cliente: Cliente;
  temTreino: boolean;
  onMontarTreino: (cliente: Cliente) => void;
  onEditarTreino: (cliente: Cliente) => void;
  onMostrarTreino: (cliente: Cliente) => void;
  styles: any;
}

export default function ClienteCard({
  cliente,
  temTreino,
  onMontarTreino,
  onEditarTreino,
  onMostrarTreino,
  styles
}: ClienteCardProps) {
  return (
    <View style={styles.clientCard}>
      <View style={styles.clientInfoContainer}>
        <View style={styles.clientInfo}>
          <Text style={styles.clientLabel}>Cliente:</Text>
          <Text style={styles.clientValue}>{cliente.nome}</Text>
        </View>
        <View style={styles.clientInfo}>
          <Text style={styles.clientLabel}>ID:</Text>
          <Text style={styles.clientValue}>{cliente.id}</Text>
        </View>
      </View>
      
      {!temTreino ? (
        <TouchableOpacity 
          style={styles.montarTreinoButton}
          onPress={() => onMontarTreino(cliente)}
        >
          <Ionicons name="barbell" size={20} color="#fff" />
          <Text style={styles.montarTreinoButtonText}>Montar Treino</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.treinoActionsContainer}>
          <TouchableOpacity 
            style={styles.editarTreinoButton}
            onPress={() => onEditarTreino(cliente)}
          >
            <Ionicons name="create-outline" size={20} color="#fff" />
            <Text style={styles.editarTreinoButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.mostrarTreinoButton}
            onPress={() => onMostrarTreino(cliente)}
          >
            <Ionicons name="eye-outline" size={20} color="#fff" />
            <Text style={styles.mostrarTreinoButtonText}>Ver Treino</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}