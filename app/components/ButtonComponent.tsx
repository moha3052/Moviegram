import { View, Text, TouchableOpacity } from "react-native";
import React, { Component, FC } from "react";
import { useNavigation } from "@react-navigation/native";

interface Props {
  titel: String;
}

const ButtonComponent: FC<Props> = ({ titel }) => {
  const navigation: any = useNavigation();

  const handlePress = () => {
    if (titel.toLowerCase() === "login") {
      navigation.navigate("hjem"); // skærmen skal eksistere i din Stack.Navigator
    }
    // du kan tilføje flere if-statements her for fx "SignUp"
  };

  return (
    <TouchableOpacity
      className="h-12 bg-blue-500 rounded-3xl ml-3 mr-3"
      onPress={handlePress}
    >
      <Text className="text-center mt-3 text-white">{titel}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
