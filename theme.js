// Theme configuration for the app
export const lightTheme = {
  mode: 'light',
  primary: '#D2691E', // Brown
  secondary: '#F5DEB3', // Wheat
  background: '#FFFFFF',
  surface: '#F8F8F8',
  border: '#E0E0E0',
  text: '#333333',
  textSecondary: '#666666',
  textTertiary: '#999999',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  info: '#007AFF',
  card: '#FFFFFF',
  notification: '#FF3B30',
  // Add any additional theme properties here
};

export const darkTheme = {
  mode: 'dark',
  primary: '#F5DEB3', // Wheat
  secondary: '#D2691E', // Brown
  background: '#121212',
  surface: '#1E1E1E',
  border: '#333333',
  text: '#FFFFFF',
  textSecondary: '#BBBBBB',
  textTertiary: '#888888',
  error: '#FF453A',
  success: '#30D158',
  warning: '#FF9F0A',
  info: '#0A84FF',
  card: '#1E1E1E',
  notification: '#FF453A',
  // Add any additional theme properties here
};

// Default theme to export
export default {
  light: lightTheme,
  dark: darkTheme,
};
