// Training Types
export interface Treino {
  id: string;
  nome: string;
  descricao?: string;
  exercicios: Exercicio[];
  clienteId?: string;
  clienteNome?: string;
  treinadorId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Propriedades opcionais para compatibilidade com componentes mockados
  dia?: string;
  duracao?: string;
  concluido?: boolean;
}

export interface TreinoPadrao {
  id: string;
  nomeTreino: string;
  exercicios: Exercicio[];
}

export interface Exercicio {
  id?: string;
  nomeTreino?: string;
  nomeExercicio: string;
  nome?: string; // alternativo para nomeExercicio
  area?: string;
  peso: string | number;
  series: string | number;
  repeticoes?: string | number;
  repeticao?: string | number; // alternativo para repeticoes
  diaSemana?: string;
  descanso?: number; // segundos
  observacoes?: string;
  concluido?: boolean;
}

export interface Cliente {
  uid?: string;
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  objective?: string;
  level?: 'iniciante' | 'intermediario' | 'avancado';
  linkStatus?: 'SEM_VINCULO' | 'PENDENTE' | 'ACEITO';
}

export interface TrainingSession {
  id: string;
  treinoId: string;
  clienteId: string;
  executedAt: Date;
  exerciciosExecutados: ExercicioExecutado[];
}

export interface ExercicioExecutado {
  exercicioId: string;
  seriesExecutadas: SerieExecutada[];
}

export interface SerieExecutada {
  repeticoes: number;
  peso?: number;
  completed: boolean;
}

// Form Data Types
export interface ClienteFormData {
  nome: string;
  email: string;
  telefone: string;
  id: string;
}

export interface TreinoFormData {
  clienteId: string;
  nomeTreino: string;
  nomeExercicio: string;
  area: string;
  peso: string;
  series: string;
  repeticao: string;
  diaSemana: string;
}