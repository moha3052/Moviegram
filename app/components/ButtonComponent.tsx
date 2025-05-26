import { Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";

interface Props {
  titel: String;
  onPress?: () => any;
}

const ButtonComponent: FC<Props> = ({ titel, onPress }) => {
  return (
      <TouchableOpacity
          className="bg-blue-600 mx-4 py-3 rounded-xl shadow-md active:bg-blue-700"
          onPress={onPress}
      >
        <Text className="text-white text-center text-lg font-semibold">
          {titel}
        </Text>
      </TouchableOpacity>

  );
};

export default ButtonComponent;
