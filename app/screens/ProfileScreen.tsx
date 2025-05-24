import { Text, View, ScrollView } from "react-native";

function ProfileScreen() {
  return (
      <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="bg-neutral-100"
      >
          <View className="flex-1 items-center bg-gray-200">
              <Text className="text-xl text-left mt-12">profil</Text>
              <View className="bg-white h-full mt-12 w-full">
                  <Text>hej</Text>
              </View>
          </View>
      </ScrollView>
  );
}

export default ProfileScreen;
