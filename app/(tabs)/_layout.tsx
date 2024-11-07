import { Stack } from "expo-router";
import React from 'react';
import { AvatarProvider } from '../context/AvatarContext';


export default function RootLayout() {
  return (
   <AvatarProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }}  />
      <Stack.Screen name="signup" options={{ headerShown: false }}  />
      <Stack.Screen name="home" options={{ headerShown: false }}  />
      <Stack.Screen name="editprofile" options={{ headerShown: false }}  />
      <Stack.Screen name="loginpais" options={{ headerShown: false }}  />
      <Stack.Screen name="initialscreenpais" options={{ headerShown: false }}  />
      <Stack.Screen name="signuppais" options={{ headerShown: false }}  />



    </Stack>
  </AvatarProvider>
  );
}
