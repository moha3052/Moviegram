import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LogInScreen from "../screens/LogInScreen";
import AppNavigation from "./AppNavigation";

const Stack = createNativeStackNavigator();

export class mainNavigator extends Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="login" component={LogInScreen} />
        <Stack.Screen name="app" component={AppNavigation} />
      </Stack.Navigator>
    );
  }
}

export default mainNavigator;
