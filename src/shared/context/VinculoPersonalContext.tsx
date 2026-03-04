import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { connectSocket, disconnectSocket, onSocketEvent, offSocketEvent, setUnauthorizedHandler, getCurrentSocketToken, getSocketInstance } from '../services/socket';
import { getToken, removeToken } from '../services/api';
import { getUserData, removeUserData } from '../services/storage';
import { resetToLogin } from '../navigation/navigationRef';
import { logger } from '../services/logger';

export interface VinculoRespondidoPayload {
  vinculoId?: string;
  alunoId?: string;
  alunoName?: string;
  personalId?: string;
  accepted?: boolean;
  respondedAt?: string;
}

interface VinculoPersonalContextValue {
  respostaVinculo: VinculoRespondidoPayload | null;
  setRespostaVinculo: (payload: VinculoRespondidoPayload | null) => void;
  isOnline: boolean;
}

const VinculoPersonalContext = createContext<VinculoPersonalContextValue | undefined>(undefined);

export const VinculoPersonalProvider = ({ children }: { children: ReactNode }) => {
  const [respostaVinculo, setRespostaVinculo] = useState<VinculoRespondidoPayload | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const isHandlingUnauthorized = useRef(false);

  const refreshSocket = useCallback(async () => {
    const token = await getToken();
    const userData = await getUserData();
    if (!token || userData?.userType !== 'personal') {
      disconnectSocket();
      return;
    }
    try {
      const current = getCurrentSocketToken();
      const instance = getSocketInstance();
      if (current === token && instance && instance.connected) {
        logger.log('Socket já conectado com o mesmo token, pulando connect');
        return;
      }
    } catch (err) {
      logger.log('Erro ao verificar estado do socket antes de conectar', err);
    }

    connectSocket(token);
  }, []);

  useEffect(() => {
    refreshSocket();
  }, [refreshSocket]);

  useEffect(() => {
    const handleUnauthorized = async () => {
      if (isHandlingUnauthorized.current) return;
      isHandlingUnauthorized.current = true;
      try {
        await Promise.all([removeToken(), removeUserData()]);
      } finally {
        disconnectSocket();
        resetToLogin();
        isHandlingUnauthorized.current = false;
      }
    };
    setUnauthorizedHandler(handleUnauthorized);
    return () => setUnauthorizedHandler(undefined);
  }, []);

  useEffect(() => {
    const handleVinculoRespondido = (payload: VinculoRespondidoPayload) => {
      logger.log('Aluno respondeu ao vínculo:', payload);
      setRespostaVinculo(payload);
    };
    onSocketEvent('vinculo:respondido', handleVinculoRespondido);
    return () => offSocketEvent('vinculo:respondido', handleVinculoRespondido);
  }, []);

  useEffect(() => {
    const handleConnect = () => setIsOnline(true);
    const handleDisconnect = () => setIsOnline(false);

    onSocketEvent('connect', handleConnect);
    onSocketEvent('disconnect', handleDisconnect);

    return () => {
      offSocketEvent('connect', handleConnect);
      offSocketEvent('disconnect', handleDisconnect);
    };
  }, []);

  const value = useMemo(() => ({ respostaVinculo, setRespostaVinculo, isOnline }), [respostaVinculo, isOnline]);
  return <VinculoPersonalContext.Provider value={value}>{children}</VinculoPersonalContext.Provider>;
};

export const useVinculoPersonal = (): VinculoPersonalContextValue => {
  const context = useContext(VinculoPersonalContext);
  if (!context) throw new Error('useVinculoPersonal deve ser usado dentro de VinculoPersonalProvider');
  return context;
};
