import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import { RootStackParamList } from '../types'; 
import Icon from 'react-native-vector-icons/MaterialIcons';

type FixingstatusScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Fixingstatus'>;

interface RouteParams {
  machineId: string;
  machineName: string;
}

interface BreakdownDetails {
  scaleofBreakdown: string;
  impactofBreakdown: string;
  description: string;
  timeReported: string;
  breakdownInformedBy: string;
}

const Startfixing: React.FC = () => {
  const navigation = useNavigation<FixingstatusScreenNavigationProp>();
  const route = useRoute();
  const { machineId, machineName } = route.params as RouteParams;
  
  const [breakdownDetails, setBreakdownDetails] = useState<BreakdownDetails | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { currentUser } = useSelector((state:any) => state.user);

  useEffect(() => {
    const fetchBreakdownDetails = async () => {
      try {
        const response = await axios.get(`https://bairaha-app-api.vercel.app/api/machine/get-breakdowns`);
        const allBreakdowns = response.data.breakdowns;
  
        const filteredBreakdown = machineName
          ? allBreakdowns.find((breakdown: { machinename: string; }) => breakdown.machinename === machineName) //This want to change
          : null;
  
        // console.log(machineName, filteredBreakdown);
        setBreakdownDetails(filteredBreakdown || null);
      } catch (error) {
        console.error('Failed to fetch breakdown details:', error);
      } finally {
        setLoading(false);
        // console.log(breakdownDetails);
      }
    };
  
    fetchBreakdownDetails();
  }, [machineName, machineId]);
  
  

  const handleFixingstatus = () => {
    handleFixingStarted();
    navigation.navigate('Fixingstatus', { machineName });
  };
  
  const getCurrentTime = () => new Date().toISOString();

  const handleFixingStarted = async () => {
    const fixingData = {
      fixingStartTime: getCurrentTime(),
      participantstoFixed: currentUser,
    };
  
    try {
      const response = await axios.put(
        `https://bairaha-app-api.vercel.app/api/machine/breakdown/${machineName}/fixing-start`,
        fixingData
      );
      console.log(fixingData);
      Alert.alert('Success', 'Breakdown fixing started successfully!');
    } catch (error) {
      console.error("Error starting the fixing process:", error);
      Alert.alert('Error', 'There was an error starting the fixing process. Please try again.');
    }
  };


  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenScanner = () => {
    navigation.navigate('BarcodeScannerScreen');
  };

  if (loading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className='flex-1 p-4 bg-white'>
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">{machineName}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('BarcodeScannerScreen')}>
          <MaterialIcons name="qr-code-scanner" size={35} color="black" />
        </TouchableOpacity>
      </View>

      <View className='items-center flex-1 mt-10'>
        <View className='px-24 py-2 rounded-full bg-[#bf111a]'>
          <Text className='text-lg font-bold text-center text-white'>
            Machine is Broken
          </Text>
        </View>

        <View className='p-6 mt-8 bg-gray-100 border border-gray-300 rounded-xl shadow-lg w-full'>
          <View className="flex-row justify-between items-center">
            <Text className='font-bold text-gray-800'>Scale of the Breakdown</Text>
            <Text className=' text-gray-700'>{breakdownDetails?.scaleofBreakdown.toUpperCase() || 'N/A'}</Text>
          </View>

          <View className='mt-6 flex-row justify-between items-center'>
            <Text className='font-bold text-gray-800'>Impact on Production</Text>
            <Text className=' text-gray-700'>{breakdownDetails?.impactofBreakdown.toUpperCase() || 'N/A'}</Text>
          </View>

          <View className='mt-6 flex-row justify-between items-center'>
            <Text className='font-bold text-gray-800'>Reported By</Text>
            <Text className=' text-gray-700'>{breakdownDetails?.breakdownInformedBy}</Text>
          </View>

          <View className='mt-6'>
            <Text className='font-bold text-gray-800'>Breakdown Reported Time</Text>
            <Text className='mt-2 text-gray-700'>{breakdownDetails?.timeReported ? new Date(breakdownDetails.timeReported).toLocaleString() : 'N/A'}</Text>
          </View>

          <View className='mt-6'>
            <Text className='font-bold text-gray-800'>Description - Nature of the Breakdown</Text>
            <Text className='mt-2 text-gray-700'>{breakdownDetails?.description || 'N/A'}</Text>
          </View>

        </View>



        <View className="flex-1 items-center justify-end h-screen mb-5">
          <TouchableOpacity className="flex-row items-center bg-[#eab308] px-16 py-3 rounded-full" onPress={handleFixingstatus}>
            <Text className="text-white text-2xl font-bold mr-2">START FIXING</Text>
            <Icon name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Startfixing;
