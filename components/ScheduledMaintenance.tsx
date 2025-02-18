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
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type MaintenanceScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MaintenanceDetails">;

interface Maintenance {
  _id: string;
  machinename: string;
  dueDate: string;
  approval: string;
}

const ScheduledMaintenanceList: React.FC = () => {
  const navigation = useNavigation<MaintenanceScreenNavigationProp>();
  const [maintenanceTasks, setMaintenanceTasks] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchScheduledMaintenance = async () => {
    try {
      const response = await axios.get(
        "https://bairaha-app-api.vercel.app/api/scheduled/get-scheduled-maintenance"
      );

     

      // Sort by dueDate (nearest first)
      const sortedMaintenance = response.data.scheduledMaintenance.sort(
        (a: Maintenance, b: Maintenance) =>
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );

      setMaintenanceTasks(sortedMaintenance);
    } catch (error) {
      console.error("Error fetching scheduled maintenance:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchScheduledMaintenance();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchScheduledMaintenance();
  };

  const filteredMaintenance = maintenanceTasks.filter((task) =>
    task.machinename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePress = (task: Maintenance) => {
    navigation.navigate("MaintenanceDetails", { taskId: task._id });
  };

  if (loading && !refreshing) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" color="#0284c7" />
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

      {/* Scrollable maintenance list with pull-to-refresh */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredMaintenance.map((task) => (
          <TouchableOpacity
            key={task._id}
            className="flex-row items-center justify-center mb-2 ml-2"
            onPress={() => handlePress(task)}
          >
            <View className="px-7 py-4 mt-1 rounded-xl w-full bg-blue-500">
              <Text className="text-lg font-bold text-white">
                {task.machinename}
              </Text>
              <Text className="text-sm text-white">
                Scheduled Date: {new Date(task.dueDate).toDateString()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="mt-2">
        <Text className="text-center text-sm text-gray-500">
          — Scroll down for more —
        </Text>
      </View>
    </View>
  );
};

export default ScheduledMaintenanceList;