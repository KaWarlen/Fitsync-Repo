import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DATA_KEY = '@fitsync_user_data';

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
  userType?: string;
  horario?: string;
  focos?: string[];
}

//Create
export const saveUserData = async (data: UserData): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados do usuário:', error);
    throw error;
  }
};
//Read
export const getUserData = async (): Promise<UserData | null> => {
  try {
    const data = await AsyncStorage.getItem(USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao ler dados do usuário:', error);
    return null;
  }
};

