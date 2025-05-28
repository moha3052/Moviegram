import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { db } from "@/firebase";
import { signOut } from "firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigation } from "expo-router";
import { useState } from "react";

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
  const [values] = useCollection(collection(db, "ratings"));
  const data: Rating[] =
    values?.docs.map((doc) => ({
      ...(doc.data() as Omit<Rating, "id">),
      id: doc.id,
    })) ?? [];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Rating | null>(null);
  const [newRating, setNewRating] = useState("");

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate("login");
    } catch (error) {
      alert("Fejl ved log ud:");
      console.error("Fejl ved log ud:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "ratings", id));
    } catch (error) {
      console.error("Fejl ved sletning:", error);
    }
  };

  const handleUpdate = async () => {
    const rating = parseInt(newRating);

    if (!selectedItem || isNaN(rating) || rating < 0 || rating > 5) {
      alert("Rating skal være et tal mellem 0 og 5.");
      return;
    }

    try {
      await updateDoc(doc(db, "ratings", selectedItem.id), {
        rating,
      });
      setModalVisible(false);
      setSelectedItem(null);
      setNewRating("");
    } catch (error) {
      console.error("Fejl ved opdatering:", error);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-20">
      {/* Top bar */}
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
                onPress={() => {
                  setSelectedItem(item);
                  setModalVisible(true);
                  setNewRating(item.rating.toString());
                }}
                className="bg-blue-500 px-3 py-1 rounded-lg "
              >
                <Text className="text-white">Opdatér</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                className="bg-red-500 px-3 py-1 rounded-lg"
              >
                <Text className="text-white">Slet</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-11/12 p-6 rounded-xl shadow-xl">
            <Text className="text-xl font-bold mb-4 text-gray-800">
              Opdatér rating for "{selectedItem?.title}"
            </Text>

            <TextInput
              className="border border-gray-300 rounded-md p-2 mb-4 text-black"
              keyboardType="numeric"
              value={newRating}
              onChangeText={setNewRating}
              placeholder="Indtast ny rating (1-5)"
            />

            <View className="flex-row justify-end space-x-4">
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setSelectedItem(null);
                  setNewRating("");
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                <Text>Annuller</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleUpdate}
                className="px-4 py-2 bg-green-500 rounded-lg"
              >
                <Text className="text-white">Gem</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ProfileScreen;
