import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Cliente, Treino, ClienteFormData } from '../types';
import { TrainingService } from '../services';
import ClienteCard from './ClienteCard';
import ClienteForm from './ClienteForm';

interface ClientesTabProps {
  clientes: Cliente[];
  treinos: Treino[];
  showForm: boolean;
  formData: ClienteFormData;
  onChangeFormData: (data: ClienteFormData) => void;
  onAddClient: () => void;
  onConcluirCadastro: () => void;
  onCancelCadastro: () => void;
  onMontarTreino: (cliente: Cliente) => void;
  onEditarTreino: (cliente: Cliente) => void;
  onMostrarTreino: (cliente: Cliente) => void;
  onSolicitarVinculo: (cliente: Cliente) => void;
  onRemoverVinculo: (cliente: Cliente) => void;
  onVerDetalhes: (cliente: Cliente) => void;
  styles: any;
}

export default function ClientesTab({
  clientes,
  treinos,
  showForm,
  formData,
  onChangeFormData,
  onAddClient,
  onConcluirCadastro,
  onCancelCadastro,
  onMontarTreino,
  onEditarTreino,
  onMostrarTreino,
  onSolicitarVinculo,
  onRemoverVinculo,
  onVerDetalhes,
  styles
}: ClientesTabProps) {
  return (
    <>
      {clientes.length === 0 && !showForm && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Nenhum Cliente encontrado</Text>
          <Text style={styles.emptyStateText}>e/ou cadastrado</Text>
        </View>
      )}

      {showForm && (
        <ClienteForm
          formData={formData}
          onChangeFormData={onChangeFormData}
          onConcluirCadastro={onConcluirCadastro}
            onCancelForm={onCancelCadastro}
          styles={styles}
        />
      )}

      {!showForm && clientes.length > 0 && (
        <View style={styles.clientsListContainer}>
          {clientes.map((cliente, index) => {
            const clienteTemTreino = TrainingService.clienteTemTreinos(cliente.id, treinos);
            
            return (
              <ClienteCard
                key={index}
                cliente={cliente}
                temTreino={clienteTemTreino}
                onMontarTreino={onMontarTreino}
                onEditarTreino={onEditarTreino}
                onMostrarTreino={onMostrarTreino}
                onSolicitarVinculo={onSolicitarVinculo}
                onRemoverVinculo={onRemoverVinculo}
                onVerDetalhes={onVerDetalhes}
                styles={styles}
              />
            );
          })}
        </View>
      )}

      {!showForm && (
        <TouchableOpacity style={styles.addButton} onPress={onAddClient}>
          <Text style={styles.addButtonText}>Adicionar Cliente</Text>
        </TouchableOpacity>
      )}
    </>
  );
}