import {Text, View, FlatList, Image, TouchableOpacity} from "react-native";
import { db } from "@/firebase";
import { signOut } from "firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {collection, deleteDoc, doc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigation } from "expo-router";

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
  const navigation: any = useNavigation();
  const [values, load, error] = useCollection(collection(db, "ratings"));
  const data: Rating[] =
    values?.docs.map((doc) => ({
      ...(doc.data() as Omit<Rating, "id">),
      id: doc.id,
    })) ?? [];

  const handleSignOut = async () => {
      try {
          await signOut(auth);
          navigation.navigate("login");
      } catch (error) {
          alert("Fejl ved log ud:")
          console.error("Fejl ved log ud:", error);
      }
  }

    const handleDelete = async (id: any) => {
        // Slet fra database, fx Firestore:
        try {
            await deleteDoc(doc(db, "ratings", id));
            console.log("Slettet:", id);
            // Opdater local state efter sletning
        } catch (error) {
            console.error("Fejl ved sletning:", error);
        }
    };

    const handleUpdate = async (id: any) => {

    }




    return (
      <View className="flex-1 bg-gray-100 px-4 pt-20">
          <View className="flex-row items-center justify-between mb-6 ml-8">
              <Text className="text-2xl font-semibold text-gray-800">
                  Velkommen, {auth.currentUser?.displayName}
              </Text>

              <TouchableOpacity
                  onPress={handleSignOut}
                  className="bg-red-500 px-4 py-2 rounded-xl"
              >
                  <Text className="text-white font-semibold">Log ud</Text>
              </TouchableOpacity>
          </View>

          <Text className="text-xl font-bold text-center mb-4 text-gray-800">
              Mine film bedømmelser
          </Text>

          <FlatList
              data={data?.filter(
                  (item) => item.userName === auth.currentUser?.displayName
              )}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                  <View className="bg-gray-50 rounded-xl p-4 mb-4 shadow-sm">
                      <View className="flex-row mb-2">
                          <Image
                              source={{ uri: item.imageUrl }}
                              className="w-20 h-20 rounded-lg mr-4"
                          />
                          <View className="flex-1 justify-center">
                              <Text className="text-lg font-bold text-gray-800">
                                  {item.title}
                              </Text>
                              <Text className="text-sm text-gray-600">
                                  Bruger: {item.userName}
                              </Text>
                              <Text className="text-sm text-yellow-600">
                                  Rating: {item.rating}/5
                              </Text>
                              {item.createdAt?.toDate ? (
                                  <Text className="text-xs text-gray-400 mt-1">
                                      Oprettet: {item.createdAt.toDate().toLocaleString()}
                                  </Text>
                              ) : null}
                          </View>
                      </View>

                      {/* Knapper */}
                      <View className="flex-row justify-end space-x-2 mt-2">
                          <TouchableOpacity
                              onPress={() => handleUpdate(item)} // Din opdateringsfunktion
                              className="bg-blue-500 px-3 py-1 rounded-lg "
                          >
                              <Text className="text-white">Opdatér</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                              onPress={() => handleDelete(item.id)} // Din slettefunktion
                              className="bg-red-500 px-3 py-1 rounded-lg"
                          >
                              <Text className="text-white">Slet</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              )}
          />
      </View>

  );
}

export default ProfileScreen;
