import { View, Text } from "react-native";
import React, { useState } from "react";
import Button from "../components/ButtonComponent";
import TextInput from "../components/TextInputComponent";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Udfyld både e-mail og password");
      return;
    }
    router.replace("/screens/HomeScreen");
  };

  const handleSignup = () => {
    router.replace("/screens/SignUpScreen");
  };

  return (
    <View className="bg-white justify-center items-center flex-1">
      <Text className="font-bold mb-10 text-5xl">Moviegram</Text>
      <View className=" bg-gray-200 h-3/5 w-96 rounded-xl">
        <Text className="font-semibold text-center mt-5 text-3xl">Login</Text>
        <Text className="mt-14 ml-5 text-xl"> E-mail</Text>
        <TextInput placeholder="E-mail" value={email} onChange={setEmail} />
        <Text className="mt-12 ml-5 text-xl"> password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChange={setPassword}
          secureTextEntry
        />
        <View className="mt-12">
          <Button titel={"login"} onPress={handleLogin} />
        </View>

        <View className="mt-8">
          <Button titel={"SignUp"} onPress={handleSignup} />
        </View>
      </View>
    </View>
  );
};

export default LogInScreen;
