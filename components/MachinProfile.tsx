import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useState, useEffect } from 'react';


import { useNavigation, useRoute  } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 
type BreakdownServiceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BreakdownService'>;

import BreakdownService from '../components/BreakdownService';

const MachinProfile: React.FC = () => {

    
        const navigation = useNavigation<BreakdownServiceScreenNavigationProp>();
        const handlereakdownService = (id: string) => {
          navigation.navigate('BreakdownService',{ machineId: id })
        };

        const handleGoBack = () => {
            navigation.goBack()
          };

        const route = useRoute();
        const { machineId } = route.params;
        const [machines, setMachines] = useState([]);
        const [machine, setMachine] = useState([]);
      
        useEffect(() => {
          const fetchMachines = async () => {
            const res = await fetch("https://bairaha-app-api.vercel.app/api/machine/get-machines");
            const data = await res.json();
            setMachines(data.machines);
            const foundMachine = data.machines.find((proj) => proj._id === machineId);
            setMachine(foundMachine);
          };
          fetchMachines();
        }, [machineId]);

        
        
    return (
        <View className='flex-1 p-4 bg-white'>
            
            <View className='flex-row items-center justify-between mb-4 ml-3 mr-3'>
                <TouchableOpacity onPress={handleGoBack}>
                    <FontAwesome6 name="arrow-left-long" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View>
                        <MaterialIcons name="qr-code-scanner" size={45} color="black" />
                    </View>
                </TouchableOpacity>
            </View>

            <View className='items-center'>
                <Text className='text-xl font-bold text-black'>
                    {machine.machinename}
                </Text>
            </View>

            <View className='items-center flex-1 mt-4'>
                <View className='py-24 rounded-lg px-10 bg-[#d9d9d9]   '>
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
                <TouchableOpacity>
                    <MaterialIcons name="keyboard-double-arrow-right" size={80} color="#0d6000" onPress={handlereakdownService} />
                </TouchableOpacity>
            </View>
        
        </View>
    );
};

export default MachinProfile;
