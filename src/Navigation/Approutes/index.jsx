import React from 'react';
import { View, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../Screens/AppScreens/Home';
import ExploreScreen from '../../Screens/AppScreens/Explore';
import NameScreen from '../../Screens/AppScreens/Name';
import ProfileScreen from '../../Screens/AppScreens/Profile';
import ProductDetailsScreen from '../../Screens/AppScreens/Home/ProductDetails'
import { HomeSVG, ProfileSvg, ExploreSvg, NameSvg } from '../../Assets/Svg';
import OnboardScreen3 from '../../Screens/AuthScreens/OnBoarding/Screens/Screen3'
import OnboardScreen4 from '../../Screens/AuthScreens/OnBoarding/Screens/Screen4'
import SimialarProduct from '../../Screens/AppScreens/Home/SimilarProducts'
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
      }}
      initialRouteName='Home'
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ 
    tabBarStyle: { display: 'none' }, 
    detachPreviousScreen: false // Keep the previous screen mounted
  }} />
    </Stack.Navigator>
  );
};

export const TabScreens = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarActiveTintColor: '#ff8e00',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: '#FFFFFF', paddingHorizontal: 10, height: 80 },
      })}
    >
      <Tab.Screen
        name="Home1"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', gap: 10, width: 60 }}>
              <HomeSVG fill={focused ? '#212121' : '#BDBDBD'} />
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', gap: 10, width: 60 }}>
              <ExploreSvg fill={focused ? '#212121' : '#BDBDBD'} />
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="Name"
        component={NameScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', gap: 10, width: 60 }}>
              <NameSvg fill={focused ? '#212121' : '#BDBDBD'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', gap: 10, width: 60 }}>
              <ProfileSvg fill={focused ? '#212121' : '#BDBDBD'} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const Approutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen component={TabScreens} name="TabBar" />
    </Stack.Navigator>
  );
};