import { Text, View, ScrollView, FlatList, Image } from "react-native";
import { db } from "@/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

type Rating = {
  id: string;
  title: string;
  userName: string;
  rating: number;
  createdAt?: {
    toDate: () => Date;
  };
  imageUrl?: string;
  userId: string;
};

function ProfileScreen() {
  const auth = getAuth();
  const [values, load, error] = useCollection(collection(db, "ratings"));
  const data: Rating[] =
    values?.docs.map((doc) => ({
      ...(doc.data() as Omit<Rating, "id">),
      id: doc.id,
    })) ?? [];
  //const data = values?.docs.map((doc) => ({ ...doc.data() , id: doc.id }));

  function Tjek() {
    console.log(data);
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      className="bg-neutral-100"
    >
      <View className="flex-1 items-center bg-gray-200">
        <Text className="text-xl text-left mt-12" onPress={Tjek}>
          hej
        </Text>
        <View className="bg-white h-full mt-12 w-full">
          <FlatList
            data={data?.filter(
              (item) => item.userName === auth.currentUser?.displayName
            )}
            renderItem={({ item }) => (
              <View className="p-4 border-b border-gray-300 flex-row">
                <Image
                  source={{ uri: item.imageUrl }}
                  className="w-16 h-16 rounded-lg mr-4"
                />
                <View className="flex-1">
                  <Text className="text-lg font-bold">{item.title}</Text>
                  <Text className="text-sm text-gray-600">
                    Bruger: {item.userName}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Rating: {item.rating}/5
                  </Text>
                  {item.createdAt?.toDate ? (
                    <Text className="text-xs text-gray-400 mt-1">
                      Oprettet: {item.createdAt.toDate().toLocaleString()}
                    </Text>
                  ) : null}
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;
