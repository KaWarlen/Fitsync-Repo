import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getStyles } from '../styles/AreaTreinador';
import { Cliente, Exercicio, Treino, TreinoPadrao, ClienteFormData, TreinoFormData } from '../types';
import { TrainingService } from '../services';
import { DIAS_SEMANA } from '../constants';
import ClientesTab from './ClientesTab';
import BibliotecaTab from './BibliotecaTab';
import BottomNavigation from './BottomNavigation';
import { AreaTreinadorProps } from '../../../shared/types/navigation';
import { useTheme } from '../../../shared/theme';
import { AuthAPI } from '../../auth/services/auth';
import { logout as localLogout } from '../../auth/services/local-auth';
import { useFocusEffect } from '@react-navigation/native';

export default function AreaTreinador({ navigation }: AreaTreinadorProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [activeTab, setActiveTab] = useState('clientes');
  const [showForm, setShowForm] = useState(false);
  const [showTreinoForm, setShowTreinoForm] = useState(false);
  const [showBibliotecaForm, setShowBibliotecaForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTreinoIndex, setEditingTreinoIndex] = useState<number | null>(null);
  const [editingExercicioIndex, setEditingExercicioIndex] = useState<number | null>(null);
  const [editingBibliotecaIndex, setEditingBibliotecaIndex] = useState<number | null>(null);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [selectedTreinosPadrao, setSelectedTreinosPadrao] = useState<string[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [treinosPadrao, setTreinosPadrao] = useState<TreinoPadrao[]>([]);
  const [exerciciosAtuais, setExerciciosAtuais] = useState<Exercicio[]>([]);
  const [formData, setFormData] = useState<ClienteFormData>({
    nome: '',
    email: '',
    telefone: '',
    id: ''
  });
  const [treinoFormData, setTreinoFormData] = useState<TreinoFormData>({
    clienteId: '',
    nomeTreino: '',
    nomeExercicio: '',
    area: '',
    peso: '',
    series: '',
    repeticao: '',
    diaSemana: ''
  });
  const [clienteDetalhe, setClienteDetalhe] = useState<Cliente | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    loadClientesVinculados();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadClientesVinculados();
      return () => {};
    }, [])
  );

  const handleLogout = async () => {
    try {
      await Promise.all([
        AuthAPI.logout(),
        localLogout()
      ]);
    } finally {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Inicio' }]
      });
    }
  };

  const handleSettings = () => {
    navigation.navigate('Settings', {});
  };

  const mapClienteApi = (c: any): Cliente => ({
    id: c.id || c.uid || '',
    nome: c.name || c.nome || 'Aluno',
    email: c.email || '',
    telefone: c.telefone || c.phone,
    linkStatus: c.linkStatus || 'ACEITO'
  });

  const loadClientesVinculados = async () => {
    try {
      const data = await TrainingService.getAlunosVinculados();
      const lista = Array.isArray(data) ? data : (data as any)?.alunos || [];
      const mapped = lista.map(mapClienteApi);
      setClientes(mapped);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar seus alunos vinculados.');
    }
  };

  const handleAddClient = () => {
    setShowForm(true);
  };

  const handleConcluirCadastro = async () => {
    if (!formData.id.trim()) {
      Alert.alert('ID obrigatório', 'Informe apenas o ID do aluno para solicitar vínculo.');
      return;
    }

    try {
      const response = await TrainingService.requestVinculo(formData.id.trim());
      const user = response?.user || response || {};
      const novoCliente: Cliente = {
        id: user.id || formData.id.trim(),
        nome: user.name || formData.nome || 'Aluno',
        email: user.email || formData.email || '',
        telefone: formData.telefone,
        linkStatus: user.linkStatus || 'PENDENTE'
      };

      const jaExiste = clientes.findIndex(c => c.id === novoCliente.id);
      if (jaExiste >= 0) {
        const copia = [...clientes];
        copia[jaExiste] = novoCliente;
        setClientes(copia);
      } else {
        setClientes([...clientes, novoCliente]);
      }

      Alert.alert('Solicitação enviada', 'Vínculo pendente de aprovação do aluno.');
      setFormData({ nome: '', email: '', telefone: '', id: '' });
      setShowForm(false);
    } catch (error: any) {
      const backendMsg = error?.response?.data?.error || error?.response?.data?.message;
      const friendly = backendMsg?.includes('Já existe uma solicitação pendente')
        ? 'Já existe uma solicitação pendente para este aluno. Aguarde a resposta ou remova a pendente antes de reenviar.'
        : backendMsg || 'Tente novamente.';
      Alert.alert('Não foi possível enviar', friendly);
    }
  };

  const handleAddTreino = () => {
    setShowBibliotecaForm(true);
    setEditingBibliotecaIndex(null);
  };

  const handleEditarTreinoPadrao = (index: number) => {
    const treino = treinosPadrao[index];
    setExerciciosAtuais(treino.exercicios);
    setTreinoFormData({ 
      ...treinoFormData, 
      nomeTreino: treino.nomeTreino
    });
    setEditingBibliotecaIndex(index);
    setShowBibliotecaForm(true);
  };

  const handleExcluirTreinoPadrao = (index: number) => {
    const treinosAtualizados = treinosPadrao.filter((_, i) => i !== index);
    setTreinosPadrao(treinosAtualizados);
  };

  const handleVerDetalhesCliente = async (cliente: Cliente) => {
    try {
      const fresh = await TrainingService.getAlunoById(cliente.id);
      const mapped = mapClienteApi(fresh);
      setClienteDetalhe(mapped);
    } catch {
      setClienteDetalhe(cliente);
    }
    setShowStatusModal(true);
  };

  const handleSolicitarVinculoCliente = async (cliente: Cliente) => {
    try {
      const response = await TrainingService.requestVinculo(cliente.id);
      const user = response?.user || response || {};
      const atualizado: Cliente = {
        ...cliente,
        nome: user.name || cliente.nome,
        email: user.email || cliente.email,
        linkStatus: user.linkStatus || 'PENDENTE'
      };
      setClientes(prev => prev.map(c => (c.id === cliente.id ? atualizado : c)));
      Alert.alert('Solicitação enviada', 'Vínculo pendente de aprovação do aluno.');
      setClienteDetalhe(atualizado);
      loadClientesVinculados();
    } catch (error: any) {
      const backendMsg = error?.response?.data?.error || error?.response?.data?.message;
      const friendly = backendMsg?.includes('Já existe uma solicitação pendente')
        ? 'Já existe uma solicitação pendente para este aluno. Aguarde a resposta ou remova a pendente antes de reenviar.'
        : backendMsg || 'Tente novamente.';
      Alert.alert('Não foi possível enviar', friendly);
    }
  };

  const handleRemoverVinculoCliente = async (cliente: Cliente) => {
    try {
      await TrainingService.removeVinculo(cliente.id);
      setClientes(prev => prev.filter(c => c.id !== cliente.id));
      setTreinos(prev => prev.filter(t => t.clienteId !== cliente.id));
      loadClientesVinculados();
      Alert.alert('Vínculo removido', 'O aluno foi desvinculado.');
      if (clienteDetalhe?.id === cliente.id) {
        setShowStatusModal(false);
        setClienteDetalhe(null);
        loadClientesVinculados();
      }
    } catch (error: any) {
      Alert.alert('Erro ao remover vínculo', error?.response?.data?.message || 'Tente novamente.');
    }
  };

  const handleMontarTreinoCliente = (cliente: Cliente) => {
    if (cliente.linkStatus !== 'ACEITO') {
      Alert.alert('Vínculo pendente', 'Só é possível montar treino após o aluno aceitar o vínculo.');
      return;
    }
    setSelectedCliente(cliente);
    setSelectedTreinosPadrao([]);
    setShowTreinoForm(true);
  };

  const handleEditarTreino = (cliente: Cliente) => {
    if (cliente.linkStatus !== 'ACEITO') {
      Alert.alert('Vínculo pendente', 'Só é possível editar treinos após o vínculo ser aceito.');
      return;
    }
    const treinoIndex = treinos.findIndex(t => t.clienteId === cliente.id);
    if (treinoIndex !== -1) {
      const treino = treinos[treinoIndex];
      setSelectedCliente(cliente);
      setIsEditMode(true);
      setEditingTreinoIndex(treinoIndex);
      setShowTreinoForm(true);
    }
  };

  const handleAtribuirTreinos = () => {
    if (selectedCliente && selectedTreinosPadrao.length > 0) {
      const exerciciosAtribuidos: Exercicio[] = [];
      
      selectedTreinosPadrao.forEach(treinoId => {
        const treino = treinosPadrao.find(t => t.id === treinoId);
        if (treino) {
          exerciciosAtribuidos.push(...treino.exercicios);
        }
      });

      if (isEditMode && editingTreinoIndex !== null) {
        // Modo edição: atualizar treino existente
        const treinosAtualizados = [...treinos];
        treinosAtualizados[editingTreinoIndex] = {
          ...treinos[editingTreinoIndex],
          clienteNome: selectedCliente.nome,
          clienteId: selectedCliente.id,
          exercicios: exerciciosAtribuidos
        };
        setTreinos(treinosAtualizados);
      } else {
        // Modo criação: adicionar novo treino
        const novoTreino: Treino = {
          id: Date.now().toString(),
          nome: `Treino de ${selectedCliente.nome}`,
          clienteNome: selectedCliente.nome,
          clienteId: selectedCliente.id,
          exercicios: exerciciosAtribuidos
        };
        setTreinos([...treinos, novoTreino]);
      }

      setSelectedTreinosPadrao([]);
      setShowTreinoForm(false);
      setSelectedCliente(null);
      setIsEditMode(false);
      setEditingTreinoIndex(null);
      setActiveTab('clientes');
    }
  };

  const handleExcluirTreinoCliente = (clienteId: string, treinoNome: string) => {
    const treinoIndex = treinos.findIndex(t => t.clienteId === clienteId);
    if (treinoIndex !== -1) {
      const treino = treinos[treinoIndex];
      const exerciciosAtualizados = treino.exercicios.filter(ex => ex.nomeTreino !== treinoNome);
      
      if (exerciciosAtualizados.length === 0) {
        // Remove o treino completamente se não há mais exercícios
        const treinosAtualizados = treinos.filter((_, i) => i !== treinoIndex);
        setTreinos(treinosAtualizados);
      } else {
        // Atualiza o treino removendo apenas os exercícios do treino específico
        const treinosAtualizados = [...treinos];
        treinosAtualizados[treinoIndex] = {
          ...treino,
          exercicios: exerciciosAtualizados
        };
        setTreinos(treinosAtualizados);
      }
    }
  };

  const handleMostrarTreino = (cliente: Cliente) => {
    if (cliente.linkStatus !== 'ACEITO') {
      Alert.alert('Vínculo pendente', 'Aguarde o aceite do aluno para visualizar treinos.');
      return;
    }
    navigation.navigate('TreinosCliente', { cliente, treinos });
  };

  const handleAdicionarExercicio = () => {
    if (TrainingService.validateExercicio(treinoFormData)) {
      
      if (editingExercicioIndex !== null) {
        // Modo edição de exercício
        const exerciciosAtualizados = [...exerciciosAtuais];
        exerciciosAtualizados[editingExercicioIndex] = {
          nomeTreino: treinoFormData.nomeTreino,
          nomeExercicio: treinoFormData.nomeExercicio,
          area: treinoFormData.area,
          peso: treinoFormData.peso,
          series: treinoFormData.series,
          repeticao: treinoFormData.repeticao,
          diaSemana: treinoFormData.diaSemana
        };
        setExerciciosAtuais(exerciciosAtualizados);
        setEditingExercicioIndex(null);
      } else {
        // Modo adicionar novo exercício
        const novoExercicio: Exercicio = {
          nomeTreino: treinoFormData.nomeTreino,
          nomeExercicio: treinoFormData.nomeExercicio,
          area: treinoFormData.area,
          peso: treinoFormData.peso,
          series: treinoFormData.series,
          repeticao: treinoFormData.repeticao,
          diaSemana: treinoFormData.diaSemana
        };
        setExerciciosAtuais([...exerciciosAtuais, novoExercicio]);
      }
      
      setTreinoFormData({ 
        ...treinoFormData, 
        nomeExercicio: '', 
        area: '', 
        peso: '', 
        series: '', 
        repeticao: '',
        diaSemana: ''
      });
    }
  };

  const handleEditarExercicio = (index: number) => {
    const exercicio = exerciciosAtuais[index];
    setTreinoFormData({
      ...treinoFormData,
      nomeExercicio: exercicio.nomeExercicio || '',
      area: exercicio.area || '',
      peso: exercicio.peso?.toString() || '',
      series: exercicio.series?.toString() || '',
      repeticao: exercicio.repeticao?.toString() || exercicio.repeticoes?.toString() || '',
      diaSemana: exercicio.diaSemana || ''
    });
    setEditingExercicioIndex(index);
  };

  const handleExcluirExercicio = (index: number) => {
    const exerciciosAtualizados = exerciciosAtuais.filter((_, i) => i !== index);
    setExerciciosAtuais(exerciciosAtualizados);
    if (editingExercicioIndex === index) {
      setEditingExercicioIndex(null);
      setTreinoFormData({ 
        ...treinoFormData, 
        nomeExercicio: '', 
        area: '', 
        peso: '', 
        series: '', 
        repeticao: '',
        diaSemana: ''
      });
    }
  };

  const handleFinalizarTreino = () => {
    if (treinoFormData.nomeTreino && exerciciosAtuais.length > 0) {
      if (editingBibliotecaIndex !== null) {
        // Modo edição de treino padrão
        const treinosAtualizados = [...treinosPadrao];
        treinosAtualizados[editingBibliotecaIndex] = {
          id: treinosPadrao[editingBibliotecaIndex].id,
          nomeTreino: treinoFormData.nomeTreino,
          exercicios: exerciciosAtuais
        };
        setTreinosPadrao(treinosAtualizados);
      } else {
        // Modo criação de treino padrão
        const novoTreinoPadrao = TrainingService.createTreinoPadraoLocal(
          treinoFormData.nomeTreino,
          exerciciosAtuais
        );
        setTreinosPadrao([...treinosPadrao, novoTreinoPadrao]);
      }
      
      setTreinoFormData({ clienteId: '', nomeTreino: '', nomeExercicio: '', area: '', peso: '', series: '', repeticao: '', diaSemana: '' });
      setExerciciosAtuais([]);
      setShowBibliotecaForm(false);
      setEditingBibliotecaIndex(null);
    }
  };

  const handleCancelarTreino = () => {
    setShowBibliotecaForm(false);
    setShowTreinoForm(false);
    setTreinoFormData({ clienteId: '', nomeTreino: '', nomeExercicio: '', area: '', peso: '', series: '', repeticao: '', diaSemana: '' });
    setExerciciosAtuais([]);
    setSelectedCliente(null);
    setSelectedTreinosPadrao([]);
    setIsEditMode(false);
    setEditingTreinoIndex(null);
    setEditingExercicioIndex(null);
    setEditingBibliotecaIndex(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {activeTab === 'clientes' ? 'Meus Clientes' : activeTab === 'biblioteca' ? 'Biblioteca de Treinos' : 'Treinos'}
        </Text>
      </View>

      {/* Conteúdo */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Aba Clientes */}
        {activeTab === 'clientes' && (
          <ClientesTab
            clientes={clientes}
            treinos={treinos}
            showForm={showForm}
            formData={formData}
            onChangeFormData={setFormData}
            onAddClient={handleAddClient}
            onConcluirCadastro={handleConcluirCadastro}
            onCancelCadastro={() => {
              setShowForm(false);
              setFormData({ nome: '', email: '', telefone: '', id: '' });
            }}
            onMontarTreino={handleMontarTreinoCliente}
            onEditarTreino={handleEditarTreino}
            onMostrarTreino={handleMostrarTreino}
            onSolicitarVinculo={handleSolicitarVinculoCliente}
            onRemoverVinculo={handleRemoverVinculoCliente}
            onVerDetalhes={handleVerDetalhesCliente}
            styles={styles}
          />
        )}

        {/* Aba Biblioteca de Treinos */}
        {activeTab === 'biblioteca' && (
          <BibliotecaTab
            treinosPadrao={treinosPadrao}
            showBibliotecaForm={showBibliotecaForm}
            onAddTreino={handleAddTreino}
            onEditarTreino={handleEditarTreinoPadrao}
            onExcluirTreino={handleExcluirTreinoPadrao}
            styles={styles}
          />
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        onSettings={handleSettings}
        styles={styles}
      />
      {/* Modal de Cadastro de Treino na Biblioteca */}
      <Modal
        visible={showBibliotecaForm}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelarTreino}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView 
              style={styles.modalScroll}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={true}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {editingBibliotecaIndex !== null ? 'Editar Treino Padrão' : 'Novo Treino Padrão'}
                </Text>
                <TouchableOpacity onPress={handleCancelarTreino} style={styles.closeButton}>
                  <Ionicons name="close" size={28} color="#666" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome do Treino</Text>
                <TextInput
                  style={styles.input}
                  value={treinoFormData.nomeTreino}
                  onChangeText={(text) => setTreinoFormData({ ...treinoFormData, nomeTreino: text })}
                  placeholder="Digite o nome do treino"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome do Exercício</Text>
                <TextInput
                  style={styles.input}
                  value={treinoFormData.nomeExercicio}
                  onChangeText={(text) => setTreinoFormData({ ...treinoFormData, nomeExercicio: text })}
                  placeholder="Digite o exercício"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Área trabalhada</Text>
                <TextInput
                  style={styles.input}
                  value={treinoFormData.area}
                  onChangeText={(text) => setTreinoFormData({ ...treinoFormData, area: text })}
                  placeholder="Digite a área"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Dia da Semana</Text>
                <View style={styles.diasSemanaContainer}>
                  {DIAS_SEMANA.map((dia) => (
                    <TouchableOpacity
                      key={dia}
                      style={[
                        styles.diaButton,
                        treinoFormData.diaSemana === dia && styles.diaButtonActive
                      ]}
                      onPress={() => setTreinoFormData({ ...treinoFormData, diaSemana: dia })}
                    >
                      <Text style={[
                        styles.diaButtonText,
                        treinoFormData.diaSemana === dia && styles.diaButtonTextActive
                      ]}>
                        {dia.substring(0, 3)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.treinoInputRow}>
                <View style={styles.treinoInputSmall}>
                  <Text style={styles.inputLabel}>Peso</Text>
                  <TextInput
                    style={styles.input}
                    value={treinoFormData.peso}
                    onChangeText={(text) => setTreinoFormData({ ...treinoFormData, peso: text })}
                    placeholder="kg"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.treinoInputSmall}>
                  <Text style={styles.inputLabel}>Séries</Text>
                  <TextInput
                    style={styles.input}
                    value={treinoFormData.series}
                    onChangeText={(text) => setTreinoFormData({ ...treinoFormData, series: text })}
                    placeholder="3"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.treinoInputSmall}>
                  <Text style={styles.inputLabel}>Repetição</Text>
                  <TextInput
                    style={styles.input}
                    value={treinoFormData.repeticao}
                    onChangeText={(text) => setTreinoFormData({ ...treinoFormData, repeticao: text })}
                    placeholder="12"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {exerciciosAtuais.length > 0 && (
                <View style={styles.exerciciosListContainer}>
                  <Text style={styles.exerciciosListTitle}>Exercícios Adicionados ({exerciciosAtuais.length})</Text>
                  {exerciciosAtuais.map((ex, index) => (
                    <View key={index} style={styles.exercicioAddedCard}>
                      <View style={styles.exercicioAddedContent}>
                        <View style={styles.exercicioAddedInfo}>
                          <Text style={styles.exercicioAddedNome}>{ex.nomeExercicio}</Text>
                          <Text style={styles.exercicioAddedDetalhes}>
                            {ex.series}x{ex.repeticao} - {ex.peso}kg - {ex.area}
                          </Text>
                          <View style={styles.diaBadge}>
                            <Ionicons name="calendar-outline" size={12} color="#007AFF" />
                            <Text style={styles.diaBadgeText}>{ex.diaSemana}</Text>
                          </View>
                        </View>
                        <View style={styles.exercicioActions}>
                          <TouchableOpacity 
                            style={styles.editExercicioButton}
                            onPress={() => handleEditarExercicio(index)}
                          >
                            <Ionicons name="create-outline" size={20} color="#FF9800" />
                          </TouchableOpacity>
                          <TouchableOpacity 
                            style={styles.deleteExercicioButton}
                            onPress={() => handleExcluirExercicio(index)}
                          >
                            <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity style={styles.addExercicioButton} onPress={handleAdicionarExercicio}>
                  <Ionicons name={editingExercicioIndex !== null ? "checkmark-circle" : "add-circle"} size={20} color="#fff" />
                  <Text style={styles.addExercicioButtonText}>
                    {editingExercicioIndex !== null ? "Atualizar Exercício" : "Adicionar Exercício"}
                  </Text>
                </TouchableOpacity>
              </View>

              {exerciciosAtuais.length > 0 && (
                <TouchableOpacity style={styles.concludeButton} onPress={handleFinalizarTreino}>
                  <Text style={styles.concludeButtonText}>Salvar Treino na Biblioteca</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal de Atribuição de Treinos ao Cliente */}
      <Modal
        visible={showTreinoForm}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelarTreino}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView 
              style={styles.modalScroll}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={true}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {isEditMode ? 'Editar Treinos do Cliente' : 'Atribuir Treinos'}
                </Text>
                <TouchableOpacity onPress={handleCancelarTreino} style={styles.closeButton}>
                  <Ionicons name="close" size={28} color="#666" />
                </TouchableOpacity>
              </View>

              {selectedCliente && (
                <View style={styles.clienteSelectedBadge}>
                  <Ionicons name="person" size={18} color="#007AFF" />
                  <Text style={styles.clienteSelectedText}>Cliente: {selectedCliente.nome}</Text>
                </View>
              )}

              {isEditMode && editingTreinoIndex !== null && (
                <View style={styles.treinosAtuaisContainer}>
                  <Text style={styles.treinosAtuaisTitle}>Treinos Atuais</Text>
                  {(() => {
                    const treino = treinos[editingTreinoIndex];
                    const treinosAgrupados: { [key: string]: Exercicio[] } = {};
                    
                    treino.exercicios.forEach(ex => {
                      const nomeTreino = ex.nomeTreino || 'Treino Sem Nome';
                      if (!treinosAgrupados[nomeTreino]) {
                        treinosAgrupados[nomeTreino] = [];
                      }
                      treinosAgrupados[nomeTreino].push(ex);
                    });

                    return Object.keys(treinosAgrupados).map((nomeTreino, index) => (
                      <View key={index} style={styles.treinoAtualCard}>
                        <View style={styles.treinoAtualHeader}>
                          <Text style={styles.treinoAtualNome}>{nomeTreino}</Text>
                          <TouchableOpacity 
                            style={styles.deleteTreinoAtualButton}
                            onPress={() => handleExcluirTreinoCliente(selectedCliente!.id, nomeTreino)}
                          >
                            <Ionicons name="trash-outline" size={18} color="#FF3B30" />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.treinoAtualExercicios}>
                          {treinosAgrupados[nomeTreino].length} exercícios
                        </Text>
                      </View>
                    ));
                  })()}
                </View>
              )}

              <Text style={styles.selecaoTreinosTitle}>
                Selecione os treinos da biblioteca:
              </Text>

              {treinosPadrao.length === 0 ? (
                <View style={styles.emptyBiblioteca}>
                  <Ionicons name="barbell-outline" size={60} color="#ccc" />
                  <Text style={styles.emptyBibliotecaText}>Nenhum treino na biblioteca</Text>
                  <Text style={styles.emptyBibliotecaSubtext}>Crie treinos na aba Biblioteca</Text>
                </View>
              ) : (
                <View style={styles.treinosPadraoList}>
                  {treinosPadrao.map((treino) => (
                    <TouchableOpacity
                      key={treino.id}
                      style={[
                        styles.treinoPadraoCard,
                        selectedTreinosPadrao.includes(treino.id) && styles.treinoPadraoCardSelected
                      ]}
                      onPress={() => {
                        if (selectedTreinosPadrao.includes(treino.id)) {
                          setSelectedTreinosPadrao(selectedTreinosPadrao.filter(id => id !== treino.id));
                        } else {
                          setSelectedTreinosPadrao([...selectedTreinosPadrao, treino.id]);
                        }
                      }}
                    >
                      <View style={styles.treinoPadraoHeader}>
                        <Ionicons 
                          name={selectedTreinosPadrao.includes(treino.id) ? "checkbox" : "square-outline"}
                          size={24} 
                          color={selectedTreinosPadrao.includes(treino.id) ? "#007AFF" : "#ccc"}
                        />
                        <Text style={styles.treinoPadraoNome}>{treino.nomeTreino}</Text>
                      </View>
                      <Text style={styles.treinoPadraoExercicios}>{treino.exercicios.length} exercícios</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {selectedTreinosPadrao.length > 0 && (
                <TouchableOpacity style={styles.concludeButton} onPress={handleAtribuirTreinos}>
                  <Text style={styles.concludeButtonText}>
                    {isEditMode ? 'Atualizar Treinos' : 'Atribuir Treinos Selecionados'}
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal de Status do Vínculo */}
      <Modal
        visible={showStatusModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowStatusModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Status do Vínculo</Text>
              <TouchableOpacity onPress={() => setShowStatusModal(false)} style={styles.closeButton}>
                <Ionicons name="close" size={28} color="#666" />
              </TouchableOpacity>
            </View>

            {clienteDetalhe && (
              <View style={{ gap: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flex: 1, paddingRight: 12 }}>
                    <Text style={styles.inputLabel}>Aluno</Text>
                    <Text style={styles.modalTitle}>{clienteDetalhe.nome}</Text>
                  </View>
                  <View style={[styles.statusBadge, styles.statusPending]}> 
                    <Ionicons name={clienteDetalhe.linkStatus === 'ACEITO' ? 'checkmark-circle' : clienteDetalhe.linkStatus === 'PENDENTE' ? 'time-outline' : 'unlink'} size={16} color={styles.statusBadgeText.color} />
                    <Text style={styles.statusBadgeText}>{clienteDetalhe.linkStatus || 'SEM_VINCULO'}</Text>
                  </View>
                </View>

                <View style={{ gap: 6 }}>
                  <Text style={styles.inputLabel}>ID</Text>
                  <Text style={styles.clientValue}>{clienteDetalhe.id}</Text>
                  <Text style={styles.inputLabel}>Email</Text>
                  <Text style={styles.clientValue}>{clienteDetalhe.email || 'Não informado'}</Text>
                </View>

                {clienteDetalhe.linkStatus === 'SEM_VINCULO' && (
                  <TouchableOpacity style={styles.concludeButton} onPress={() => handleSolicitarVinculoCliente(clienteDetalhe)}>
                    <Text style={styles.concludeButtonText}>Solicitar vínculo</Text>
                  </TouchableOpacity>
                )}

                {clienteDetalhe.linkStatus === 'PENDENTE' && (
                  <View style={{ gap: 10 }}>
                    <View style={[styles.statusBadge, styles.statusPending, { alignSelf: 'flex-start' }]}> 
                      <Ionicons name="time-outline" size={16} color={styles.statusBadgeText.color} />
                      <Text style={styles.statusBadgeText}>Aguardando resposta do aluno</Text>
                    </View>
                    <TouchableOpacity style={styles.infoButton} onPress={() => handleRemoverVinculoCliente(clienteDetalhe)}>
                      <Ionicons name="close-circle" size={18} color={styles.infoButtonText.color} />
                      <Text style={styles.infoButtonText}>Cancelar pedido</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {clienteDetalhe.linkStatus === 'ACEITO' && (
                  <TouchableOpacity style={styles.infoButton} onPress={() => handleRemoverVinculoCliente(clienteDetalhe)}>
                    <Ionicons name="unlink" size={18} color={styles.infoButtonText.color} />
                    <Text style={styles.infoButtonText}>Remover vínculo</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}