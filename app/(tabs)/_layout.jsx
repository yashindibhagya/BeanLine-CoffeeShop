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
      flexDirection: 'row',
      alignItems: 'center',
      width: withTiming(focused ? 120 : 56, { duration: 200 }),
      backgroundColor: withTiming(focused ? '#8BC34A' : 'transparent', { duration: 200 }),
      borderRadius: 28,
      paddingHorizontal: withTiming(focused ? 16 : 0, { duration: 200 }),
      paddingVertical: 0,
      justifyContent: 'center',
    };
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={styles.tabWrapper}
    >
      <Animated.View style={[focused ? styles.activeTabPill : styles.tabContainer, animatedStyle]}>
        <Animated.View style={focused ? styles.activeIconInPill : styles.iconWrapper}>
          {focused
            ? React.isValidElement(children) && children.type !== React.Fragment
              ? React.cloneElement(children, { color: '#fff' })
              : children
            : children}
        </Animated.View>
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
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  activeTabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8BC34A',
    borderRadius: 32,
    paddingHorizontal: 24,
    paddingVertical: 6,
    minWidth: 120,
    height: 56,
    justifyContent: 'center',
    shadowColor: '#8BC34A',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  activeIconInPill: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconWrapper: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  activeIconWrapper: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    elevation: 3,
    shadowColor: '#8BC34A',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  tabLabel: {
    marginLeft: 6,
    fontWeight: '600',
    color: '#fff',
    fontSize: 16,
  },
});