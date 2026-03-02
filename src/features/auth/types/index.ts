// Auth Types
export interface User {
  uid: string;
  email: string;
  userType: 'personal' | 'aluno';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  primeiroNome: string;
  nomeDoMeio?: string;  
  userType: 'personal' | 'aluno';
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Navigation params for Auth screens  
export interface AuthNavigationParams {
  userType: 'personal' | 'aluno';
}