import { Stack } from "expo-router";
import { useState } from "react";
import { CartProvider } from '../app/context/CartContext';
import { UserDetailContext } from '../context/UserDetailContext';

export default function RootLayout() {

  const [userDetail, setUserDetail] = useState();
  return (
    <CartProvider>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <Stack screenOptions={{
          headerShown: false
        }}>
        </Stack>
      </UserDetailContext.Provider>
    </CartProvider>
  )
}

{/* 
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import PaymentScreen from "./(tabs)/paymentScreen";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Details"
          component={PaymentScreen}
          options={{ animation: 'slide_from_bottom' }} ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
*/}
