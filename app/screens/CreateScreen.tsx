import {Text, View, TextInput, TouchableOpacity, Alert, Image, ScrollView} from "react-native";
import {useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import { StarIcon } from 'react-native-heroicons/solid';
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore"


function CreateScreen() {

    const [title, setTitle] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [rating, setRating] = useState<number>(0);

    const handleSubmit = async () => {
        if (!title || !imageUrl || rating === 0) {
            Alert.alert("Udfyld alle felter", "Du skal indtaste titel, vælge billede og rating.");
            return;
        }

        try {
            // Tilføj et nyt dokument i 'ratings' samlingen
            await addDoc(collection(db, "ratings"), {
                title,
                imageUrl,
                rating,
                createdAt: new Date()
            });

            Alert.alert("Succes", "Din bedømmelse er gemt!");
            setTitle('');
            setImageUrl('');
            setRating(0);

        } catch (error) {
            Alert.alert("Fejl", "Der opstod en fejl under gemning af bedømmelsen.");
            console.error("Error adding document: ", error);
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Tilladelse kræves", "Du skal give adgang til billeder");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUrl(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Tilladelse kræves", "Du skal give adgang til kameraet");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUrl(result.assets[0].uri);
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            className="bg-neutral-100"
        >
            <View className="flex-1 px-5 pt-12 pb-20 mt-28">
                <Text className="text-3xl font-semibold text-neutral-800 mb-6 text-center">Opret bedømmelse</Text>

                {/* Titel */}
                <View className="mb-5">
                    <Text className="text-neutral-700 text-base mb-2">🎬 Film titel</Text>
                    <TextInput
                        className="bg-white border border-neutral-300 rounded-2xl px-4 py-3 text-base shadow-sm"
                        placeholder="Indtast titel"
                        value={title}
                        onChangeText={setTitle}
                        placeholderTextColor="#A3A3A3"
                    />
                </View>

                {/* Billede */}
                <View className="mb-5">
                    <Text className="text-neutral-700 text-base mb-2">🖼️ Vælg billede</Text>
                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            className="flex-1 bg-neutral-200 py-3 rounded-2xl items-center shadow-sm"
                            onPress={pickImage}
                        >
                            <Text className="text-neutral-700">Fra galleri</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-1 bg-neutral-200 py-3 rounded-2xl items-center shadow-sm"
                            onPress={takePhoto}
                        >
                            <Text className="text-neutral-700">Tag billede</Text>
                        </TouchableOpacity>
                    </View>

                    {imageUrl !== "" && (
                        <View className="w-full items-center mt-4">
                            <Image
                                source={{ uri: imageUrl }}
                                className="w-full h-64 rounded-2xl bg-gray-100"
                                resizeMode="contain"
                            />
                        </View>
                    )}
                </View>


                {/* Stjerner */}
                <View className="flex-row justify-center gap-3 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity key={star} onPress={() => setRating(star)}>
                            <StarIcon size={36} color={star <= rating ? '#facc15' : '#d4d4d4'} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Indsend */}
                <TouchableOpacity
                    className="bg-blue-600 py-4 rounded-2xl shadow-md items-center"
                    onPress={handleSubmit}
                >
                    <Text className="text-white font-medium text-lg">✅ Indsend bedømmelse</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

  );
}

export default CreateScreen;
