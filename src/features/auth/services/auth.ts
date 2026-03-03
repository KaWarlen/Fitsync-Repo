import { api, setToken, removeToken } from '../../../shared/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipos para a API
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'PERSONAL' | 'ALUNO';
  
  // Campo específico do Personal
  training?: string;
  
  // Campos específicos do Aluno
  age?: number;
  weight?: number;
  height?: number;
  illness?: string;
  sex?: 'MASCULINO' | 'FEMININO' | 'OUTRO';
  time?: 'MANHA' | 'TARDE' | 'NOITE' | 'FLEXIVEL';
  focus?: string[];
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;      // API retorna "name" não "nome"
    email: string;
    role: 'PERSONAL' | 'ALUNO';  // API retorna "role" não "tipo"
    createdAt: string;
  };
}

// Serviços de autenticação com sua API
export const AuthAPI = {
  // Login
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data);
    const { token, user } = response.data;
    
    // Salva o token automaticamente
    await setToken(token);
    console.log('Login realizado com sucesso para:', user.name);
    
    return response.data;
  },

  // Registro
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    const { token, user } = response.data;
    
    // Salva o token automaticamente
    await setToken(token);
    console.log('Registro realizado com sucesso para:', user.name);
    
    return response.data;
  },

  // Logout (apenas local - sem chamada para servidor)
  async logout(): Promise<void> {
    // Remove o token local
    await removeToken();
    console.log('Logout realizado - token removido');
  },

  // Verificar se está logado (verifica se tem token válido)
  async isLoggedIn(): Promise<boolean> {
    try {
      // Verifica se tem token salvo localmente
      // Futuramente pode implementar validação no servidor quando a rota estiver disponível
      const token = await AsyncStorage.getItem('@fitsync_token');
      return !!token;
    } catch {
      await removeToken(); // Remove token inválido
      return false;
    }
  }
};

// Sistema de autenticação local (AsyncStorage)
export * from './local-auth';
