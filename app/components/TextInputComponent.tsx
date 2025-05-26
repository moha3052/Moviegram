import { View, Text, TextInput } from "react-native";
import React from "react";

const TextInputComponent = ({ ...props }) => {
  return (
      <View className="bg-white rounded-xl px-4 py-2 mx-4 mt-3 shadow-sm border border-gray-300">
          <TextInput
              className="text-base text-gray-800"
              placeholderTextColor="#A0AEC0"
              {...props}
          />
      </View>

  );
};

export default TextInputComponent;
