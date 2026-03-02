// Shared Types
export interface UserData {
  primeiroNome?: string;
  nomeDoMeio?: string;
  email?: string;
  idade?: string;
  sexo?: string;
  peso?: string;
  altura?: string;
  doenca?: string;
  objetivo?: string;
  nivelAtividade?: string;
  restricoes?: string;
  uid?: string;
  userType?: 'personal' | 'aluno';
  horario?: string;
  focos?: string[];
}

// Navigation Types
export * from './navigation';