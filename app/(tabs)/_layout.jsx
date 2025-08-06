import { IconSymbol } from '@/components/ui/IconSymbol';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        presentation: 'transparentModal',
        tabBarStyle: {
          position: 'absolute',
          borderRadius: 40,
          marginHorizontal: 20,
          marginBottom: 20,
          backgroundColor: '#fff',
          elevation: 10,
          justifyContent: 'center',
        },
        tabBarButton: (props) => (
          <CustomTabBarButton {...props} routeName={route.name} />
        ),
      })}
    >
      <Tabs.Screen
        name="homeScreen"
        options={{
          tabBarIcon: ({ focused }) => (
            <IconSymbol size={24} name="house.fill" color={focused ? '#D2691E' : '#000'} />
          ),
        }}
      />
      <Tabs.Screen
        name="searchScreen"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons size={24} name="fast-food-sharp" color={focused ? '#D2691E' : '#000'} />
          ),
        }}
      />
      <Tabs.Screen
        name="cartScreen"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="delivery-dining" size={28} color={focused ? '#D2691E' : '#000'} />
          ),
        }}
      />
      <Tabs.Screen
        name="profileScreen"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person" size={24} color={focused ? '#D2691E' : '#000'} />
          ),
        }}
      />
    </Tabs>
  );
}

function CustomTabBarButton({ children, onPress, accessibilityState, routeName }) {
  const focused = accessibilityState?.selected ?? false;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(focused ? 120 : '100%', { duration: 200 }),
      backgroundColor: withTiming(focused ? '#FF6D00' : 'transparent', { duration: 200 }),
    };
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={styles.tabWrapper}
    >
      <Animated.View style={[styles.tabContainer, animatedStyle]}>
        <View style={styles.iconContainer}>
          <View style={focused ? styles.activeIconWrapper : styles.iconWrapper}>
            {children}
          </View>
          {focused && (
            <Text style={styles.tabLabel}>{getLabel(routeName)}</Text>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

function getLabel(routeName) {
  switch (routeName) {
    case 'homeScreen':
      return 'Home';
    case 'searchScreen':
      return 'Explore';
    case 'cartScreen':
      return 'Orders';
    case 'profileScreen':
      return 'Profile';
    default:
      return '';
  }
}

const styles = StyleSheet.create({
  tabWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: 8,
  },
  tabContainer: {
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  iconWrapper: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#D2691E',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 2,
  },
  activeIconWrapper: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    elevation: 3,
    shadowColor: '#FF6D00',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  tabLabel: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 16,
    marginLeft: 4,
  },
});
