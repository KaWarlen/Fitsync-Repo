import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/AreaTreinador';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export default function BottomNavigation({ activeTab, onTabChange, onLogout }: BottomNavigationProps) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={[styles.navButton, activeTab === 'clientes' && styles.navButtonActive]}
        onPress={() => onTabChange('clientes')}
      >
        <Ionicons 
          name="people" 
          size={28} 
          color={activeTab === 'clientes' ? '#fff' : '#B8B7E8'} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.navButton, activeTab === 'biblioteca' && styles.navButtonActive]}
        onPress={() => onTabChange('biblioteca')}
      >
        <Ionicons 
          name="barbell" 
          size={28} 
          color={activeTab === 'biblioteca' ? '#fff' : '#B8B7E8'} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.navButton, activeTab === 'sair' && styles.navButtonActive]}
        onPress={onLogout}
      >
        <Ionicons 
          name="log-out" 
          size={28} 
          color={'#B8B7E8'} 
        />
      </TouchableOpacity>
    </View>
  );
}