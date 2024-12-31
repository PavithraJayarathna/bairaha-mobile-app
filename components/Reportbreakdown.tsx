import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Picker } from '@react-native-picker/picker'; 
import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

type StartfixingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Startfixing'>;

interface RouteParams {
  machineId: string;
  machineName: string;
}

const Reportbreakdown: React.FC = () => {
  const navigation = useNavigation<StartfixingScreenNavigationProp>();
  const route = useRoute();
  const { machineId, machineName } = route.params as RouteParams;
  const { currentUser } = useSelector((state:any) => state.user);

  const handleStartfixing = () => {
    navigation.navigate('Startfixing', {machineId, machineName});
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  
  const handleOpenScanner = () => {
    navigation.navigate('BarcodeScannerScreen');
  };

  const [selectedScale, setSelectedScale] = useState("high");
  const [selectedImpact, setSelectedImpact] = useState("high");
  const [description, setDescription] = useState("");

  // console.log(selectedScale);

  const reportData = {
    status: 'Breakdown',
    machinename: machineName, //this
    scaleofBreakdown: selectedScale,
    impactofBreakdown: selectedImpact,
    description: description,
    breakdownInformedBy: currentUser?.fullname,
    timeReported: new Date().toISOString(),
    participantsToFixed:'',
    usedMaterials:'',
    maintenanceInformedBy:'',
    specialNote:'',
    timeFixed:'pending',
    approval:'',
    timeApproved:'pending',
    approvedSupervisor:'',
    supervisorNotes:'',
    fixingStartTime: 'pending',
  };

  const handleReportBreakdown = async () => {
    
    try {
      const response = await axios.post('https://bairaha-app-api.vercel.app/api/machine/report-breakdown', reportData);
      console.log(reportData);
      Alert.alert('Success', 'Breakdown reported successfully!');
    } catch (error) {
      console.error("Error reporting breakdown:", error);
      Alert.alert('Error', 'There was an error reporting the breakdown. Please try again.');
    }
  };

  const handleReportAndStartFixing = async () => {
    await handleReportBreakdown();
    handleStartfixing();
  };

  

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
        <Text className='text-2xl font-bold text-black'>{machineName}</Text>
      </View>

      <View className='items-center flex-2 mt-8 mb-8 py-2 rounded-full bg-[#0d6000]'>
          <Text className='text-lg font-bold text-center text-white'>
            Report Breakdown
          </Text>
      </View>

      <View className='w-full mb-8'>
        <Text className='mb-2 text-gray-600'>Scale of the breakdown</Text>
        <View className='border border-gray-300 rounded-lg'>
          <Picker
            selectedValue={selectedScale}
            onValueChange={(value) => setSelectedScale(value)}
            className='p-2'
          >
            <Picker.Item label="High" value="high" />
            <Picker.Item label="Low" value="low" />
          </Picker>
        </View>
      </View>

      <View className="w-full mb-6">
        <Text className="text-gray-600 mb-2">
          Impact of Breakdown on Production
        </Text>
        <View className="border border-gray-300 rounded-lg bg-white shadow-md">
          <Picker
            selectedValue={selectedImpact}
            onValueChange={(value) => setSelectedImpact(value)}
            className="p-3 text-lg"
          >
            <Picker.Item label="High" value="high" />
            <Picker.Item label="Low" value="low" />
          </Picker>
        </View>
      </View>

      <View className="w-full mb-6">
        <Text className="text-gray-600 mb-2">
          Briefly Describe the Nature of the Breakdown
        </Text>
        <View className="relative">
          <TextInput
            placeholder="Describe the issue..."
            value={description}
            onChangeText={setDescription}
            className="border border-gray-300 rounded-lg bg-white shadow-md p-4 pt-2 pb-16"
            multiline
          />
          <TouchableOpacity
            className="absolute right-3 top-3"
            onPress={() => setDescription('')}
          >
            <Entypo name="circle-with-cross" size={24} color="#bf111a" />
          </TouchableOpacity>
        </View>
      </View>

      {/* <TouchableOpacity className='flex-row items-center justify-between mt-10 mb-8 ml-0 mr-0' onPress={handleReportAndStartFixing}>
        <View className='px-8 py-3 bg-[#bf111a] rounded-3xl'>
          <Text className='text-xl font-bold text-white' style={{letterSpacing: 2}}>
            REPORT
          </Text>  
        </View>  
        <View className='ml-0'>
          <MaterialIcons name="keyboard-double-arrow-right" size={80} color="#bf111a" />
        </View>
      </TouchableOpacity> */}
      <View className="flex-1 items-center justify-center h-screen">
      <TouchableOpacity className="flex-row items-center bg-[#bf111a] px-16 py-3 rounded-full" onPress={handleReportAndStartFixing}>
        <Text className="text-white text-2xl font-bold mr-2">REPORT</Text>
        <Icon name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    </View>

    </View>
  );
};

export default Reportbreakdown;

