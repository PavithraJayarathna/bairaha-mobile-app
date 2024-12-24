import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 
import Machinefixed from '../components/Machinefixed';

type MachinefixedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Machinefixed'>;

interface RouteParams {
  machineName: string;
}

interface BreakdownDetails {
  scaleofBreakdown: string;
  impactofBreakdown: string;
  description: string;
  timeReported: string;
  fixingStartTime: string;
}

const Fixingstatus: React.FC = () => {
  const navigation = useNavigation<MachinefixedScreenNavigationProp>();
  const route = useRoute();
  const { machineName } = route.params as RouteParams;

  const [breakdownDetails, setBreakdownDetails] = useState<BreakdownDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreakdownDetails = async () => {
      try {
        const response = await axios.get(`https://bairaha-app-api.vercel.app/api/machine/get-breakdowns`);
        const allBreakdowns = response.data.breakdowns;

        const filteredBreakdown = machineName
          ? allBreakdowns.find((breakdown: { machinename: string }) => breakdown.machinename === machineName)
          : null;

        setBreakdownDetails(filteredBreakdown || null);
      } catch (error) {
        console.error('Failed to fetch breakdown details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreakdownDetails();
  }, [machineName]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenScanner = () => {
    navigation.navigate('BarcodeScannerScreen');
  };

  const handleMachinefixed = () => {
    navigation.navigate('Machinefixed', { machineName });
  };

  if (loading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#0d6000" />
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row items-center justify-between mb-4 ml-3 mr-3">
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenScanner}>
          <MaterialIcons name="qr-code-scanner" size={45} color="black" />
        </TouchableOpacity>
      </View>

      <View className="items-center">
        <Text className="text-2xl font-bold text-black">{machineName}</Text>
      </View>

      <View className="items-center flex-1 mt-10">
        <TouchableOpacity className="px-20 py-2 bg-[#ecb500] rounded-full">
          <Text className="text-lg font-bold text-center text-white">
            Machine is being Fixed
          </Text>
        </TouchableOpacity>

        <View className="p-4 mt-16 bg-gray-100 border border-gray-300 rounded-lg shadow-2xl h-96">
          <Text className="font-bold">Scale of the breakdown</Text>
          <Text>{breakdownDetails?.scaleofBreakdown.toUpperCase() || 'N/A'}</Text>

          <Text className="mt-4 font-bold">Impact of breakdown on production</Text>
          <Text>{breakdownDetails?.impactofBreakdown.toUpperCase() || 'N/A'}</Text>

          <Text className="mt-4 font-bold">Description - Nature of the breakdown</Text>
          <Text>{breakdownDetails?.description || 'N/A'}</Text>

          <Text className="mt-4 font-bold">Breakdown reported time</Text>
          <Text>{breakdownDetails?.timeReported ? new Date(breakdownDetails.timeReported).toLocaleString() : 'N/A'}</Text>

          <Text className="mt-4 font-bold">Fixing started time</Text>
          <Text>{breakdownDetails?.fixingStartTime ? new Date(breakdownDetails.fixingStartTime).toLocaleString() : 'N/A'}</Text>
        </View>

        <TouchableOpacity className="flex-row items-center justify-between mt-10 mb-8 ml-5" onPress={handleMachinefixed}>
          <View className="px-16 py-3 bg-[#0d6000] rounded-3xl">
            <Text className="text-xl font-bold text-white" style={{ letterSpacing: 2 }}>
              DONE FIXING
            </Text>
          </View>
          <View className="ml-0">
            <MaterialIcons name="keyboard-double-arrow-right" size={80} color="#0d6000" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Fixingstatus;
