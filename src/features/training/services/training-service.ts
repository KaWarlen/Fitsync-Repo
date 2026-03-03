import { Cliente, Treino, TreinoPadrao, Exercicio } from '../types';
import { api } from '../../../shared/services/api';

/**
 * Serviço para gerenciar operações relacionadas a treinos
 */
export class TrainingService {
  
  /**
   * Valida os dados de um cliente antes de salvá-lo
   */
  static validateCliente(cliente: Partial<Cliente>): boolean {
    return !!(cliente.nome && cliente.email && cliente.telefone && cliente.id);
  }

  /**
   * Valida os dados de um exercício
   */
  static validateExercicio(exercicio: Partial<Exercicio>): boolean {
    return !!(
      exercicio.nomeExercicio && 
      exercicio.area && 
      exercicio.peso && 
      exercicio.series && 
      (exercicio.repeticao || exercicio.repeticoes) && 
      exercicio.diaSemana
    );
  }

  /**
   * Agrupa exercícios por dia da semana
   */
  static groupExerciciosByDia(exercicios: Exercicio[]): { [key: string]: Exercicio[] } {
    const grupos: { [key: string]: Exercicio[] } = {};
    
    exercicios.forEach(ex => {
      const dia = ex.diaSemana || 'Sem dia definido';
      if (!grupos[dia]) {
        grupos[dia] = [];
      }
      grupos[dia].push(ex);
    });

    return grupos;
  }

  /**
   * Agrupa exercícios por nome do treino
   */
  static groupExerciciosByTreino(exercicios: Exercicio[]): { [key: string]: Exercicio[] } {
    const grupos: { [key: string]: Exercicio[] } = {};
    
    exercicios.forEach(ex => {
      const nomeTreino = ex.nomeTreino || 'Treino Sem Nome';
      if (!grupos[nomeTreino]) {
        grupos[nomeTreino] = [];
      }
      grupos[nomeTreino].push(ex);
    });

    return grupos;
  }

  /**
   * Verifica se um cliente possui treinos atribuídos
   */
  static clienteTemTreinos(clienteId: string, treinos: Treino[]): boolean {
    return treinos.some(t => t.clienteId === clienteId);
  }

  /**
   * Filtra treinos de um cliente específico (utilitário local)
   */
  static filterTreinosCliente(clienteId: string, treinos: Treino[]): Treino[] {
    return treinos.filter(t => t.clienteId === clienteId);
  }

  /**
   * Cria um objeto de treino padrão (utilitário local)
   */
  static createTreinoPadraoLocal(nomeTreino: string, exercicios: Exercicio[]): TreinoPadrao {
    return {
      id: Date.now().toString(),
      nomeTreino,
      exercicios
    };
  }

  /**
   * Normaliza um exercício para garantir consistência nos dados
   */
  static normalizeExercicio(exercicio: Partial<Exercicio>): Exercicio {
    return {
      id: exercicio.id || Date.now().toString(),
      nomeExercicio: exercicio.nomeExercicio || exercicio.nome || '',
      nome: exercicio.nome || exercicio.nomeExercicio || '',
      nomeTreino: exercicio.nomeTreino || '',
      area: exercicio.area || '',
      peso: exercicio.peso || '',
      series: exercicio.series || '',
      repeticoes: exercicio.repeticoes || exercicio.repeticao || '',
      repeticao: exercicio.repeticao || exercicio.repeticoes || '',
      diaSemana: exercicio.diaSemana || '',
      descanso: exercicio.descanso,
      observacoes: exercicio.observacoes,
      concluido: exercicio.concluido || false
    };
  }

  /**
   * Calcula estatísticas de progresso de um treino
   */
  static calculateProgress(exercicios: Exercicio[]): { total: number; concluidos: number; percentual: number } {
    const total = exercicios.length;
    const concluidos = exercicios.filter(ex => ex.concluido).length;
    const percentual = total > 0 ? Math.round((concluidos / total) * 100) : 0;

    return { total, concluidos, percentual };
  }

  // MÉTODOS DE API - Comunicação com o backend

  /**
   * Busca todos os clientes do treinador
   */
  static async getClientes(): Promise<Cliente[]> {
    const response = await api.get('/clientes');
    return response.data;
  }

  /**
   * Cria um novo cliente
   */
  static async createCliente(cliente: Omit<Cliente, 'id'>): Promise<Cliente> {
    const response = await api.post('/clientes', cliente);
    return response.data;
  }

  /**
   * Busca treinos de um cliente específico
   */
  static async getTreinosCliente(clienteId: string): Promise<Treino[]> {
    const response = await api.get(`/clientes/${clienteId}/treinos`);
    return response.data;
  }

  /**
   * Cria um novo treino para um cliente
   */
  static async createTreino(treino: Omit<Treino, 'id'>): Promise<Treino> {
    const response = await api.post('/treinos', treino);
    return response.data;
  }

  /**
   * Atualiza um treino existente
   */
  static async updateTreino(treinoId: string, treino: Partial<Treino>): Promise<Treino> {
    const response = await api.put(`/treinos/${treinoId}`, treino);
    return response.data;
  }

  /**
   * Busca todos os treinos padrão (biblioteca)
   */
  static async getTreinosPadrao(): Promise<TreinoPadrao[]> {
    const response = await api.get('/treinos-padrao');
    return response.data;
  }

  /**
   * Cria um novo treino padrão
   */
  static async createTreinoPadrao(treino: Omit<TreinoPadrao, 'id'>): Promise<TreinoPadrao> {
    const response = await api.post('/treinos-padrao', treino);
    return response.data;
  }

  // -----------------------------
  // VÍNCULOS PERSONAL/ALUNO
  // -----------------------------

  /**
   * Lista alunos vinculados ao personal autenticado (status ACEITO)
   */
  static async getAlunosVinculados(): Promise<Cliente[]> {
    const response = await api.get('/users/alunos');
    return response.data;
  }

  /**
   * Solicita vínculo com um aluno (gera status PENDENTE no backend)
   */
  static async requestVinculo(alunoId: string): Promise<any> {
    const response = await api.patch('/users/link/request', { alunoId });
    return response.data;
  }

  /**
   * Remove vínculo existente (status ACEITO) com um aluno
   */
  static async removeVinculo(alunoId: string): Promise<any> {
    const response = await api.patch('/users/link/remove', { alunoId });
    return response.data;
  }

  /**
   * Busca um aluno específico (personal autenticado)
   */
  static async getAlunoById(alunoId: string): Promise<Cliente> {
    const response = await api.get(`/users/aluno/${alunoId}`);
    return response.data;
  }

  /**
   * Para ALUNO: obtém solicitação pendente (se existir)
   */
  static async getPendingLink(): Promise<any> {
    const response = await api.get('/users/link/pending');
    return response.data;
  }

  /**
   * Para ALUNO: responde à solicitação de vínculo
   */
  static async respondLink(accept: boolean): Promise<any> {
    const response = await api.patch('/users/link/respond', { accept });
    return response.data;
  }
}