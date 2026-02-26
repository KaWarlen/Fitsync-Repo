import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawerContent(props: any) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={[styles.header, isDarkMode && styles.headerDark]}>
        <Ionicons name="settings" size={40} color={isDarkMode ? '#64b5f6' : '#007AFF'} />
        <Text style={[styles.title, isDarkMode && styles.textDark]}>Configurações</Text>
      </View>
      
      <DrawerItemList {...props} />
      
      <View style={[styles.switchContainer, isDarkMode && styles.switchContainerDark]}>
        <View style={styles.switchLabelContainer}>
          <Ionicons name={isDarkMode ? "moon" : "sunny"} size={24} color={isDarkMode ? '#e0e0e0' : '#666'} />
          <Text style={[styles.switchLabel, isDarkMode && styles.textDark]}>Dark Mode</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#64b5f6' : '#f4f3f4'}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerDark: {
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  textDark: {
    color: '#e0e0e0',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 'auto', // Pushes to the bottom if container is flex: 1 (requires DrawerContentScrollView config), but here it will just sit below items.
  },
  switchContainerDark: {
    borderTopColor: '#333',
  },
  switchLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
});
