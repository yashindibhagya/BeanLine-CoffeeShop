import React from 'react';
import { View, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = ({ style }) => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={toggleTheme}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons 
          name={isDark ? 'weather-sunny' : 'weather-night'} 
          size={24} 
          color={isDark ? '#FFD700' : '#4B5563'} 
        />
      </View>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
        thumbColor={isDark ? '#F3F4F6' : '#F3F4F6'}
        ios_backgroundColor="#E5E7EB"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  iconContainer: {
    marginRight: 8,
  },
});

export default ThemeToggle;
