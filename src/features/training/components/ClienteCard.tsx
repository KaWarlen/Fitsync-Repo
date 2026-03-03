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
  onSolicitarVinculo: (cliente: Cliente) => void;
  onRemoverVinculo: (cliente: Cliente) => void;
  onVerDetalhes: (cliente: Cliente) => void;
  styles: any;
}

export default function ClienteCard({
  cliente,
  temTreino,
  onMontarTreino,
  onEditarTreino,
  onMostrarTreino,
  onSolicitarVinculo,
  onRemoverVinculo,
  onVerDetalhes,
  styles
}: ClienteCardProps) {
  const status = cliente.linkStatus || 'SEM_VINCULO';
  const statusLabel: Record<string, string> = {
    SEM_VINCULO: 'Sem vínculo',
    PENDENTE: 'Pendente',
    ACEITO: 'Aceito'
  };
  const statusIcon: Record<string, keyof typeof Ionicons.glyphMap> = {
    SEM_VINCULO: 'unlink',
    PENDENTE: 'time-outline',
    ACEITO: 'checkmark-circle'
  };
  const statusStyleKey: Record<string, any> = {
    SEM_VINCULO: styles.statusNeutral,
    PENDENTE: styles.statusPending,
    ACEITO: styles.statusAccepted
  };

  return (
    <View style={styles.clientCard}>
      <View style={styles.clientHeader}>
        <View style={styles.clientInfoBlock}>
          <Text style={styles.clientLabel}>Cliente</Text>
          <Text style={styles.clientValue}>{cliente.nome}</Text>
          <Text style={[styles.clientLabel, { marginTop: 6 }]}>ID</Text>
          <Text style={styles.clientValue}>{cliente.id}</Text>
        </View>
        <View style={[styles.statusBadge, statusStyleKey[status]]}>
          <Ionicons name={statusIcon[status]} size={16} color={styles.statusBadgeText.color} />
          <Text style={styles.statusBadgeText}>{statusLabel[status]}</Text>
        </View>
      </View>

      <View style={styles.treinoActionsContainer}>
        <TouchableOpacity 
          style={styles.infoButton}
          onPress={() => onVerDetalhes(cliente)}
        >
          <Ionicons name="information-circle-outline" size={18} color={styles.infoButtonText.color} />
          <Text style={styles.infoButtonText}>Detalhes</Text>
        </TouchableOpacity>
      </View>
      
      {status === 'SEM_VINCULO' && (
        <TouchableOpacity 
          style={styles.montarTreinoButton}
          onPress={() => onSolicitarVinculo(cliente)}
        >
          <Ionicons name="link" size={20} color="#fff" />
          <Text style={styles.montarTreinoButtonText}>Solicitar vínculo</Text>
        </TouchableOpacity>
      )}

      {status === 'PENDENTE' && (
        <View style={[styles.treinoActionsContainer, { justifyContent: 'space-between' }]}>
          <View style={[styles.statusBadge, styles.statusPending, { paddingHorizontal: 10, paddingVertical: 8 }]}>
            <Ionicons name="time-outline" size={16} color={styles.statusBadgeText.color} />
            <Text style={styles.statusBadgeText}>Aguardando aceite</Text>
          </View>
          <TouchableOpacity 
            style={styles.infoButton}
            onPress={() => onRemoverVinculo(cliente)}
          >
            <Ionicons name="close-circle" size={18} color={styles.infoButtonText.color} />
            <Text style={styles.infoButtonText}>Cancelar pedido</Text>
          </TouchableOpacity>
        </View>
      )}

      {status === 'ACEITO' && (
        <View style={[styles.treinoActionsContainer, { flexWrap: 'wrap', gap: 10 }]}>
          {!temTreino ? (
            <TouchableOpacity 
              style={styles.montarTreinoButton}
              onPress={() => onMontarTreino(cliente)}
            >
              <Ionicons name="barbell" size={20} color="#fff" />
              <Text style={styles.montarTreinoButtonText}>Montar Treino</Text>
            </TouchableOpacity>
          ) : (
            <>
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
            </>
          )}
          <TouchableOpacity 
            style={styles.infoButton}
            onPress={() => onRemoverVinculo(cliente)}
          >
            <Ionicons name="unlink" size={18} color={styles.infoButtonText.color} />
            <Text style={styles.infoButtonText}>Remover vínculo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}