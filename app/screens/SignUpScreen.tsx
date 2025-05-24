import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useNavigation } from "expo-router";

function SignUpScreen() {
  const router = useRouter();
  const navigation: any = useNavigation();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignup = async () => {
    if (!username || !email || !password) {
      // Du kan bruge Alert.alert eller Toast
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
      try {
        addDoc(collection(db, "bruger"), {
          brugernavn: username,
          password: password,
        });
      } catch (error) {
        console.log("fejl i db" + error);
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
            className="bg-white rounded px-4 py-2 mb-4"
            placeholder="Indtast brugernavn"
            value={username}
            onChangeText={setUsername}
          />

          <Text className="text-lg mb-1">Email</Text>
          <TextInput
            className="bg-white rounded px-4 py-2 mb-4"
            placeholder="Indtast email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text className="text-lg mb-1">Adgangskode</Text>
          <TextInput
            className="bg-white rounded px-4 py-2 mb-6"
            placeholder="Indtast adgangskode"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            className="bg-blue-500 py-3 rounded-xl"
            onPress={handleSignup}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Opret konto
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default SignUpScreen;
