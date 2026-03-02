// Funções de validação de formulários

/**
 * Valida formato de email
 * @param email - Email a ser validado
 * @returns true se email é válido
 */
export const validateEmail = (email: string): boolean => {
  if (!email || email.trim() === '') {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Valida força de senha
 * @param password - Senha a ser validada
 * @returns true se senha atende requisitos mínimos
 */
export const validatePassword = (password: string): boolean => {
  return !!(password && password.length >= 6);
};

/**
 * Valida se string não está vazia
 * @param value - Valor a ser validado
 * @returns true se não está vazio
 */
export const validateRequired = (value: string): boolean => {
  return value !== null && value !== undefined && value.trim() !== '';
};

/**
 * Valida idade
 * @param idade - Idade em string
 * @returns true se é um número válido entre 10 e 120
 */
export const validateAge = (idade: string): boolean => {
  const num = parseInt(idade, 10);
  return !isNaN(num) && num >= 10 && num <= 120;
};

/**
 * Valida peso
 * @param peso - Peso em string
 * @returns true se é um número válido entre 20 e 300
 */
export const validateWeight = (peso: string): boolean => {
  const num = parseFloat(peso);
  return !isNaN(num) && num >= 20 && num <= 300;
};

/**
 * Valida altura
 * @param altura - Altura em string (metros)
 * @returns true se é válida entre 0.5 e 2.5m
 */
export const validateHeight = (altura: string): boolean => {
  const num = parseFloat(altura);
  return !isNaN(num) && num >= 0.5 && num <= 2.5;
};

/**
 * Retorna mensagem de erro para email inválido
 */
export const getEmailErrorMessage = (email: string): string => {
  if (!email || email.trim() === '') {
    return 'Email é obrigatório';
  }
  if (!validateEmail(email)) {
    return 'Digite um email válido (exemplo: usuario@email.com)';
  }
  return '';
};

/**
 * Retorna mensagem de erro para senha inválida
 */
export const getPasswordErrorMessage = (password: string): string => {
  if (!password) {
    return 'Senha é obrigatória';
  }
  if (password.length < 6) {
    return 'A senha deve ter pelo menos 6 caracteres';
  }
  return '';
};
