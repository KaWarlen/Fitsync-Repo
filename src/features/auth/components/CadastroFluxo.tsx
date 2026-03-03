import React, { useState } from 'react';
import CadastroEtapa1 from './cadastro';
import CadastroEtapa2 from './cadastro2';
import CadastroEtapa3 from './cadastro3';
import { Alert } from 'react-native';
import { AuthAPI } from '../services/auth'; // Nova API
import { CadastroProps } from '../../../shared/types/navigation';

export default function CadastroFluxo({ navigation, route }: CadastroProps) {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [dadosCadastro, setDadosCadastro] = useState({});

  // Recebe userType da tela Login ('personal' ou 'aluno')
  const userType = route?.params?.userType || 'aluno';

  const handleNextEtapa1 = (data: any) => {
    setDadosCadastro({ ...dadosCadastro, ...data });
    
    // Personal vai direto para finalização (não precisa de mais dados)
    if (userType === 'personal') {
      handleFinish({}); // Finaliza com dados da etapa 1 apenas
    } else {
      // Aluno continua para etapa 2
      setEtapaAtual(2);
    }
  };

  const handleNextEtapa2 = (data: any) => {
    setDadosCadastro({ ...dadosCadastro, ...data });
    setEtapaAtual(3);
  };

  const handleFinish = async (data: any) => {
    const dadosCompletos = { ...dadosCadastro, ...data };
    
    try {
      // Validações básicas antes de enviar
      if (!dadosCompletos.primeiroNome?.trim()) {
        Alert.alert('Erro de validação', 'Nome é obrigatório');
        return;
      }
      if (!dadosCompletos.email?.trim()) {
        Alert.alert('Erro de validação', 'Email é obrigatório');  
        return;
      }
      if (!dadosCompletos.senha?.trim()) {
        Alert.alert('Erro de validação', 'Senha é obrigatória');
        return;
      }
      if (!dadosCompletos.telefone?.trim()) {
        Alert.alert('Erro de validação', 'Telefone é obrigatório');
        return;
      }

      // Mapear dados do formulário para o formato da API
      const userData: any = {
        name: `${dadosCompletos.primeiroNome} ${dadosCompletos.nomeDoMeio || ''}`.trim(),
        email: dadosCompletos.email.trim(),
        password: dadosCompletos.senha.trim(),
        phone: dadosCompletos.telefone.replace(/\D/g, ''), // Remove formatação do telefone  
        role: (userType === 'personal' ? 'PERSONAL' : 'ALUNO') as 'PERSONAL' | 'ALUNO',
      };

      // Adicionar campos específicos conforme o tipo de usuário
      if (userType === 'personal') {
        userData.training = dadosCompletos.formacao?.trim() || '';
      } else if (userType === 'aluno') {
        // Só adicionar se os dados existirem
        if (dadosCompletos.idade) userData.age = parseInt(dadosCompletos.idade) || 0;
        if (dadosCompletos.peso) userData.weight = parseFloat(dadosCompletos.peso) || 0;
        if (dadosCompletos.altura) userData.height = parseFloat(dadosCompletos.altura) || 0;
        if (dadosCompletos.doenca !== undefined) userData.illness = dadosCompletos.doenca || '';
        if (dadosCompletos.sexo) userData.sex = mapSexToEnum(dadosCompletos.sexo);
        if (dadosCompletos.horario) userData.time = mapTimeToEnum(dadosCompletos.horario);
        if (dadosCompletos.focos) userData.focus = mapFocusToEnum(dadosCompletos.focos || []);
      }


      // Registrar via API real
      const response = await AuthAPI.register(userData);
      
      console.log(' Usuário registrado:', response.user);
      
      // Navegar para a tela apropriada
      if (response.user.role === 'PERSONAL') {
        navigation.navigate('AreaTreinador', { 
          userData: { 
            email: response.user.email, 
            uid: response.user.id,
            userType: 'personal'
          } 
        });
      } else {
        navigation.navigate('TelaAluno', { 
          userData: { 
            email: response.user.email, 
            uid: response.user.id,
            userType: 'aluno'
          } 
        });
      }
      
    } catch (error: any) {
      console.error(' Erro no cadastro:', error);
      
      let message = 'Erro ao registrar usuário. Tente novamente.';
      
      if (error.response?.status === 400) {
        message = 'Dados inválidos. Verifique os campos preenchidos.';
      } else if (error.response?.status === 409) {
        message = 'Email já cadastrado. Tente fazer login ou use outro email.';
      } else if (!error.response) {
        message = 'Erro de conexão. Verifique sua internet e se a API está rodando.';
      }
      
      Alert.alert('Cadastro falhou', message);
    }
  };

  // Funções auxiliares para mapear valores do form para enums da API
  const mapSexToEnum = (sexo: string) => {
    switch (sexo?.toLowerCase()) {
      case 'masculino': return 'MASCULINO';
      case 'feminino': return 'FEMININO';
      default: return 'OUTRO';
    }
  };

  const mapTimeToEnum = (horario: string) => {
    if (horario?.includes('Manhã')) return 'MANHA';
    if (horario?.includes('Tarde')) return 'TARDE';
    if (horario?.includes('Noite')) return 'NOITE';
    return 'FLEXIVEL';
  };

  const mapFocusToEnum = (focos: string[]) => {
    const mapping: { [key: string]: string } = {
      'Perda de peso': 'PERDA_PESO',
      'Ganho de massa muscular': 'GANHO_MASSA',
      'Condicionamento físico': 'CONDICIONAMENTO',
      'Fortalecimento': 'FORTALECIMENTO',
      'Flexibilidade': 'FLEXIBILIDADE',
      'Saúde geral': 'SAUDE_GERAL'
    };
    
    return focos.map(foco => mapping[foco] || 'SAUDE_GERAL');
  };

  return (
    <>
      {etapaAtual === 1 && (
        <CadastroEtapa1 
          onNext={handleNextEtapa1}
          userType={userType}
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
