// Sistema de logging centralizado
// Em produção, os logs são silenciados e podem ser enviados para serviços como Sentry

const isDev = __DEV__;

/**
 * Sistema de logging que só exibe em desenvolvimento
 * Em produção, pode enviar para serviços de monitoramento
 */
export const logger = {
  /**
   * Log informativo (apenas em desenvolvimento)
   */
  log: (...args: any[]) => {
    if (isDev) {
      console.log('[INFO]', ...args);
    }
  },

  /**
   * Log de erro (sempre registrado, pode enviar para Sentry/Crashlytics)
   */
  error: (...args: any[]) => {
    if (isDev) {
      console.error('[ERROR]', ...args);
    }
    // TODO: Em produção, enviar para Sentry/Firebase Crashlytics
    // if (!isDev) {
    //   Sentry.captureException(args[0]);
    // }
  },

  /**
   * Log de aviso
   */
  warn: (...args: any[]) => {
    if (isDev) {
      console.warn('[WARN]', ...args);
    }
  },

  /**
   * Log de debug (apenas em desenvolvimento)
   */
  debug: (...args: any[]) => {
    if (isDev) {
      console.log('[DEBUG]', ...args);
    }
  }
};
