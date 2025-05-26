import { View, Text, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { StarIcon } from 'react-native-heroicons/solid';
import { useIsFocused } from '@react-navigation/native'; // 👈 NYT

interface Rating {
    id: string;
    title: string;
    imageUrl: string;
    rating: number;
    userName?: string;
    createdAt?: any;
}

function HomeScreen() {
    const [ratings, setRatings] = useState<Rating[]>([]);
    const isFocused = useIsFocused(); // 👈 brugeren er på HomeScreen

    const fetchRatings = async () => {
        try {
            const q = query(collection(db, "ratings"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Rating[];
            setRatings(data);
        } catch (error) {
            console.error("Fejl ved hentning af ratings: ", error);
        }
    };

    // Hver gang HomeScreen bliver fokuseret, hentes nye ratings
    useEffect(() => {
        if (isFocused) {
            fetchRatings();
        }
    }, [isFocused]); // 👈 trigges hver gang skærmen bliver aktiv

    const renderStars = (count: number) => {
        return (
            <View className="flex-row">
                {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon
                        key={i}
                        size={20}
                        color={i <= count ? '#facc15' : '#d4d4d4'}
                    />
                ))}
            </View>
        );
    };

    const renderItem = ({ item }: { item: Rating }) => (
        <View className="bg-white rounded-2xl shadow-md mb-5 mx-4 p-4">
            <Image
                source={{ uri: item.imageUrl }}
                className="w-full h-96 rounded-xl mb-4"
                resizeMode="cover"
            />
            <Text className="text-xl font-semibold text-neutral-800 mb-1">{item.title}</Text>
            {renderStars(item.rating)}
            <Text className="text-sm text-neutral-500 mt-2">
                Oprettet af: {item.userName || 'Ukendt bruger'}
            </Text>
        </View>
    );

    return (
        <View className="flex-1 bg-neutral-100 pt-20">
            <Text className="text-3xl font-bold text-center text-neutral-800 mb-6">📽️ Bedømmelser</Text>

            <FlatList
                data={ratings}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </View>
    );
}

export default HomeScreen;
