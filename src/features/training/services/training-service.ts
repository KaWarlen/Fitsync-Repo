import { Cliente, Treino, TreinoPadrao, Exercicio } from '../types';

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
   * Busca treinos de um cliente específico
   */
  static getTreinosCliente(clienteId: string, treinos: Treino[]): Treino[] {
    return treinos.filter(t => t.clienteId === clienteId);
  }

  /**
   * Cria um novo treino padrão
   */
  static createTreinoPadrao(nomeTreino: string, exercicios: Exercicio[]): TreinoPadrao {
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
}