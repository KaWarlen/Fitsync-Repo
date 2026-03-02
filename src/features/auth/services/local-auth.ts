import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves para AsyncStorage
const AUTH_USER_KEY = '@fitsync_auth_user';
const USERS_DATABASE_KEY = '@fitsync_users_db';

// Interface local do usuário (substitui Firebase User)
export interface LocalUser {
  uid: string;
  email: string;
  userType?: 'personal' | 'aluno';
}

// Simulação de resposta do Firebase
interface AuthResult {
  user: LocalUser;
}

// Base de dados local de usuários
interface UserCredentials {
  email: string;
  password: string;
  uid: string;
  userType?: 'personal' | 'aluno';
}

// Gera um UID simples
const generateUID = (): string => {
  return 'local_' + Math.random().toString(36).substr(2, 9) + Date.now();
};

// Carrega base de usuários do AsyncStorage
const getUserDatabase = async (): Promise<UserCredentials[]> => {
  try {
    const data = await AsyncStorage.getItem(USERS_DATABASE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar base de usuários:', error);
    return [];
  }
};

// Salva base de usuários no AsyncStorage
const saveUserDatabase = async (users: UserCredentials[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(USERS_DATABASE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Erro ao salvar base de usuários:', error);
  }
};

// **REGISTRO** - Substitui createUserWithEmailAndPassword
export const registerWithEmail = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const users = await getUserDatabase();
    
    // Verifica se email já existe
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      throw new Error('auth/email-already-in-use');
    }

    // Cria novo usuário
    const uid = generateUID();
    const newUser: UserCredentials = { email, password, uid };
    
    users.push(newUser);
    await saveUserDatabase(users);

    const localUser: LocalUser = { uid, email };
    
    // Salva usuário logado
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(localUser));
    
    return { user: localUser };
  } catch (error: any) {
    // Simula erros do Firebase
    if (error.message === 'auth/email-already-in-use') {
      throw { code: 'auth/email-already-in-use', message: 'E-mail já cadastrado' };
    }
    throw { code: 'auth/unknown', message: 'Erro ao registrar usuário' };
  }
};

// **LOGIN** - Substitui signInWithEmailAndPassword  
export const loginWithEmail = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const users = await getUserDatabase();
    
    // Busca usuário
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('auth/user-not-found');
    }

    const localUser: LocalUser = { 
      uid: user.uid, 
      email: user.email,
      userType: user.userType 
    };
    
    // Salva usuário logado
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(localUser));
    
    return { user: localUser };
  } catch (error: any) {
    // Simula erros do Firebase
    if (error.message === 'auth/user-not-found') {
      throw { code: 'auth/user-not-found', message: 'E-mail ou senha incorretos' };
    }
    throw { code: 'auth/unknown', message: 'Erro ao fazer login' };
  }
};

// **LOGOUT** - Substitui signOut
export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(AUTH_USER_KEY);
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};

// **OBSERVER** - Substitui onAuthStateChanged  
export const observeAuth = async (callback: (user: LocalUser | null) => void): Promise<void> => {
  try {
    const userData = await AsyncStorage.getItem(AUTH_USER_KEY);
    const user = userData ? JSON.parse(userData) : null;
    callback(user);
  } catch (error) {
    console.error('Erro ao observar auth:', error);
    callback(null);
  }
};

// **USUÁRIO ATUAL** - Nova função para pegar usuário logado
export const getCurrentUser = async (): Promise<LocalUser | null> => {
  try {
    const userData = await AsyncStorage.getItem(AUTH_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    return null;
  }
};

// **UTILITÁRIO** - Limpa toda base de dados (para desenvolvimento)
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([AUTH_USER_KEY, USERS_DATABASE_KEY]);
    console.log('Base de dados local limpa');
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
  }
};