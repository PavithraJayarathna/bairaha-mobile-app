import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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

      {/* Machine details with slightly increased font size */}
      <View className="flex-1 mt-6 ml-5 space-y-3">
        <View className="flex-row justify-between">
          <Text className="font-bold text-lg">Machine Name:</Text>
          <Text className="text-base">{machine.machinename}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-bold text-lg">Model Number:</Text>
          <Text className="text-base">{machine.modelnumber}</Text>
        </View>
        {/* <View className="flex-row justify-between">
          <Text className="font-bold text-lg">Serial Number:</Text>
          <Text className="text-base">{machine.serialnumber}</Text>
        </View> */}
        <View className="flex-row justify-between">
          <Text className="font-bold text-lg">Brand:</Text>
          <Text className="text-base">{machine.brand}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-bold text-lg">Status:</Text>
          <Text className="text-base">{machine.status}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-bold text-lg">Power:</Text>
          <Text className="text-base">{machine.power}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-bold text-lg">Voltage:</Text>
          <Text className="text-base">{machine.voltage}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-bold text-lg">Operator:</Text>
          <Text className="text-base">{machine.operator}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-bold text-lg">Special Notes:</Text>
          <Text className="text-base">{machine.specialnotes}</Text>
        </View>
      </View>

      <View className="items-center justify-end flex-1 mb-3">
        <TouchableOpacity onPress={handleBreakdownService}>
          <View
            style={{
              backgroundColor: '#bf111a',
              padding: 2,
              paddingRight: 25, 
              paddingLeft: 25,               
              borderRadius: 20,
              borderWidth: 2,
              borderColor: '#ffffff',
            }}
          >
            <MaterialCommunityIcons name="hammer-wrench" size={60} color="white" />
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default MachinProfile;
