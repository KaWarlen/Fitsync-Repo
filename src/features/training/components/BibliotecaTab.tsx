import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/AreaTreinador';
import { TreinoPadrao } from '../types';
import TreinoCard from './TreinoCard';

interface BibliotecaTabProps {
  treinosPadrao: TreinoPadrao[];
  showBibliotecaForm: boolean;
  onAddTreino: () => void;
  onEditarTreino: (index: number) => void;
  onExcluirTreino: (index: number) => void;
}

export default function BibliotecaTab({
  treinosPadrao,
  showBibliotecaForm,
  onAddTreino,
  onEditarTreino,
  onExcluirTreino
}: BibliotecaTabProps) {
  return (
    <>
      {treinosPadrao.length === 0 && !showBibliotecaForm && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Nenhum treino encontrado</Text>
          <Text style={styles.emptyStateText}>e/ou cadastrado</Text>
        </View>
      )}

      {!showBibliotecaForm && treinosPadrao.length > 0 && (
        <View style={styles.treinosListContainer}>
          {treinosPadrao.map((treino, treinoIndex) => (
            <TreinoCard
              key={treinoIndex}
              treino={treino}
              onEditar={() => onEditarTreino(treinoIndex)}
              onExcluir={() => onExcluirTreino(treinoIndex)}
            />
          ))}
        </View>
      )}

      {!showBibliotecaForm && (
        <TouchableOpacity style={styles.addButton} onPress={onAddTreino}>
          <Text style={styles.addButtonText}>Adicionar treino</Text>
        </TouchableOpacity>
      )}
    </>
  );
}