import { View, Text, TextInput } from "react-native";
import React from "react";

const TextInputComponent = ({ ...props }) => {
  return (
    <View className="justify-center h-12 ml-3 mr-3 bg-gray-300 rounded-3xl mt-2 ">
      <TextInput className="w-full h-12 ml-3" {...props} />
    </View>
  );
};

export default TextInputComponent;
