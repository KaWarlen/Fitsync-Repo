import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/AreaTreinador';

interface Cliente {
  nome: string;
  email: string;
  telefone: string;
  id: string;
}

interface Exercicio {
  nomeTreino: string;
  nomeExercicio: string;
  area: string;
  peso: string;
  series: string;
  repeticao: string;
  diaSemana: string;
}

interface Treino {
  clienteNome: string;
  clienteId: string;
  exercicios: Exercicio[];
}

interface TreinoPadrao {
  id: string;
  nomeTreino: string;
  exercicios: Exercicio[];
}

export default function AreaTreinador({ navigation }: any) {
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
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    id: ''
  });
  const [treinoFormData, setTreinoFormData] = useState({
    clienteId: '',
    nomeTreino: '',
    nomeExercicio: '',
    area: '',
    peso: '',
    series: '',
    repeticao: '',
    diaSemana: ''
  });

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleAddClient = () => {
    setShowForm(true);
  };

  const handleConcluirCadastro = () => {
    if (formData.nome && formData.email && formData.telefone && formData.id) {
      setClientes([...clientes, { ...formData }]);
      setFormData({ nome: '', email: '', telefone: '', id: '' });
      setShowForm(false);
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

  const handleMontarTreinoCliente = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setSelectedTreinosPadrao([]);
    setShowTreinoForm(true);
  };

  const handleEditarTreino = (cliente: Cliente) => {
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
          clienteNome: selectedCliente.nome,
          clienteId: selectedCliente.id,
          exercicios: exerciciosAtribuidos
        };
        setTreinos(treinosAtualizados);
      } else {
        // Modo criação: adicionar novo treino
        const novoTreino: Treino = {
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
    navigation.navigate('TreinosCliente', { cliente, treinos });
  };

  const handleAdicionarExercicio = () => {
    if (treinoFormData.nomeExercicio && treinoFormData.area && 
        treinoFormData.peso && treinoFormData.series && treinoFormData.repeticao && treinoFormData.diaSemana) {
      
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
      nomeExercicio: exercicio.nomeExercicio,
      area: exercicio.area,
      peso: exercicio.peso,
      series: exercicio.series,
      repeticao: exercicio.repeticao,
      diaSemana: exercicio.diaSemana
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
        const novoTreinoPadrao: TreinoPadrao = {
          id: Date.now().toString(),
          nomeTreino: treinoFormData.nomeTreino,
          exercicios: exerciciosAtuais
        };
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
          <>
            {clientes.length === 0 && !showForm && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>Nenhum Cliente encontrado</Text>
                <Text style={styles.emptyStateText}>e/ou cadastrado</Text>
              </View>
            )}

            {showForm && (
              <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Cadastrar Cliente</Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nome</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.nome}
                    onChangeText={(text) => setFormData({ ...formData, nome: text })}
                    placeholder="Digite o nome"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>E-mail</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    placeholder="Digite o e-mail"
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Telefone</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.telefone}
                    onChangeText={(text) => setFormData({ ...formData, telefone: text })}
                    placeholder="Digite o telefone"
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>ID do Cliente</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.id}
                    onChangeText={(text) => setFormData({ ...formData, id: text })}
                    placeholder="Digite o ID"
                  />
                </View>

                <TouchableOpacity style={styles.concludeButton} onPress={handleConcluirCadastro}>
                  <Text style={styles.concludeButtonText}>Concluir cadastro</Text>
                </TouchableOpacity>
              </View>
            )}

            {!showForm && clientes.length > 0 && (
              <View style={styles.clientsListContainer}>
                {clientes.map((cliente, index) => {
                  const clienteTemTreino = treinos.some(t => t.clienteId === cliente.id);
                  
                  return (
                    <View key={index} style={styles.clientCard}>
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
                      
                      {!clienteTemTreino ? (
                        <TouchableOpacity 
                          style={styles.montarTreinoButton}
                          onPress={() => handleMontarTreinoCliente(cliente)}
                        >
                          <Ionicons name="barbell" size={20} color="#fff" />
                          <Text style={styles.montarTreinoButtonText}>Montar Treino</Text>
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.treinoActionsContainer}>
                          <TouchableOpacity 
                            style={styles.editarTreinoButton}
                            onPress={() => handleEditarTreino(cliente)}
                          >
                            <Ionicons name="create-outline" size={20} color="#fff" />
                            <Text style={styles.editarTreinoButtonText}>Editar</Text>
                          </TouchableOpacity>
                          <TouchableOpacity 
                            style={styles.mostrarTreinoButton}
                            onPress={() => handleMostrarTreino(cliente)}
                          >
                            <Ionicons name="eye-outline" size={20} color="#fff" />
                            <Text style={styles.mostrarTreinoButtonText}>Ver Treino</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            )}

            {!showForm && (
              <TouchableOpacity style={styles.addButton} onPress={handleAddClient}>
                <Text style={styles.addButtonText}>Adicionar Cliente</Text>
              </TouchableOpacity>
            )}
          </>
        )}

        {/* Aba Biblioteca de Treinos */}
        {activeTab === 'biblioteca' && (
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
                  <View key={treinoIndex} style={styles.treinoCard}>
                    <View style={styles.treinoCardHeader}>
                      <Text style={styles.treinoCardTitle}>{treino.nomeTreino}</Text>
                      <View style={styles.treinoCardActions}>
                        <TouchableOpacity 
                          style={styles.editTreinoCardButton}
                          onPress={() => handleEditarTreinoPadrao(treinoIndex)}
                        >
                          <Ionicons name="create-outline" size={20} color="#FF9800" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={styles.deleteTreinoCardButton}
                          onPress={() => handleExcluirTreinoPadrao(treinoIndex)}
                        >
                          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text style={styles.exercicioCount}>{treino.exercicios.length} exercícios</Text>
                    {treino.exercicios.map((exercicio, exIndex) => (
                      <View key={exIndex} style={styles.exercicioItem}>
                        <View style={styles.exercicioItemContent}>
                          <Text style={styles.exercicioText}>{exercicio.nomeExercicio}</Text>
                          <Text style={styles.exercicioDetails}>
                            {exercicio.series}x{exercicio.repeticao} - {exercicio.peso}kg - {exercicio.diaSemana}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {!showBibliotecaForm && (
              <TouchableOpacity style={styles.addButton} onPress={handleAddTreino}>
                <Text style={styles.addButtonText}>Adicionar treino</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navButton, activeTab === 'clientes' && styles.navButtonActive]}
          onPress={() => setActiveTab('clientes')}
        >
          <Ionicons 
            name="people" 
            size={28} 
            color={activeTab === 'clientes' ? '#fff' : '#B8B7E8'} 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navButton, activeTab === 'biblioteca' && styles.navButtonActive]}
          onPress={() => setActiveTab('biblioteca')}
        >
          <Ionicons 
            name="barbell" 
            size={28} 
            color={activeTab === 'biblioteca' ? '#fff' : '#B8B7E8'} 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navButton, activeTab === 'sair' && styles.navButtonActive]}
          onPress={handleLogout}
        >
          <Ionicons 
            name="log-out" 
            size={28} 
            color={'#B8B7E8'} 
          />
        </TouchableOpacity>
      </View>

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
                  {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((dia) => (
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
                      if (!treinosAgrupados[ex.nomeTreino]) {
                        treinosAgrupados[ex.nomeTreino] = [];
                      }
                      treinosAgrupados[ex.nomeTreino].push(ex);
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
    </View>
  );
}
