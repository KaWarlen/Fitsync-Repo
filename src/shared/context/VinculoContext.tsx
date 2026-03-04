import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { TrainingService } from '../../features/training/services';
import { logger } from '../services/logger';
import { connectSocket, disconnectSocket, onSocketEvent, offSocketEvent, setUnauthorizedHandler, getCurrentSocketToken, getSocketInstance } from '../services/socket';
import { getToken, removeToken } from '../services/api';
import { getUserData, removeUserData } from '../services/storage';
import { resetToLogin } from '../navigation/navigationRef';

type VinculoSocketPayload = {
  vinculoId?: string;
  personalId?: string;
  personalName?: string;
  requestedAt?: string;
  personal?: {
    id?: string;
    name?: string;
  };
  createdAt?: string;
  linkId?: string;
  id?: string;
  linkStatus?: string;
  status?: string;
  pending?: boolean;
};

export interface VinculoSolicitacao {
  vinculoId: string;
  personalId: string;
  personalName: string;
  requestedAt?: string;
}

interface RefreshOptions {
  suppressModal?: boolean;
}

interface VinculoContextValue {
  listaDeVinculosPendentes: VinculoSolicitacao[];
  modalVinculoAberto: boolean;
  setModalVinculoAberto: (open: boolean) => void;
  refreshVinculos: (options?: RefreshOptions) => Promise<void>;
}

const VinculoContext = createContext<VinculoContextValue | undefined>(undefined);

export const VinculoProvider = ({ children }: { children: ReactNode }) => {
  const [listaDeVinculosPendentes, setListaDeVinculosPendentes] = useState<VinculoSolicitacao[]>([]);
  const [modalVinculoAberto, setModalVinculoAberto] = useState(false);
  const isHandlingUnauthorized = useRef(false);

  const normalizeSolicitacao = useCallback((entry: VinculoSocketPayload | null | undefined): VinculoSolicitacao | null => {
    if (!entry) {
      return null;
    }

    const personalData = entry.personal || {};
    const hasPersonalData = Boolean(entry.personalId || personalData.id || entry.personalName || personalData.name);
    if (!hasPersonalData) {
      return null;
    }

    const normalizedStatus = (entry.linkStatus || entry.status || '').toString().toUpperCase();
    const pendingFlag = typeof entry.pending === 'boolean' ? entry.pending : undefined;
    const isPendingStatus = normalizedStatus
      ? normalizedStatus === 'PENDENTE' || normalizedStatus === 'PENDING'
      : pendingFlag !== false;

    if (!isPendingStatus) {
      return null;
    }

    const vinculoId =
      entry.vinculoId ||
      entry.linkId ||
      entry.id ||
      `${entry.personalId || personalData.id || 'personal'}_${entry.requestedAt || Date.now()}`;

    return {
      vinculoId,
      personalId: entry.personalId || personalData.id || vinculoId,
      personalName: entry.personalName || personalData.name || 'Personal Trainer',
      requestedAt: entry.requestedAt || entry.createdAt,
    };
  }, []);

  const normalizeResponse = useCallback(
    (data: any): VinculoSolicitacao[] => {
      if (!data) {
        return [];
      }

      if (Array.isArray(data)) {
        return data
          .map((item) => normalizeSolicitacao(item))
          .filter((item): item is VinculoSolicitacao => Boolean(item));
      }

      const single = normalizeSolicitacao(data);
      return single ? [single] : [];
    },
    [normalizeSolicitacao]
  );

  const refreshVinculos = useCallback(
    async (options?: RefreshOptions): Promise<void> => {
      try {
        const token = await getToken();
        if (!token) {
          setListaDeVinculosPendentes([]);
          setModalVinculoAberto(false);
          return;
        }

        const userData = await getUserData();
        if (userData?.userType !== 'aluno') {
          setListaDeVinculosPendentes([]);
          setModalVinculoAberto(false);
          return;
        }

        const response = await TrainingService.getPendingLink();
        const normalized = normalizeResponse(response);
        setListaDeVinculosPendentes(normalized);

        if (normalized.length === 0) {
          setModalVinculoAberto(false);
          return;
        }

        if (!options?.suppressModal) {
          setModalVinculoAberto(true);
        }
      } catch (error) {
        logger.warn('Falha ao atualizar vínculos pendentes:', error);
        if (!options?.suppressModal) {
          setModalVinculoAberto(false);
        }
      }
    },
    [normalizeResponse]
  );

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        const token = await getToken();
        if (cancelled || !token) {
          return;
        }

        const userData = await getUserData();
        if (userData?.userType !== 'aluno') {
          setListaDeVinculosPendentes([]);
          setModalVinculoAberto(false);
          disconnectSocket();
          return;
        }
        try {
          const current = getCurrentSocketToken();
          const instance = getSocketInstance();
          if (current === token && instance && instance.connected) {
            logger.log('Socket já conectado com o mesmo token (aluno), pulando connect');
          } else {
            connectSocket(token);
          }
        } catch (err) {
          logger.log('Erro ao verificar estado do socket antes de conectar (aluno)', err);
          connectSocket(token);
        }
        await refreshVinculos();
      } catch (error) {
        logger.warn('Falha ao iniciar socket de vínculo:', error);
      }
    };

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, [refreshVinculos]);

  useEffect(() => {
    const handleUnauthorized = async () => {
      if (isHandlingUnauthorized.current) {
        return;
      }
      isHandlingUnauthorized.current = true;
      try {
        await Promise.all([removeToken(), removeUserData()]);
      } finally {
        disconnectSocket();
        setListaDeVinculosPendentes([]);
        setModalVinculoAberto(false);
        resetToLogin();
        isHandlingUnauthorized.current = false;
      }
    };

    setUnauthorizedHandler(handleUnauthorized);
    return () => setUnauthorizedHandler(undefined);
  }, []);

  useEffect(() => {
    const handleSocketVinculo = (payload: VinculoSocketPayload) => {
      const normalized = normalizeSolicitacao(payload);
      if (!normalized) {
        return;
      }

      setListaDeVinculosPendentes((prev) => {
        const alreadyExists = prev.some((item) => item.vinculoId === normalized.vinculoId);
        if (alreadyExists) {
          return prev;
        }
        return [normalized, ...prev];
      });
      setModalVinculoAberto(true);
    };

    onSocketEvent('vinculo:recebido', handleSocketVinculo);
    return () => offSocketEvent('vinculo:recebido', handleSocketVinculo);
  }, [normalizeSolicitacao]);

  useEffect(() => {
    const handleReconnect = () => {
      refreshVinculos({ suppressModal: true }).catch(() => undefined);
    };

    onSocketEvent('reconnect', handleReconnect);
    return () => offSocketEvent('reconnect', handleReconnect);
  }, [refreshVinculos]);

  const value = useMemo(
    () => ({
      listaDeVinculosPendentes,
      modalVinculoAberto,
      setModalVinculoAberto,
      refreshVinculos,
    }),
    [listaDeVinculosPendentes, modalVinculoAberto, refreshVinculos]
  );

  return <VinculoContext.Provider value={value}>{children}</VinculoContext.Provider>;
};

export const useVinculo = (): VinculoContextValue => {
  const context = useContext(VinculoContext);
  if (!context) {
    throw new Error('useVinculo deve ser usado dentro de VinculoProvider');
  }
  return context;
};
