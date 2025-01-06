import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RootStackParamList } from '../types'; 
import { StackNavigationProp } from '@react-navigation/stack';


type BreakdownfinishScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MaintenanceCriteria'>;

interface RouteParams {
  machineName: string;
  breakdownId: string; // Assuming breakdown ID is passed through route params
}

const Breakdownfinish: React.FC = () => {
  const route = useRoute();
  const { machineName, breakdownId } = route.params as RouteParams;

  const [breakdownData, setBreakdownData] = useState<any>(null);

  const navigation = useNavigation<BreakdownfinishScreenNavigationProp>();

  // Fetch breakdown details by ID
  useEffect(() => {
    const fetchBreakdownData = async () => {
      try {
        const response = await axios.get(
          `https://bairaha-app-api.vercel.app/api/machine/get-breakdowns`
        );
        setBreakdownData(response.data.breakdowns[0]);
      } catch (error) {
        console.error('Error fetching breakdown data:', error);
      }
    };

    fetchBreakdownData();
  }, [breakdownId]);

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleDone = () => {
    navigation.navigate('MaintenanceCriteria');
  };
  

  const handleOpenScanner = () => {
    navigation.navigate('BarcodeScannerScreen' as never);
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">{machineName}</Text>
        <TouchableOpacity onPress={handleOpenScanner}>
          <MaterialIcons name="qr-code-scanner" size={35} color="black" />
        </TouchableOpacity>
      </View>

      <View className="items-center flex-1 mt-10">
        <TouchableOpacity className="px-20 py-2 rounded-full bg-[#0d6000]">
          <Text className="text-lg font-bold text-center text-white">
            History of Breakdown
          </Text>
        </TouchableOpacity>

        {breakdownData ? (
          <View className="p-4 mt-8 bg-gray-100 border border-gray-300 rounded-lg shadow-2xl h-auto w-full">
            <View className="flex-row justify-between items-center">
              <Text className="mt-2 font-bold">Machine Name:</Text>
              <Text>{breakdownData.machinename}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="mt-2 font-bold items-center">Breakdown Reported:</Text>
              <Text>{new Date(breakdownData.timeReported).toLocaleString()}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="mt-2 font-bold items-center">Fixing Started:</Text>
              <Text>{new Date(breakdownData.fixingStartTime).toLocaleString()}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="mt-2 font-bold">Time Fixed:</Text>
              <Text>{new Date(breakdownData.timeFixed).toLocaleString()}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="mt-2 font-bold">Time Approved:</Text>
              <Text>{breakdownData.timeApproved === 'pending' ? 'Pending' : new Date(breakdownData.timeApproved).toLocaleString()}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="mt-2 font-bold">Updated At:</Text>
              <Text>{new Date(breakdownData.updatedAt).toLocaleString()}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="mt-2 font-bold">Impact of Breakdown:</Text>
              <Text>{breakdownData.impactofBreakdown.toUpperCase()}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="mt-2 font-bold">Scale of Breakdown:</Text>
              <Text>{breakdownData.scaleofBreakdown.toUpperCase()}</Text>
            </View>

            <View className="justify-between">
              <Text className="mt-2 font-bold">Description:</Text>
              <Text>{breakdownData.description}</Text>
            </View>

            <View className="justify-between">
              <Text className="mt-2 font-bold">Special Notes:</Text>
              <Text>{breakdownData.specialNote}</Text>
            </View>

            <View className="justify-between">
              <Text className="mt-2 font-bold">Technicians Involved:</Text>
              <Text>{breakdownData.participantstoFixed.join(', ')}</Text>
            </View>

            <View className="justify-between">
              <Text className="mt-2 font-bold">Used Materials:</Text>
              <Text>
                {breakdownData.usedMaterials.map((material: any, index: number) => (
                  <Text key={index}>
                    {material.materialname} - {material.quantity} {material.unit}
                  </Text>
                ))}
              </Text>
            </View>
          </View>
        ) : (
          <Text className="text-gray-500">Loading breakdown details...</Text>
        )}

        <View className="flex-row justify-between mt-auto mb-8 ml-2">
          <TouchableOpacity className="px-12 py-3 bg-[#0d6000] rounded-3xl ml-2" onPress={handleDone}>
            <Text
              className="text-lg font-bold text-white"
              style={{ letterSpacing: 2 }}
              
            >
              DONE
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

export default Breakdownfinish;
