import { View, Text } from "react-native";
import React from "react";
import Button from "../components/ButtonComponent";
import TextInput from "../components/TextInputComponent";

const LogInScreen = () => {
  return (
    <View className="bg-white justify-center items-center flex-1">
      <Text className="font-bold mb-10 text-5xl">Moviegram</Text>
      <View className=" bg-gray-200 h-3/5 w-96 rounded-xl">
        <Text className="font-semibold text-center mt-5 text-3xl">Login</Text>
        <Text className="mt-14 ml-5 text-xl"> E-mail</Text>
        <TextInput placeholder="E-mail" />
        <Text className="mt-12 ml-5 text-xl"> password</Text>
        <TextInput placeholder="Password" secureTextEntry />
        <View className="mt-12">
          <Button titel={"login"} />
        </View>
        <View className="mt-8">
          <Button titel={"SignUp"} />
        </View>
      </View>
    </View>
  );
};

export default LogInScreen;
