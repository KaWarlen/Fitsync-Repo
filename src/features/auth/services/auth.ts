import { api, setToken, removeToken } from '../../../shared/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUserData, removeUserData } from '../../../shared/services/storage';
import { UserData } from '../../../shared/types';
import { mapProfilePayloadToUserData } from '../../../shared/services/profile';

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

const mapUserResponseToUserData = (user: AuthResponse['user']): UserData => {
  const nameParts = (user.name || '').trim().split(/\s+/).filter(Boolean);
  const [primeiroNome, ...resto] = nameParts;
  return {
    primeiroNome: primeiroNome || user.name || 'Usuário',
    nomeDoMeio: resto.length ? resto.join(' ') : undefined,
    email: user.email,
    uid: user.id,
    userType: user.role === 'PERSONAL' ? 'personal' : 'aluno'
  };
};

const buildUserProfileData = async (user: AuthResponse['user']): Promise<UserData> => {
  const base = mapUserResponseToUserData(user);

  const fetchProfilePayload = async (): Promise<any> => {
    try {
      const viaProfile = await api.get('/users/profile');
      return viaProfile.data || {};
    } catch (error: any) {
      const message = error?.response?.data?.error || error?.message || 'Erro desconhecido';
      console.warn('Falha ao chamar /users/profile, tentando fallback /users/:id:', message);
      const viaId = await api.get(`/users/${user.id}`);
      return viaId.data || {};
    }
  };

  try {
    const payload = await fetchProfilePayload();
    return mapProfilePayloadToUserData(base, payload);
  } catch (error) {
    console.warn('Não foi possível carregar perfil completo do usuário:', error);
    return base;
  }
};

// Serviços de autenticação com sua API
export const AuthAPI = {
  // Login
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data);
    const { token, user } = response.data;
    
    await setToken(token);
    const profileData = await buildUserProfileData(user);
    await saveUserData(profileData);
    console.log('Login realizado com sucesso para:', user.name);
    
    return response.data;
  },

  // Registro
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    const { token, user } = response.data;
    
    await setToken(token);
    const profileData = await buildUserProfileData(user);
    await saveUserData(profileData);
    console.log('Registro realizado com sucesso para:', user.name);
    
    return response.data;
  },

  // Logout (apenas local - sem chamada para servidor)
  async logout(): Promise<void> {
    // Remove token e dados locais
    await Promise.all([
      removeToken(),
      removeUserData()
    ]);
    console.log('Logout realizado - token e perfil removidos');
  },

  // Encerrar conta do usuário autenticado
  async deleteAccount(userId: string): Promise<void> {
    if (!userId) {
      throw new Error('ID do usuário é obrigatório para encerrar a conta');
    }

    await api.delete(`/users/${userId}`);
    await Promise.all([
      removeToken(),
      removeUserData()
    ]);
    console.log('Conta encerrada - dados locais removidos');
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
