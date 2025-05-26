import {View, Text, Alert, ScrollView, TouchableOpacity} from "react-native";
import React, { useState } from "react";
import Button from "../components/ButtonComponent";
import TextInput from "../components/TextInputComponent";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "expo-router";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation: any = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Udfyld både e-mail og password");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Logget ind som:", user.displayName);
      navigation.navigate("app");
    } catch (error: any) {
      let message = "";
      if (error.code === "auth/user-not-found") {
        message = "Brugeren findes ikke";
      } else if (error.code === "auth/wrong-password") {
        message = "Forkert password";
      } else if (error.code === "auth/invalid-email") {
        message = "Ugyldig e-mailadresse";
      }
      alert(error);
    }
  };

  const handleSignup = () => {
    navigation.navigate("sign");
  };

  return (
      <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="bg-neutral-100"
      >
        <View className="flex-1 bg-white justify-center items-center px-4">
          <Text className="text-5xl font-bold mb-6 ">Moviegram</Text>
          <View className="bg-gray-200 w-full max-w-md rounded-xl p-6 shadow-md">
            <Text className="text-3xl text-center mb-6">Login</Text>

            <Text className="text-lg mb-1">E-mail</Text>
            <TextInput
                placeholder="Indtast e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <Text className="text-lg mt-3">Adgangskode</Text>
            <TextInput
                placeholder="Indtast adgangskode"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <View className="mt-8">
              <Button titel="Login" onPress={handleLogin} />
            </View>

            <TouchableOpacity onPress={handleSignup} className="mt-4">
              <Text className= "text-center">
                Har du ikke en konto? <Text className="text-blue-500 text-center underline">Opret dig</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

  );
};

export default LogInScreen;
