import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/AreaTreinador';
import { ClienteFormData } from '../types';

interface ClienteFormProps {
  formData: ClienteFormData;
  onChangeFormData: (data: ClienteFormData) => void;
  onConcluir: () => void;
}

export default function ClienteForm({ formData, onChangeFormData, onConcluir }: ClienteFormProps) {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Cadastrar Cliente</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Nome</Text>
        <TextInput
          style={styles.input}
          value={formData.nome}
          onChangeText={(text) => onChangeFormData({ ...formData, nome: text })}
          placeholder="Digite o nome"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => onChangeFormData({ ...formData, email: text })}
          placeholder="Digite o e-mail"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={formData.telefone}
          onChangeText={(text) => onChangeFormData({ ...formData, telefone: text })}
          placeholder="Digite o telefone"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>ID do Cliente</Text>
        <TextInput
          style={styles.input}
          value={formData.id}
          onChangeText={(text) => onChangeFormData({ ...formData, id: text })}
          placeholder="Digite o ID"
        />
      </View>

      <TouchableOpacity style={styles.concludeButton} onPress={onConcluir}>
        <Text style={styles.concludeButtonText}>Concluir cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}