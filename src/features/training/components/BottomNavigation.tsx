import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../shared/theme';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  onSettings?: () => void;
  styles: any;
}

export default function BottomNavigation({ activeTab, onTabChange, onLogout, onSettings, styles }: BottomNavigationProps) {
  const { theme } = useTheme();
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={[styles.navButton, activeTab === 'clientes' && styles.navButtonActive]}
        onPress={() => onTabChange('clientes')}
      >
        <Ionicons 
          name="people" 
          size={28} 
          color={activeTab === 'clientes' ? theme.buttonText : theme.iconInactive} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.navButton, activeTab === 'biblioteca' && styles.navButtonActive]}
        onPress={() => onTabChange('biblioteca')}
      >
        <Ionicons 
          name="barbell" 
          size={28} 
          color={activeTab === 'biblioteca' ? theme.buttonText : theme.iconInactive} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.navButton, activeTab === 'settings' && styles.navButtonActive]}
        onPress={onSettings || onLogout}
      >
        <Ionicons 
          name="settings" 
          size={28} 
          color={activeTab === 'settings' ? theme.buttonText : theme.iconInactive} 
        />
      </TouchableOpacity>
    </View>
  );
}