import { View, Text, TouchableOpacity } from "react-native";
import React, { Component, FC } from "react";
import { useNavigation } from "@react-navigation/native";

interface Props {
  titel: String;
  onPress?: () => any;
}

const ButtonComponent: FC<Props> = ({ titel, onPress }) => {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      className="h-12 bg-blue-500 rounded-3xl ml-3 mr-3"
      onPress={onPress}
    >
      <Text className="text-center mt-3 text-white">{titel}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
