import * as React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import HomeScreen from './screens/home';
import CounterScreen from './screens/counter';
import SettingsScreen from './screens/settings';

import { DarkModeProvider } from './components/darkModeContext';
import Settings from './screens/settings';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <DarkModeProvider>
    <Tab.Navigator 
    initialRouteName='Home' 
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? "footsteps" : "footsteps-outline";
        } else if (route.name === 'Counter') {
          iconName = focused ? "running" : "running";
        } else if (route.name === 'Settings') {
          iconName = focused ? "settings" : "settings-outline";
        }

        if (iconName === 'settings') {
          return <Ionicons name={iconName} size={size} color={color} />;
        } else if (iconName === "running") {
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        } else {
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      },
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Counter" component={CounterScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
    </DarkModeProvider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}