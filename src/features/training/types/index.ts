// Training Types
export interface Treino {
  id: string;
  nome: string;
  descricao: string;
  exercicios: Exercicio[];
  clienteId?: string;
  treinadorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercicio {
  id: string;
  nome: string;
  series: number;
  repeticoes: number;
  peso?: number;
  descanso?: number; // segundos
  observacoes?: string;
}

export interface Cliente {
  uid: string;
  nome: string;
  email: string;
  objective: string;
  level: 'iniciante' | 'intermediario' | 'avancado';
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