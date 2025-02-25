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
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";


type MaintenanceScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BarcodeScannerScreen"
>;

interface Maintenance {
  _id: string;
  machinename: string;
  dueDate: string;
  approval: string;
}

const MachineScheduleMaintenance: React.FC = () => {
  const navigation = useNavigation<MaintenanceScreenNavigationProp>();
  const route = useRoute();
  const { machineName } = route.params as {machineName: String};
  const [maintenanceTasks, setMaintenanceTasks] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const [notificationCount, setNotificationCount] = useState(1);

  const fetchScheduledMaintenance = async () => {
    try {
      const response = await axios.get(
        "https://bairaha-app-api.vercel.app/api/scheduled/get-scheduled-maintenance"
      );

      const machineMaintenance = response.data.scheduledMaintenance.filter(
        (task: Maintenance) => task.machinename === machineName
      );

      // Sort by dueDate (nearest first)
      const sortedMaintenance = machineMaintenance.sort(
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

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenScanner = () => {
    navigation.navigate('BarcodeScannerScreen');
  };

  const handlePress = (task: Maintenance) => {
    navigation.navigate("MaintenanceDetails", {
      taskId: task._id,
      machineId: task._id,
      machineName: task.machinename,
      isMaintenance: true,
    });
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
      <View className="flex-row items-center justify-between mb-4 bg-gray-100 rounded-full">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="p-4 bg-gray-200 rounded-full shadow-md">
            <FontAwesome6 name="arrow-left-long" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">{machineName}</Text>
          {/* Notification Bell with Badge */}
          <View className="relative">
            <TouchableOpacity
              onPress={() => console.log("Open Notifications")} 
              className="mr-1"
            >
              <MaterialIcons name="notifications" size={35} color="#000" />
            </TouchableOpacity>

            {/* Red Notification Badge */}
            {notificationCount > 0 && (
            <View className="absolute top-0 right-0 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center">
              <Text className="text-white text-xs font-bold">{notificationCount}</Text>
            </View>
            )}
          </View>
          <TouchableOpacity onPress={handleOpenScanner}
            className="p-3 bg-gray-200 rounded-full shadow-md">
            <MaterialIcons name="qr-code-scanner" size={32} color="black" />
          </TouchableOpacity>
        </View>

    
   

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {maintenanceTasks.map((task) => {
          const dueDate = new Date(task.dueDate);
          const today = new Date();

          // Reset time to midnight for accurate comparison
          today.setHours(0, 0, 0, 0);
          dueDate.setHours(0, 0, 0, 0);

          // Calculate time difference in days
          const timeDiff = (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

          let backgroundColor = "#0d6000"; // Default Blue
          if (timeDiff < 0) {
            backgroundColor = "#bf111a"; // Past -> Red
          } else if (timeDiff <= 7) {
            backgroundColor = "#fbbf24"; // Within this week -> Yellow
          }

          return (
            <TouchableOpacity
              key={task._id}
              className="flex-row items-center justify-center mb-2 ml-2"
              onPress={() => handlePress(task)}
            >
              <View style={{ backgroundColor }} className="px-7 py-4 mt-1 rounded-xl w-full">
                <Text className="text-lg font-bold text-white">
                  {task.machinename}
                </Text>
                <Text className="text-sm text-white">
                  Scheduled Date: {dueDate.toDateString()}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

    </View>
  );
};

export default MachineScheduleMaintenance;
