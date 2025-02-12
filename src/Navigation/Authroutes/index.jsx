import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import OnBoarding from '../../Screens/AuthScreens/OnBoarding/index'


const Stack = createStackNavigator();

const OnBoardingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export const Authroutes = () => {
  return (
      <Stack.Navigator initialRouteName="OnBoarding">
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
};