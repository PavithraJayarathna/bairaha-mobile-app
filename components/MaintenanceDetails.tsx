import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import {useSelector} from 'react-redux';
import axios from 'axios';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface Maintenance {
  _id: string;
  machinename: string;
  dueDate: string;
  approval: string;
  fixingStartTime: string;
  maintenanceInformedBy: string;
  specialNote: string;
  supervisorApproved: string;
  supervisorNotes: string;
  lastMaintainanceID: string | null;
  lastMaintenaceDate: string | null;
  scheduleMaintenanceId: string;
}

type MaintenanceDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MaintenanceDetails'
>;

interface RouteParams {
  machineId: string;
  machineName: string;
}

const MaintenanceDetails: React.FC = () => {
  const navigation = useNavigation<MaintenanceDetailsScreenNavigationProp>();
  const route = useRoute();
  const { taskId } = route.params as { taskId: string };
  const [maintenance, setMaintenance] = useState<Maintenance | null>(null);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useSelector((state:any) => state.user);
  const [notificationCount, setNotificationCount] = useState(1);

  const { machineId, machineName } = route.params as RouteParams;

  useEffect(() => {
    const fetchMaintenanceDetails = async () => {
      try {
        const res = await axios.get('https://bairaha-app-api.vercel.app/api/scheduled/get-scheduled-maintenance');
        const fetchedMaintenance = res.data.scheduledMaintenance;
        const selectedMaintenance = fetchedMaintenance.find((task: Maintenance) => task._id === taskId);
        setMaintenance(selectedMaintenance || null);
      } catch (error) {
        console.error('Error fetching maintenance details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceDetails();
  }, [taskId]);

  const handleStartMaintenance = async () => {
    navigation.navigate('Reportbreakdown', { machineId, machineName});
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenScanner = () => {
    navigation.navigate("BarcodeScannerScreen");
  };
  

  if (loading) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" color="#0284c7" />
      </View>
    );
  }

  if (!maintenance) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <Text className="text-lg text-red-500">Maintenance details not found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4 bg-gray-100 rounded-full">
        
        <TouchableOpacity 
          onPress={handleGoBack}
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

      <ScrollView contentContainerStyle={{ marginTop: 20 }}>
        <View className="bg-white rounded-xl p-4 shadow-lg mb-4">
          <Text className="text-lg font-semibold mb-3 text-gray-800">Maintenance Information</Text>

          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-sm font-semibold text-gray-700">Machine Name:</Text>
              <Text className="text-sm text-gray-600">{maintenance.machinename}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm font-semibold text-gray-700">Scheduled Date:</Text>
              <Text className="text-sm text-gray-600">{new Date(maintenance.dueDate).toDateString()}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm font-semibold text-gray-700">Supervisor Approval:</Text>
              <Text className="text-sm text-gray-600">{maintenance.supervisorApproved}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm font-semibold text-gray-700">Last Maintenance ID:</Text>
              <Text className="text-sm text-gray-600">{maintenance.lastMaintainanceID || 'N/A'}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm font-semibold text-gray-700">Last Maintenance Date:</Text>
              <Text className="text-sm text-gray-600">
                {maintenance.lastMaintenaceDate ? new Date(maintenance.lastMaintenaceDate).toDateString() : 'N/A'}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm font-semibold text-gray-700">Schedule Maintenance ID:</Text>
              <Text className="text-sm text-gray-600">{maintenance.scheduleMaintenanceId}</Text>
            </View>
          </View>
        </View>

        {/* Special Notes */}
        <View className="bg-white rounded-xl p-4 shadow-lg mb-4">
          <Text className="text-lg font-semibold mb-2 text-gray-800">Special Notes</Text>
          <Text className="text-sm text-gray-600">{maintenance.specialNote || 'No special notes'}</Text>
        </View>

        {/* Supervisor Notes */}
        <View className="bg-white rounded-xl p-4 shadow-lg mb-4">
          <Text className="text-lg font-semibold mb-2 text-gray-800">Supervisor Notes</Text>
          <Text className="text-sm text-gray-600">{maintenance.supervisorNotes || 'No supervisor notes'}</Text>
        </View>
      </ScrollView>

      <View className="items-center justify-end flex-1 mb-3">
        <TouchableOpacity onPress={handleStartMaintenance}>
          <View className="bg-[#0284c7] w-11/12 h-20 p-5 px-6 rounded-2xl border-2 mb-4 border-white flex-row items-center justify-between">
            <Text className="text-2xl font-semibold text-white">Start Maintenance</Text>
            <Text className="text-2xl">⚙️</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default MaintenanceDetails;
