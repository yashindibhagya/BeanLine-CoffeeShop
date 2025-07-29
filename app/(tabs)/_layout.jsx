import { IconSymbol } from '@/components/ui/IconSymbol';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
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
          height: 80,
          borderRadius: 40,
          marginHorizontal: 20,
          marginBottom: 20,
          backgroundColor: '#fff',
          borderTopWidth: 0,
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
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="searchScreen"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="fast-food-sharp" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cartScreen"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="delivery-dining" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profileScreen"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
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
      width: withTiming(focused ? 120 : 50, { duration: 200 }),
      backgroundColor: withTiming(focused ? '#A1DF6F' : '#000', {
        duration: 200,
      }),
      paddingHorizontal: withTiming(focused ? 16 : 0, { duration: 200 }),
    };
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={styles.tabWrapper}
    >
      <Animated.View style={[styles.tabContainer, animatedStyle]}>
        {children}
        {focused && <Text style={styles.tabLabel}>{getLabel(routeName)}</Text>}
      </Animated.View>
    </TouchableOpacity>
  );
}

function getLabel(routeName) {
  switch (routeName) {
    case 'homeScreen':
      return 'Home';
    case 'cartScreen':
      return 'Explore';
    case 'favoriteScreen':
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
  },
  tabContainer: {
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tabLabel: {
    marginLeft: 8,
    fontWeight: '600',
    color: '#fff',
  },
});
