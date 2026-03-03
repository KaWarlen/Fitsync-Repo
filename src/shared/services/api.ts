import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave para armazenar o token
const TOKEN_KEY = '@fitsync_token';

// Função para buscar o token do AsyncStorage
const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao buscar token:', error);
    return null;
  }
};

// Função para salvar o token
const setToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Erro ao salvar token:', error);
  }
};

// Função para remover o token
const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao remover token:', error);
  }
};

// Configuração da API usando variáveis de ambiente (falha cedo se faltar env)
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error('EXPO_PUBLIC_API_URL não está definida');
}

console.log('API URL configurada:', apiUrl);

const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests - adiciona token automaticamente
api.interceptors.request.use(
  async (config) => {
    // Busca o token do AsyncStorage
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('API Request:', config.method?.toUpperCase(), config.url, token ? '(com token)' : '(sem token)');
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses - trata erros de autenticação
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  async (error) => {
    const status = error.response?.status;
    
    if (status === 401) {
      // Token expirado ou inválido - remove e redireciona
      console.log('Token inválido/expirado - removendo...');
      await removeToken();
      // Aqui você pode redirecionar para login se tiver navegação disponível
    }
    
    console.error('API Response Error:', status, error.config?.url);
    console.error('Detalhes do erro:', error.response?.data);
    
    return Promise.reject(error);
  }
);

export { api, setToken, removeToken };
export default api;