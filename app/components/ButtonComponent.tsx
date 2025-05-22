import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ButtonComponent = ({ titel }) => {
  return (
    <TouchableOpacity>
      <Text>{titel}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
