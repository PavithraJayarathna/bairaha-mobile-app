import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type BreakdownProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Startfixing"
>;

interface Breakdown {
  _id: string;
  description: string;
  status: string;
  scaleofBreakdown: string;
  machinename: string;
  breakdownInformedBy: string;
  maintenanceInformedBy: string;
}

const MyActionsList: React.FC = () => {
  const navigation = useNavigation<BreakdownProfileScreenNavigationProp>();
  const [breakdowns, setBreakdowns] = useState<Breakdown[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { currentUser } = useSelector((state: any) => state.user);

  const fetchBreakdowns = async () => {
    try {
      const response = await axios.get(
        "https://bairaha-app-api.vercel.app/api/machine/get-breakdowns"
      );
      setBreakdowns(response.data.breakdowns);
    } catch (error) {
      console.error("Error fetching breakdowns:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBreakdowns();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBreakdowns();
  };

  const filteredBreakdowns = breakdowns.filter(
    (breakdown) =>
      breakdown.machinename.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (breakdown.breakdownInformedBy === currentUser?.fullname ||
        breakdown.maintenanceInformedBy === currentUser?.fullname)
  );

  const handleBreakdownProfile = (breakdownId: string, status: string) => {
    switch (status) {
      case "Breakdown":
        navigation.navigate("Startfixing", { breakdownID: breakdownId });
        break;
      case "Fixing":
        navigation.navigate("Fixingstatus", { breakdownID: breakdownId });
        break;
      default:
        break;
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getBoxColor = (maintenanceInformedBy: string) => {
    if (maintenanceInformedBy) {
      if (maintenanceInformedBy === currentUser?.fullname) {
        return "#0d6000"; // Green
      }
      return "#D3D3D3"; // Gray
    }
    return "#D3D3D3"; // Default
  };

  if (loading) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" color="#bf111a" />
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row items-center justify-between mb-4 ml-3 mr-3">
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View className="flex-row items-center p-2 mt-3 mb-10 bg-gray-200 rounded-full">
        <EvilIcons
          name="search"
          size={30}
          color="black"
          style={{ marginRight: 10 }}
        />
        <TextInput
          className="flex-1 text-lg"
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Scrollable breakdown list with pull-to-refresh */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredBreakdowns.map((breakdown) => (
          <TouchableOpacity
            key={breakdown._id}
            className="flex-row items-center justify-center mb-2 ml-2"
            onPress={() => handleBreakdownProfile(breakdown._id, breakdown.status)}
          >
            <View
              className="w-full py-4 mt-1 px-7 rounded-xl"
              style={{
                backgroundColor: getBoxColor(breakdown.maintenanceInformedBy),
              }}
            >
              <Text className="text-lg font-bold text-white">
                {breakdown.machinename}
              </Text>
              <Text className="text-sm text-white">Status: {breakdown.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="mt-2">
        <Text className="text-sm text-center text-gray-500">
          — Scroll down for more —
        </Text>
      </View>
    </View>
  );
};

export default MyActionsList;
