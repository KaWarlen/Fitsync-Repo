export interface ThemeColors {
  // Cores principais
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  // Backgrounds
  background: string;
  backgroundSecondary: string;
  card: string;
  
  // Textos
  text: string;
  textSecondary: string;
  textTertiary: string;
  buttonText: string;
  
  // Bordas e divisores
  border: string;
  divider: string;
  
  // Inputs
  inputBackground: string;
  inputBorder: string;
  inputPlaceholder: string;
  
  // Ícones
  icon: string;
  iconSecondary: string;
  iconInactive: string;
  
  // Estados
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Sombras
  shadow: string;
  
  // Tab bar
  tabActive: string;
  tabInactive: string;
  tabBackground: string;
}

export const lightTheme: ThemeColors = {
  // Cores principais
  primary: '#007AFF',
  primaryLight: '#E3F2FD',
  primaryDark: '#0051D5',
  
  // Backgrounds
  background: '#f5f5f5',
  backgroundSecondary: '#ffffff',
  card: '#ffffff',
  
  // Textos
  text: '#333333',
  textSecondary: '#666666',
  textTertiary: '#999999',
  buttonText: '#ffffff',
  
  // Bordas e divisores
  border: '#e0e0e0',
  divider: '#f0f0f0',
  
  // Inputs
  inputBackground: '#ffffff',
  inputBorder: '#e0e0e0',
  inputPlaceholder: '#999999',
  
  // Ícones
  icon: '#333333',
  iconSecondary: '#666666',
  iconInactive: '#999999',
  
  // Estados
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Sombras
  shadow: '#000000',
  
  // Tab bar
  tabActive: '#007AFF',
  tabInactive: '#999999',
  tabBackground: '#D3D3D3',
};

export const darkTheme: ThemeColors = {
  // Cores principais
  primary: '#0A84FF',
  primaryLight: '#1C1C1E',
  primaryDark: '#0051D5',
  
  // Backgrounds
  background: '#000000',
  backgroundSecondary: '#1C1C1E',
  card: '#2C2C2E',
  
  // Textos
  text: '#FFFFFF',
  textSecondary: '#AEAEB2',
  textTertiary: '#8E8E93',
  buttonText: '#FFFFFF',
  
  // Bordas e divisores
  border: '#38383A',
  divider: '#2C2C2E',
  
  // Inputs
  inputBackground: '#1C1C1E',
  inputBorder: '#38383A',
  inputPlaceholder: '#8E8E93',
  
  // Ícones
  icon: '#FFFFFF',
  iconSecondary: '#AEAEB2',
  iconInactive: '#8E8E93',
  
  // Estados
  success: '#30D158',
  warning: '#FF9F0A',
  error: '#FF453A',
  info: '#0A84FF',
  
  // Sombras
  shadow: '#000000',
  
  // Tab bar
  tabActive: '#0A84FF',
  tabInactive: '#8E8E93',
  tabBackground: '#1C1C1E',
};
