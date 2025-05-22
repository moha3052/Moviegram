import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import Home from "../screens/HomeScreen";
import Create from "../screens/CreateScreen";
import Profile from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon = "";
          icon = "home";
          if (route.name === "hjem") {
            icon = "home";
          }
          if (route.name === "opret") {
            icon = "add-circle";
            size = 30;
          }
          if (route.name === "profil") {
            icon = "person";
          }

          return <Ionicons name={icon} size={size} color={color} />;
        },
        tabBarStyle: {
          height: 75,
          backgroundColor: "#f9f9f9",
          borderTopWidth: 1,
          borderColor: "#e5e7eb",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="hjem"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="opret"
        component={Create}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="profil"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
