import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type BreakdownServiceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BreakdownService' |
 "MachineScheduleMaintenance">;

interface Machine {
  _id: string;
  machinename: string;
  modelnumber: string;
  serialnumber: string;
  brand: string;
  status: string;
  power: string;
  voltage: string;
  operator: string;
  specialnotes: string;
}

const MachinProfile: React.FC = () => {
  const navigation = useNavigation<BreakdownServiceScreenNavigationProp>();
  const route = useRoute();
  const { machineId } = route.params as { machineId: string };

  const [machine, setMachine] = useState<Machine | null>(null);
  
  const [notificationCount, setNotificationCount] = useState(1);
  

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const res = await fetch("https://bairaha-app-api.vercel.app/api/machine/get-machines");
        const data = await res.json();
        const foundMachine = data.machines.find((proj: Machine) => proj._id === machineId);
        setMachine(foundMachine || null);
      } catch (error) {
        console.error("Error fetching machine:", error);
      }
    };
    fetchMachines();
  }, [machineId]);

  const handleBreakdownService = () => {
    if (machine?._id) {
      navigation.navigate('Reportbreakdown', { machineId, machineName: machine.machinename });
    }
  };

  const handleMachineScheduleMaintenance = () => {
    if (machine?._id) {
      navigation.navigate('MachineScheduleMaintenance', {machineName: machine.machinename});
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (!machine) {
    return (
      <View className='items-center justify-center flex-1 bg-white'>
        <ActivityIndicator size="large" color="#bf111a" />
      </View>
    );
  }

  const handleOpenScanner = () => {
    navigation.navigate('BarcodeScannerScreen');
  };

  return (
    <View className='flex-1 px-4 py-6 bg-white'>
        <View className="flex-row items-center justify-between mb-4 bg-gray-100 rounded-full">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="p-4 bg-gray-200 rounded-full shadow-md">
            <FontAwesome6 name="arrow-left-long" size={24} color="black" />
          </TouchableOpacity>

          {/* Scrollable Machine Name */}
          <View className="flex-1 mx-2 items-center justify-center">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
              <Text className="text-lg font-bold text-center mx-1">{machine.machinename.toUpperCase()}</Text>
            </ScrollView>
          </View>


          {/* Notification Bell with Badge */}
          <View className="relative mr-4">
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


      <View className='items-center flex-1 mt-4'>
        <View className='py-24 rounded-lg px-10 bg-[#d9d9d9]'>
          <Text className='text-lg text-black'>
            Image of the machine
          </Text>
        </View>
      </View>

      {/* Machine details with slightly increased font size */}
      <View className="flex-1 mt-6 ml-0 space-y-1">
        <View className="flex-row justify-between">
          <Text className="font-semibold text-base">Machine Name:</Text>
          <Text className="text-base">{machine.machinename}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-semibold text-base">Model Number:</Text>
          <Text className="text-base">{machine.modelnumber}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="font-semibold text-base">Brand:</Text>
          <Text className="text-base">{machine.brand}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-semibold text-base">Status:</Text>
          <Text className="text-base">{machine.status}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-semibold text-base">Power:</Text>
          <Text className="text-base">{machine.power}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-semibold text-base">Voltage:</Text>
          <Text className="text-base">{machine.voltage}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-semibold text-base">Operator:</Text>
          <Text className="text-base">{machine.operator}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-semibold text-base">Special Notes:</Text>
          <Text className="text-base">{machine.specialnotes}</Text>
        </View>
      </View>

      <View className="items-center justify-end flex-1 mb-2 space-y-2">
        {/* Report Breakdown Button */}
        <TouchableOpacity onPress={handleBreakdownService}>
          <View className="bg-[#0284c7] w-full p-4 px-6 rounded-2xl border-2 border-white flex-row items-center justify-between">
            <Text className="text-xl font-semibold text-white">
              Report Breakdown
            </Text>
            <MaterialIcons name="warning" size={30} color="white" />
          </View>
        </TouchableOpacity>

        {/* Scheduled Maintenance Button */}
        <TouchableOpacity onPress={handleMachineScheduleMaintenance}>
          <View className="bg-[#0284c7] w-full p-4 px-6 rounded-2xl border-2 border-white flex-row items-center justify-between">
            <Text className="text-xl font-semibold text-white">
              Scheduled Maintenance
            </Text>
            <MaterialIcons name="calendar-month" size={30} color="white" />
          </View>
        </TouchableOpacity>
      </View>


      

    </View>
  );
};

export default MachinProfile;
