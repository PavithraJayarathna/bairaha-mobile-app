import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
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
}

const Startfixing: React.FC = () => {
  const navigation = useNavigation<FixingstatusScreenNavigationProp>();
  const route = useRoute();
  const { machineId, machineName } = route.params as RouteParams;
  
  const [breakdownDetails, setBreakdownDetails] = useState<BreakdownDetails | null>(null);
  const [loading, setLoading] = useState(true);

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
      participantstoFixed: 'user 01',
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
      <View className='flex-row items-center justify-between mb-4 ml-3 mr-3'>
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenScanner}>
          <View>
            <MaterialIcons name="qr-code-scanner" size={45} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <View className='items-center'>
        <Text className='text-2xl font-bold text-black'>
          {machineName}
        </Text>
      </View>

      <View className='items-center flex-1 mt-10'>
        <View className='px-24 py-2 rounded-full bg-[#bf111a]'>
          <Text className='text-lg font-bold text-center text-white'>
            Machine is Broken
          </Text>
        </View>

        <View className='p-4 mt-16 bg-gray-100 border border-gray-300 rounded-lg shadow-2xl h-80'>
          <Text className='font-bold'>Scale of the breakdown</Text>
          <Text>{breakdownDetails?.scaleofBreakdown.toUpperCase() || 'N/A'}</Text>

          <Text className='mt-4 font-bold'>
            Impact of breakdown on production
          </Text>
          <Text>{breakdownDetails?.impactofBreakdown.toUpperCase() || 'N/A'}</Text>

          <Text className='mt-4 font-bold'>
            Description - Nature of the breakdown
          </Text>
          <Text>{breakdownDetails?.description || 'N/A'}</Text>

          <Text className='mt-4 font-bold'>
            Breakdown reported time
          </Text>
          <Text>{breakdownDetails?.timeReported ? new Date(breakdownDetails.timeReported).toLocaleString() : 'N/A'}</Text>

          <Text className='mt-4 font-bold'>
            Reported by
          </Text>
          <Text>{breakdownDetails?.breakdownInformedBy}</Text>

        </View>

        {/* <TouchableOpacity className='flex-row items-center justify-between mb-8 ml-6 mt-32' onPress={handleFixingstatus}>
          <View className='px-16 py-3 bg-[#ecb500] rounded-3xl'>
            <Text className='text-xl font-bold text-white' style={{ letterSpacing: 2 }}>
              START FIXING
            </Text>
          </View>
          <View className='ml-1'>
            <MaterialIcons name="keyboard-double-arrow-right" size={80} color="#eab308" />
          </View>
        </TouchableOpacity> */}

        <View className="flex-1 items-center justify-center h-screen">
          <TouchableOpacity className="flex-row items-center bg-[#eab308] px-16 py-3 rounded-full" onPress={handleFixingstatus}>
            <Text className="text-white text-2xl font-bold mr-2">Start Fixing</Text>
            <Icon name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Startfixing;
