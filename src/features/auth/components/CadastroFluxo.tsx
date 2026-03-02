import React, { useState } from 'react';
import CadastroEtapa1 from './cadastro';
import CadastroEtapa2 from './cadastro2';
import CadastroEtapa3 from './cadastro3';
import { Alert } from 'react-native';
import { registerWithEmail } from '../services/auth';
import { saveUserData } from '../../../shared/services/storage';

export default function CadastroFluxo({ navigation, route }: any) {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [dadosCadastro, setDadosCadastro] = useState({});

  // Recebe userType da tela Login ('personal' ou 'aluno')
  const userType = route?.params?.userType || 'aluno';

  const handleNextEtapa1 = (data: any) => {
    setDadosCadastro({ ...dadosCadastro, ...data });
    setEtapaAtual(2);
  };

  const handleNextEtapa2 = (data: any) => {
    setDadosCadastro({ ...dadosCadastro, ...data });
    setEtapaAtual(3);
  };

  const handleFinish = (data: any) => {
    const dadosCompletos = { ...dadosCadastro, ...data };
    // Registra usuário no sistema local (AsyncStorage)
    const { email, senha } = dadosCompletos as any;
    if (email && senha) {
      registerWithEmail(email, senha)
        .then(async ({ user }) => {
          const userData = { ...dadosCompletos, uid: user.uid, userType };
          // Salvar dados no AsyncStorage
          await saveUserData(userData);
          const destino = userType === 'personal' ? 'AreaTreinador' : 'TelaAluno';
          navigation.navigate(destino, { userData });
        })
        .catch((err) => {
          const code = err?.code || 'unknown';
          const message = err?.message || 'Erro ao registrar usuário';
          Alert.alert(`Registro falhou (${code})`, message);
        });
    } else {
      // Se não houver email/senha, navega mesmo assim
      navigation.navigate('TelaAluno', { userData: dadosCompletos });
    }
  };

  return (
    <>
      {etapaAtual === 1 && (
        <CadastroEtapa1 
          onNext={handleNextEtapa1}
        />
      )}
      {etapaAtual === 2 && (
        <CadastroEtapa2 
          onNext={handleNextEtapa2}
          onBack={() => setEtapaAtual(1)}
        />
      )}
      {etapaAtual === 3 && (
        <CadastroEtapa3 
          onFinish={handleFinish}
          onBack={() => setEtapaAtual(2)}
        />
      )}
    </>
  );
}
