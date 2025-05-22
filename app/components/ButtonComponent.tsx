import { View, Text, TouchableOpacity } from "react-native";
import React, {FC} from "react";

interface Props {
    titel: string;
}

const ButtonComponent: FC<Props> = ({ titel }) => {
  return (
    <TouchableOpacity>
      <Text>{titel}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
