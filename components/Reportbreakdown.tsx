import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import axios from 'axios';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type StartfixingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Startfixing' | 'MachineList'>;

interface RouteParams {
  machineId: string;
  machineName: string;
  reqMaintenance?: boolean; // Optional param to determine maintenance mode
}

const Reportbreakdown: React.FC = () => {
  const navigation = useNavigation<StartfixingScreenNavigationProp>();
  const route = useRoute();
  const { machineId, machineName, reqMaintenance } = route.params as RouteParams;
  const { currentUser } = useSelector((state: any) => state.user);

  const [selectedScale, setSelectedScale] = useState('high');
  const [selectedImpact, setSelectedImpact] = useState('high');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Determine the status and title based on request type
  const isMaintenance = reqMaintenance ?? false;
  const pageTitle = isMaintenance ? 'Report Scheduled Maintenance' : 'Report Breakdown';

  const reportData = {
    status: isMaintenance ? 'Scheduled Maintenance' : 'Breakdown',
    machinename: machineName,
    scaleofBreakdown: selectedScale,
    impactofBreakdown: selectedImpact,
    description,
    breakdownInformedBy: currentUser?.fullname,
    timeReported: new Date().toISOString(),
    participantsToFixed: '',
    usedMaterials: [],
    maintenanceInformedBy: '',
    specialNote: '',
    timeFixed: 'pending',
    approval: '',
    timeApproved: 'pending',
    approvedSupervisor: '',
    supervisorNotes: '',
    fixingStartTime: 'pending',
  };

  const handleReport = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://bairaha-app-api.vercel.app/api/machine/report-breakdown',
        reportData
      );
      console.log(reportData);
      Alert.alert('Success', `${pageTitle} reported successfully!`);
    } catch (error) {
      console.error(`Error reporting ${pageTitle}:`, error);
      Alert.alert('Error', `There was an error reporting ${pageTitle}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">{machineName}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('BarcodeScannerScreen')}>
          <MaterialIcons name="qr-code-scanner" size={35} color="black" />
        </TouchableOpacity>
      </View>

      <View className="items-center flex-2 mt-8 mb-8 py-2 rounded-full bg-[#0d6000]">
        <Text className="text-lg font-bold text-center text-white">{pageTitle}</Text>
      </View>

      <View className="w-full mb-8">
        <Text className="mb-2 text-gray-600">Scale of the breakdown</Text>
        <View className="border border-gray-300 rounded-lg">
          <Picker
            selectedValue={selectedScale}
            onValueChange={(value) => setSelectedScale(value)}
            className="p-2"
          >
            <Picker.Item label="High" value="high" />
            <Picker.Item label="Low" value="low" />
          </Picker>
        </View>
      </View>

      <View className="w-full mb-6">
        <Text className="text-gray-600 mb-2">Impact of Breakdown on Production</Text>
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
          {isMaintenance ? 'Describe the Scheduled Maintenance' : 'Briefly Describe the Nature of the Breakdown'}
        </Text>
        <View className="relative">
          <TextInput
            placeholder={isMaintenance ? 'Describe the maintenance task...' : 'Describe the issue...'}
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

      <View className="flex-1 items-center justify-end h-screen mb-5">
        {loading ? (
          <ActivityIndicator size="large" color="#bf111a" />
        ) : (
          <TouchableOpacity
            className="flex-row items-center justify-between w-2/3 bg-[#bf111a] px-6 py-3 rounded-full"
            onPress={handleReport}
          >
            <Text className="text-white text-2xl font-bold mr-2">
              {isMaintenance ? 'SCHEDULE' : 'REPORT'}
            </Text>
            <MaterialCommunityIcons name="arrow-right-bold-circle" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Reportbreakdown;
