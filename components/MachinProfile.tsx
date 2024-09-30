import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BreakdownService from '../components/BreakdownService';

type BreakdownServiceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BreakdownService'>;

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
  const { machineId, machineName } = route.params as { machineId: string, machineName: string };
  
  const [machine, setMachine] = useState<Machine | null>(null);

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
      navigation.navigate('BreakdownService', { machineId: machine._id , machineName: machine.machinename });
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
    <View className='flex-1 p-4 bg-white'>
      <View className='flex-row items-center justify-between mb-4 ml-3 mr-3'>
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenScanner}>
          <MaterialIcons name="qr-code-scanner" size={45} color="black" />
        </TouchableOpacity>
      </View>

      <View className='items-center'>
        <Text className='text-xl font-bold text-black'>
          {machine.machinename}
        </Text>
      </View>

      <View className='items-center flex-1 mt-4'>
        <View className='py-24 rounded-lg px-10 bg-[#d9d9d9]'>
          <Text className='text-lg text-black'>
            Image of the machine
          </Text>
        </View>
      </View>

      <View className="flex-1 mt-6 ml-5 space-y-2">
        <Text className="text-base">
          <Text className="font-bold">Id:</Text> {machine._id}
        </Text>
        <Text className="text-base">
          <Text className="font-bold">Machine Name:</Text> {machine.machinename}
        </Text>
        <Text className="text-base">
          <Text className="font-bold">Model Number:</Text> {machine.modelnumber}
        </Text>
        <Text className="text-base">
          <Text className="font-bold">Serial Number:</Text> {machine.serialnumber}
        </Text>
        <Text className="text-base">
          <Text className="font-bold">Brand:</Text> {machine.brand}
        </Text>
        <Text className="text-base">
          <Text className="font-bold">Status:</Text> {machine.status}
        </Text>
        <Text className="text-base">
          <Text className="font-bold">Power:</Text> {machine.power}
        </Text>
        <Text className="text-base">
          <Text className="font-bold">Voltage:</Text> {machine.voltage}
        </Text>
        <Text className="text-base">
          <Text className="font-bold">Operator:</Text> {machine.operator}
        </Text>
        <Text className="text-base">
          <Text className="font-bold">Special Notes:</Text> {machine.specialnotes}
        </Text>
      </View>

      <View className="items-center justify-end flex-1">
        <TouchableOpacity onPress={handleBreakdownService}>
        <MaterialCommunityIcons name="arrow-right-bold-circle-outline" size={75} color="#0d6000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MachinProfile;
