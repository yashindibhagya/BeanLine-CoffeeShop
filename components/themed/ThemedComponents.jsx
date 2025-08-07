import React from 'react';
import { ActivityIndicator, TextInput as RNTextInput, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export const ThemedView = ({ style, children, ...props }) => {
  const { theme } = useTheme();
  return (
    <View style={[{ backgroundColor: theme.background }, style]} {...props}>
      {children}
    </View>
  );
};

export const ThemedText = ({ style, color, variant = 'body', children, ...props }) => {
  const { theme } = useTheme();
  const textStyles = [
    styles.text,
    { color: color || theme.text },
    theme.typography?.[variant] || {},
    style,
  ];

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
};

export const ThemedButton = ({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  icon,
  isLoading = false,
  disabled = false,
  ...props
}) => {
  const { theme } = useTheme();

  const buttonStyles = [
    styles.button,
    {
      backgroundColor: disabled ? theme.gray400 : theme.primary,
      opacity: disabled ? 0.7 : 1,
    },
    variant === 'outline' && {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.primary,
    },
    variant === 'text' && {
      backgroundColor: 'transparent',
      paddingVertical: 8,
    },
    style,
  ];

  const buttonTextStyles = [
    styles.buttonText,
    {
      color: variant === 'primary' ? '#FFF' : theme.primary,
    },
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFF' : theme.primary} />
      ) : (
        <>
          {React.isValidElement(icon) && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={buttonTextStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export const ThemedTextInput = ({
  style,
  inputStyle,
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: theme.text }]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme.surface,
            borderColor: error ? theme.error : theme.border,
          },
          style,
        ]}
      >
        {React.isValidElement(leftIcon) && (
          <View style={[styles.icon, styles.leftIcon]}>
            {React.cloneElement(leftIcon, {
              size: 20,
              color: theme.textTertiary,
            })}
          </View>
        )}
        <RNTextInput
          style={[
            styles.input,
            {
              color: theme.text,
              paddingLeft: leftIcon ? 40 : 16,
              paddingRight: rightIcon ? 40 : 16,
            },
            inputStyle,
          ]}
          placeholderTextColor={theme.textTertiary}
          {...props}
        />
        {React.isValidElement(rightIcon) && (
          <View style={[styles.icon, styles.rightIcon]}>
            {React.cloneElement(rightIcon, {
              size: 20,
              color: theme.textTertiary,
            })}
          </View>
        )}
      </View>
      {error && (
        <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minHeight: 48,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    position: 'relative',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  leftIcon: {
    left: 12,
  },
  rightIcon: {
    right: 12,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
  },
});
