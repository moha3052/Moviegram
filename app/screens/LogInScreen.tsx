import { View, Text } from "react-native";
import React from "react";
import Button from "../components/ButtonComponent";

const LogInScreen = () => {
  return (
    <View className="bg-white justify-center items-center flex-1">
      <Text className="font-bold mb-10 text-5xl">Moviegram</Text>
      <View className=" bg-gray-200 h-3/5 w-96 rounded-xl">
        <Text className="text-3xl text-center mt-5">Log In</Text>

        <Text className="mt-14 ml-5 text-xl"> E-mail</Text>
        <Text className="mt-20 ml-5 text-xl"> password</Text>
        <View className="bg-blue-400">
          <Button titel={"Login"} />
        </View>
      </View>
    </View>
  );
};

export default LogInScreen;
