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
}

const Reportbreakdown: React.FC = () => {
  const navigation = useNavigation<StartfixingScreenNavigationProp>();
  const route = useRoute();
  const { machineId, machineName } = route.params as RouteParams;
  const { currentUser } = useSelector((state: any) => state.user);

  const [selectedScale, setSelectedScale] = useState('high');
  const [selectedImpact, setSelectedImpact] = useState('high');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1);

  const reportData = {
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

  const handleOpenScanner = () => {
    navigation.navigate('BarcodeScannerScreen');
  };

  const handleReport = async () => {
    setLoading(true);
    try {
      console.log("Report Data:", JSON.stringify(reportData, null, 2));
      const response = await axios.post(
        'https://bairaha-app-api.vercel.app/api/machine/report-breakdown',
        reportData
      );
      
      Alert.alert('Success', 'breakdown reported successfully!');
    } catch (error) {
      console.error('Error reporting breakdown', error);
      Alert.alert('Error', 'There was an error reporting breakdown. Please try again.');
    } finally {
      setLoading(false);
      navigation.navigate('MyActionsList');
    }
  };

  return (
    <View className="flex-1 px-4 py-6 bg-white">
      <View className="flex-row items-center justify-between mb-4 bg-gray-100 rounded-full">
        
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="p-4 bg-gray-200 rounded-full shadow-md">
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">{machineName.toUpperCase()}</Text>

        <View className="relative">
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

      <View className="items-center flex-2 mt-2 mb-8 py-2 rounded-2xl bg-red-100">
        <Text className="text-lg font-semibold text-center text-black">Breakdown Report</Text>
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
          {'Briefly Describe the Nature of the Breakdown'}
        </Text>
        <View className="relative">
          <TextInput
            placeholder={'Describe the issue...'}
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
              REPORT
            </Text>
            <MaterialCommunityIcons name="arrow-right-bold-circle" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Reportbreakdown;
