import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';


import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 
type MachineListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MachineList'>;

import MachineList  from '../components/MachineList';


const MaintenanceCriteria : React.FC = () => {

  const navigation = useNavigation<MachineListScreenNavigationProp>();
  const handleMachineList = () => {
    navigation.navigate('MachineList')
  };

  const handleGoBack = () => {
    navigation.goBack()
  };



  return (
    <View className='flex-1 p-4 bg-white'>
      
      <View className='flex-row items-center justify-between mb-4 ml-3 mr-3'>
        <View style={{ flex: 1 }} />
        <TouchableOpacity >
          <View>
            <MaterialIcons name="qr-code-scanner" size={45} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <View className='flex-1 bg-white'>
        <View className='items-center mt-8 mb-5'>
          <Text className='text-3xl font-semibold'>Your Sector</Text>
        </View>

        <View className='mt-20'>
          <TouchableOpacity className='flex-row items-center bg-[#0d6000] rounded-2xl p-7 items' onPress={handleMachineList}>
            
            <View className='mr-8'>
              <MaterialCommunityIcons name="robot-industrial" size={35} color="white" />
            </View>
            <Text className='text-xl font-bold text-white'>
              Machines
            </Text>
            <View className='items-center justify-center h-6 ml-auto bg-red-900 rounded-2xl w-7'>
              <Text className='text-xs text-white'>
                xx
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className='mt-10'>
          <TouchableOpacity className='flex-row items-center bg-[#0d6000] rounded-2xl p-7 items'>
            <View className='mr-8'>
            <MaterialIcons name="inventory" size={35} color="white" />
            </View>
            <Text className='text-xl font-bold text-white'>
              Inventory
            </Text>
            <View className='items-center justify-center h-6 ml-auto bg-red-900 rounded-2xl w-7 pb-'>
              <Text className='text-xs text-white'>
                xx
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className='mt-10'>
          <TouchableOpacity className='flex-row items-center bg-[#0d6000] rounded-2xl p-7 items'>
            <View className='mr-8'>
            <AntDesign name="barschart" size={35} color="white" />
            </View>
            <Text className='text-xl font-bold text-white'>
              Ongoing Actions
            </Text>
            <View className='items-center justify-center h-6 ml-auto bg-red-900 rounded-2xl w-7'>
              <Text className='text-xs text-white'>
                xx
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
};

export default MaintenanceCriteria;