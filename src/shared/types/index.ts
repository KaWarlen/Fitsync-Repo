// Shared Types
export interface LinkedStudentSummary {
  id?: string;
  name?: string;
  email?: string;
  linkStatus?: string;
}

export interface PersonalInfo {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
}

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
  training?: string;
  linkStatus?: string;
  personal?: PersonalInfo;
  linkedStudents?: LinkedStudentSummary[];
}

// Navigation Types
export * from './navigation';