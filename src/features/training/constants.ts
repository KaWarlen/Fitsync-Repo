// Training Constants

export const DIAS_SEMANA = [
  'Segunda',
  'Terça', 
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo'
] as const;

export const DIAS_SEMANA_ABREV = [
  'Seg',
  'Ter',
  'Qua', 
  'Qui',
  'Sex',
  'Sáb',
  'Dom'
] as const;

export const AREAS_TREINO = [
  'Peito',
  'Costas',
  'Ombros',
  'Braços',
  'Pernas',
  'Glúteos',
  'Abdômen',
  'Cardio',
  'Funcional'
] as const;

export const NIVEIS_CLIENTE = [
  'iniciante',
  'intermediario', 
  'avancado'
] as const;

export const TIPO_PESO = [
  'kg',
  'lbs',
  'corporal'
] as const;

export const DEFAULT_DESCANSO = {
  FORCA: 180, // 3 minutos
  HIPERTROFIA: 90, // 1.5 minutos
  RESISTENCIA: 60, // 1 minuto
  CARDIO: 30 // 30 segundos
} as const;

export const CORES_PROGRESSO = {
  NAO_INICIADO: '#E0E0E0',
  EM_PROGRESSO: '#FFC107',
  CONCLUIDO: '#4CAF50'
} as const;