import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type MachinefixedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Machinefixed'>;

interface RouteParams {
  breakdownID: string;
}

interface BreakdownDetails {
  scaleofBreakdown: string;
  impactofBreakdown: string;
  description: string;
  timeReported: string;
  fixingStartTime: string;
  breakdownInformedBy: string;
  maintenanceInformedBy: string;
  machinename: string;	
}

interface User {
  id: string;
  name: string;
}

const Fixingstatus: React.FC = () => {
  const navigation = useNavigation<MachinefixedScreenNavigationProp>();
  const route = useRoute();
  const { breakdownID } = route.params as RouteParams;

  const [breakdownDetails, setBreakdownDetails] = useState<BreakdownDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<User[]>([]);

  useEffect(() => {
    const fetchBreakdownDetails = async () => {
      try {
        const response = await axios.get(`https://bairaha-app-api.vercel.app/api/machine/get-breakdowns`);
        const allBreakdowns = response.data.breakdowns;

        const filteredBreakdown = breakdownID
          ? allBreakdowns.find((breakdown: { _id: string }) => breakdown._id === breakdownID)
          : null;

        setBreakdownDetails(filteredBreakdown || null);
      } catch (error) {
        console.error('Failed to fetch breakdown details:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://bairaha-app-api.vercel.app/api/users`);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchBreakdownDetails();
    // fetchUsers();
  }, []);

  const handleParticipantSelect = (participant: User) => {
    if (!selectedParticipants.some((p) => p.id === participant.id)) {
      setSelectedParticipants([...selectedParticipants, participant]);
    }
  };

  const handleMachinefixed = (machineName: string | undefined) => {
    if (!machineName) {
      console.log('Please select a machine');
      return;
    }
    navigation.navigate('Machinefixed', {machineName });
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#0d6000" />
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">{breakdownDetails?.machinename}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('BarcodeScannerScreen')}>
          <MaterialIcons name="qr-code-scanner" size={35} color="black" />
        </TouchableOpacity>
      </View>

      <View className="px-20 py-2 bg-[#ecb500] rounded-full mt-5 mb-5">
          <Text className="text-lg font-bold text-center text-white">
            Machine is being Fixed
          </Text>
      </View>

      <View className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-2xl">
        <View className="flex-row justify-between">
          <Text className="font-bold">Scale of the Breakdown:</Text>
          <Text>{breakdownDetails?.scaleofBreakdown?.toUpperCase() || 'N/A'}</Text>
        </View>

        <View className="flex-row justify-between mt-4">
          <Text className="font-bold">Impact on Production:</Text>
          <Text>{breakdownDetails?.impactofBreakdown?.toUpperCase() || 'N/A'}</Text>
        </View>

        <View className="flex-row justify-between mt-4">
          <Text className="font-bold">Description:</Text>
          <Text>{breakdownDetails?.description || 'N/A'}</Text>
        </View>

        <View className="flex-row justify-between mt-4">
          <Text className="font-bold">Reported By:</Text>
          <Text>{breakdownDetails?.breakdownInformedBy || 'N/A'}</Text>
        </View>

        <View className="flex-row justify-between mt-4">
          <Text className="font-bold">Fixing Started By:</Text>
          <Text>{breakdownDetails?.maintenanceInformedBy || 'N/A'}</Text>
        </View>

        <View className="flex-row justify-between mt-4">
          <Text className="font-bold">Reported Time:</Text>
          <Text>{breakdownDetails?.timeReported ? new Date(breakdownDetails.timeReported).toLocaleString() : 'N/A'}</Text>
        </View>

        <View className="flex-row justify-between mt-4">
          <Text className="font-bold">Fixing Started Time:</Text>
          <Text>{breakdownDetails?.fixingStartTime ? new Date(breakdownDetails.fixingStartTime).toLocaleString() : 'N/A'}</Text>
        </View>
      </View>


        <View className="flex-1 items-center justify-end h-screen mb-5">
          <TouchableOpacity className="flex-row items-center justify-between bg-[#0d6000] px-6 py-3 rounded-full" onPress={()=>handleMachinefixed(breakdownDetails?.machinename)}>
            <Text className="text-white text-2xl font-bold mr-2">DONE FIXING</Text>
            <MaterialCommunityIcons name="arrow-right-bold-circle" size={30} color="white" />
          </TouchableOpacity>
        </View>

    </View>
  );
};

export default Fixingstatus;
