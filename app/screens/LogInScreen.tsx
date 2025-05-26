import { View, Text, Alert, ScrollView} from "react-native";
import React, { useState } from "react";
import Button from "../components/ButtonComponent";
import TextInput from "../components/TextInputComponent";
import { useRouter } from "expo-router";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "expo-router";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
        <View className="bg-white justify-center items-center flex-1">
          <Text className="font-bold mb-10 text-5xl">Moviegram</Text>
          <View className=" bg-gray-200 h-3/5 w-96 rounded-xl">
            <Text className="font-semibold text-center mt-5 text-3xl">Login</Text>
            <Text className="mt-14 ml-5 text-xl"> E-mail</Text>
            <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} />
            <Text className="mt-12 ml-5 text-xl"> password</Text>
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                type="password"
            />

            <View className="mt-12">
              <Button titel={"login"} onPress={handleLogin} />
            </View>
            <View className="mt-8">
              <Button titel={"SignUp"} onPress={handleSignup} />
            </View>
          </View>
        </View>
      </ScrollView>
  );
};

export default LogInScreen;
