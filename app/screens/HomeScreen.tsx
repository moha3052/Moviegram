import { Text, View,ScrollView } from "react-native";

function HomeScreen() {
  return (
      <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="bg-neutral-100"
      >
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl">Hjem - Se opslag</Text>
    </View>
          </ScrollView>
  );
}

export default HomeScreen;
