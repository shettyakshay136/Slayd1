import React, { useEffect } from 'react';
import { StatusBar, TouchableOpacity, View, Text, StyleSheet, Touchable } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Approutes } from './Approutes'
import { Authroutes } from './Authroutes';
import { setAuthenticated, logout } from '../Store/authSlice';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("IsAuthenticated:", isAuthenticated);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Retrieve user authentication token or data from AsyncStorage
        const storedUser = await AsyncStorage.getItem('userId');
        if (storedUser) {
          // If valid, update Redux state
          dispatch(setAuthenticated());
        } else {
          // Otherwise, ensure the user is logged out
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuthentication();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.clear();

      // Dispatch logout action to reset Redux state
      dispatch(logout());
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <SafeAreaProvider>
      {/* <TouchableOpacity style={{padding:15,top:60,zIndex:10}} onPress={handleLogout}>
        <Text>logout</Text>
      </TouchableOpacity> */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Stack.Screen name="App" component={Approutes} />
          ) : (
            <Stack.Screen name="Auth" component={Authroutes} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};



const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#ff4d4d',
    borderRadius: 4,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RootNavigator;
