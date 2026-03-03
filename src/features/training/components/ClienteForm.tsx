import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ClienteFormData } from '../types';

interface ClienteFormProps {
  formData: ClienteFormData;
  onChangeFormData: (data: ClienteFormData) => void;
  onConcluirCadastro: () => void;
  onCancelForm: () => void;
  styles: any;
}

export default function ClienteForm({ formData, onChangeFormData, onConcluirCadastro, onCancelForm, styles }: ClienteFormProps) {
  return (
    <View style={styles.formContainer}>
      <View style={styles.modalHeader}>
        <Text style={styles.formTitle}>Solicitar vínculo</Text>
        <TouchableOpacity onPress={onCancelForm} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>ID do Aluno</Text>
        <TextInput
          style={styles.input}
          value={formData.id}
          onChangeText={(text) => onChangeFormData({ ...formData, id: text })}
          placeholder="Cole o ID do aluno"
        />
      </View>

      <TouchableOpacity style={styles.concludeButton} onPress={onConcluirCadastro}>
        <Text style={styles.concludeButtonText}>Enviar solicitação</Text>
      </TouchableOpacity>
    </View>
  );
}