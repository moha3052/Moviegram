import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import React, { useState } from "react";
import TextInput from "../components/TextInputComponent";
import { auth } from "../../firebase";
import Button from "../components/ButtonComponent";
import { useNavigation } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function SignUpScreen() {
  const navigation: any = useNavigation();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const BackToLogin = () => {
    navigation.navigate("login");
  };

  const handleSignup = async () => {
    if (!username || !email || !password) {
      // Du kan bruge Alert.alert eller Toast
      alert("Alle felter skal udfyldes")
      console.warn("Alle felter skal udfyldes");
      return;
    }
    try {
      const UserCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
      }
      navigation.navigate("login");
    } catch (error) {
      alert(error);
    }
  };

  return (
      <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="bg-neutral-100"
      >
        <View className="flex-1 bg-white justify-center items-center px-4">
          <Text className="text-5xl font-bold mb-10">Moviegram</Text>

          <View className="bg-gray-200 w-full max-w-md rounded-xl p-6 shadow-md">
            <Text className="text-3xl text-center mb-6">Sign up</Text>

            <Text className="text-lg mb-1">Brugernavn</Text>
            <TextInput
                placeholder="Indtast brugernavn"
                value={username}
                onChangeText={setUsername}
            />

            <Text className="text-lg mb-1 mt-2">Email</Text>
            <TextInput
                placeholder="Indtast email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <Text className="text-lg mb-1 mt-2">Adgangskode</Text>
            <TextInput
                placeholder="Indtast adgangskode"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <View className=" mt-5">
            <Button  titel={"Opret konto"} onPress={handleSignup}/>
            </View>

            <TouchableOpacity onPress={BackToLogin}>
              <Text className="text-blue-500 text-center mt-4 underline">
                Tilbage til login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
  );
}

export default SignUpScreen;
