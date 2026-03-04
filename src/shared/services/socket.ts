import { io, Socket } from 'socket.io-client';
import { logger } from './logger';

const SOCKET_URL = process.env.EXPO_PUBLIC_API_URL;

type SocketEventHandler = (...args: any[]) => void;
type ListenerEntry = { event: string; handler: SocketEventHandler };

let socket: Socket | null = null;
let currentToken: string | null = null;
let unauthorizedHandler: (() => void) | null = null;
const persistentListeners: ListenerEntry[] = [];

const registerPersistentListener = (event: string, handler: SocketEventHandler): void => {
  const alreadyRegistered = persistentListeners.some(
    (listener) => listener.event === event && listener.handler === handler
  );
  if (!alreadyRegistered) {
    persistentListeners.push({ event, handler });
  }
};

const detachPersistentListener = (event: string, handler: SocketEventHandler): void => {
  const index = persistentListeners.findIndex(
    (listener) => listener.event === event && listener.handler === handler
  );
  if (index !== -1) {
    persistentListeners.splice(index, 1);
  }
};

const attachListenersToSocket = (): void => {
  if (!socket) {
    return;
  }
  persistentListeners.forEach(({ event, handler }) => {
    socket?.on(event, handler);
  });
};

const handleUnauthorized = (): void => {
  if (unauthorizedHandler) {
    unauthorizedHandler();
  }
};

const isUnauthorizedError = (error: any): boolean => {
  if (!error) {
    return false;
  }

  const status = error?.data?.status ?? error?.status ?? error?.code;
  if (status === 401 || status === '401') {
    return true;
  }

  const message = typeof error?.message === 'string' ? error.message.toLowerCase() : '';
  return message.includes('jwt') || message.includes('unauthorized') || message.includes('token');
};

export const connectSocket = (token?: string): Socket | null => {
  const authToken = token?.trim();
  logger.log('Chamando connectSocket');
  logger.log('connectSocket token present:', Boolean(authToken));

  if (!authToken) {
    logger.warn('Tentativa de conectar socket sem token válido.');
    return null;
  }

  if (!SOCKET_URL) {
    logger.warn('EXPO_PUBLIC_API_URL não está definida. Socket não será inicializado.');
    return null;
  }

  if (socket) {
    if (currentToken !== authToken) {
      currentToken = authToken;
      socket.auth = { token: authToken };
      if (socket.connected) {
        socket.disconnect();
      }
      socket.connect();
    } else if (!socket.connected) {
      socket.connect();
    }
    return socket;
  }

  socket = io(SOCKET_URL, {
    transports: ['websocket'],
    autoConnect: false,
    auth: { token: authToken },
    reconnection: true,
    reconnectionAttempts: Infinity,
  });

  currentToken = authToken;
  socket.on('connect', () => {
    logger.log('Socket conectado', socket?.id);
  });

  socket.on('disconnect', (reason) => {
    logger.log('Socket desconectado', reason);
  });

  socket.on('connect_error', (error) => {
    logger.error('Erro de conexão do socket:', error?.message || error);
    if (isUnauthorizedError(error)) {
      handleUnauthorized();
    }
  });

  socket.on('reconnect_attempt', () => {
    if (socket && currentToken) {
      socket.auth = { token: currentToken };
    }
  });

  attachListenersToSocket();
  socket.connect();

  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
    currentToken = null;
  }
};

export const onSocketEvent = (event: string, handler: SocketEventHandler): (() => void) => {
  registerPersistentListener(event, handler);
  if (socket) {
    socket.on(event, handler);
  }

  return () => offSocketEvent(event, handler);
};

export const offSocketEvent = (event: string, handler: SocketEventHandler): void => {
  detachPersistentListener(event, handler);
  if (socket) {
    socket.off(event, handler);
  }
};

export const setUnauthorizedHandler = (handler?: () => void): void => {
  unauthorizedHandler = handler || null;
};

export const getSocketInstance = (): Socket | null => socket;
export const getCurrentSocketToken = (): string | null => currentToken;
export const isSocketConnected = (): boolean => Boolean(socket && socket.connected);