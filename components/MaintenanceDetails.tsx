import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

const MaintenanceDetails: React.FC = () => {
  const navigation = useNavigation<MaintenanceDetailsScreenNavigationProp>();
  const route = useRoute();
  const { taskId } = route.params as { taskId: string };
  const [maintenance, setMaintenance] = useState<Maintenance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenanceDetails = async () => {
      try {
        const res = await axios.get('https://bairaha-app-api.vercel.app/api/scheduled/get-scheduled-maintenance');
        const fetchedMaintenance = res.data.scheduledMaintenance;

        // Filter the fetched maintenance data by taskId
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
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 bg-transparent shadow-md">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-black">{maintenance.machinename}</Text>
        <View style={{ width: 35 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 12, marginTop:20}}>
        <View className="bg-white rounded-xl p-4 shadow-lg mb-4">
          <Text className="text-2xl font-semibold mb-3 text-gray-800">Maintenance Information</Text>
          
          <View className="space-y-4">
            <View className="flex-row justify-between">
              <Text className="font-bold text-lg text-gray-700">Machine Name:</Text>
              <Text className="text-base text-gray-600">{maintenance.machinename}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-bold text-lg text-gray-700">Scheduled Date:</Text>
              <Text className="text-base text-gray-600">{new Date(maintenance.dueDate).toDateString()}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-bold text-lg text-gray-700">Supervisor Approval:</Text>
              <Text className="text-base text-gray-600">{maintenance.supervisorApproved}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-bold text-lg text-gray-700">Last Maintenance ID:</Text>
              <Text className="text-base text-gray-600">{maintenance.lastMaintainanceID || 'N/A'}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-bold text-lg text-gray-700">Last Maintenance Date:</Text>
              <Text className="text-base text-gray-600">{maintenance.lastMaintenaceDate ? new Date(maintenance.lastMaintenaceDate).toDateString() : 'N/A'}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-bold text-lg text-gray-700">Schedule Maintenance ID:</Text>
              <Text className="text-base text-gray-600">{maintenance.scheduleMaintenanceId}</Text>
            </View>
          </View>
        </View>

        {/* Fixing Start Time */}
        <View className="bg-white rounded-xl p-6 shadow-lg mb-4">
          <Text className="text-2xl font-semibold mb-3 text-gray-800">Special Notes</Text>
          <View className="flex-row justify-between">
              <Text className="text-base text-gray-600">{maintenance.specialNote}</Text>
          </View>
        </View>

        {/* Maintenance Informed By */}
        <View className="bg-white rounded-xl p-6 shadow-lg mb-4">
          <Text className="text-2xl font-semibold mb-3 text-gray-800">Supervisor Notes</Text>
          <View className="flex-row justify-between">
              <Text className="text-base text-gray-600">{maintenance.supervisorNotes}</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default MaintenanceDetails;
