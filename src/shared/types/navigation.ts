import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { LocalUser } from '../../features/auth/services/local-auth';
import { Treino } from '../../features/training/types';
import { Cliente } from '../../features/training/types';

// Tipos de parâmetros para cada rota (Stack Navigator)
export type RootStackParamList = {
  Inicio: undefined;
  Login: { userType?: 'personal' | 'aluno' };
  Cadastro: { userType?: 'personal' | 'aluno' };
  AreaTreinador: { userData?: LocalUser };
  TelaAluno: { userData?: LocalUser };
  DetalheTreino: { treino: Treino };
  TreinosCliente: { cliente: Cliente; treinos: Treino[] };
};

// Tipos de parâmetros para as abas do aluno (Bottom Tab Navigator)
export type AlunoTabParamList = {
  TreinosTab: undefined;
  PerfilTab: undefined;
  SairTab: undefined;
};

// Props tipadas para cada tela (Stack)
export type InicioProps = NativeStackScreenProps<RootStackParamList, 'Inicio'>;
export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type CadastroProps = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;
export type AreaTreinadorProps = NativeStackScreenProps<RootStackParamList, 'AreaTreinador'>;
export type TelaAlunoProps = NativeStackScreenProps<RootStackParamList, 'TelaAluno'>;
export type DetalheTreinoProps = NativeStackScreenProps<RootStackParamList, 'DetalheTreino'>;
export type TreinosClienteProps = NativeStackScreenProps<RootStackParamList, 'TreinosCliente'>;

// Props tipadas para as abas (Bottom Tab)
export type TreinosTabProps = BottomTabScreenProps<AlunoTabParamList, 'TreinosTab'>;
export type PerfilTabProps = BottomTabScreenProps<AlunoTabParamList, 'PerfilTab'>;
export type SairTabProps = BottomTabScreenProps<AlunoTabParamList, 'SairTab'>;

// Tipo genérico para componentes com navegação
export type NavigationProps = NativeStackScreenProps<RootStackParamList, keyof RootStackParamList>;

// Tipo flexível para componentes compartilhados (usado em múltiplos navegadores)
export type SharedComponentProps = {
  navigation: any;
  route?: any;
};
