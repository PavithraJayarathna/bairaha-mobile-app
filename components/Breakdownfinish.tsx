import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { useNavigation } from 'expo-router'; // This is specific to expo-router
import { useRoute } from '@react-navigation/native';

interface RouteParams {
  machineName: string;
}

const Breakdownfinish: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { machineName } = route.params as RouteParams;

  const handleGoBack = () => {
    navigation.goBack();
  };

  // Ensure 'BarcodeScannerScreen' is properly defined in your router
  const handleOpenScanner = () => {
    navigation.navigate('BarcodeScannerScreen' as never); // explicitly casting to avoid typing issues
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row items-center justify-between mb-4 ml-3 mr-3">
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenScanner}>
          <View>
            <MaterialIcons name="qr-code-scanner" size={45} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <View className="items-center">
        <Text className="text-xl font-bold text-black">{machineName}</Text>
      </View>

      <View className="items-center flex-1 mt-10">
        <TouchableOpacity className="px-20 py-2 rounded-full bg-[#0d6000]">
          <Text className="text-lg font-bold text-center text-white">
            History of Breakdowns
          </Text>
        </TouchableOpacity>

        <View className="p-4 mt-16 bg-gray-100 border border-gray-300 rounded-lg shadow-2xl h-96">
          <Text className="mt-4 font-bold">Date and Time of Breakdown:</Text>
          <Text>11:13 AM - 07/23/2024</Text>

          <Text className="mt-4 font-bold">Cause of Breakdown:</Text>
          <Text>
            Provide details on what caused the breakdown, whether it was
            mechanical, electrical, etc.
          </Text>

          <Text className="mt-4 font-bold">Resolution Details</Text>
          <Text>
            Include what actions were taken to resolve the breakdown, such as
            repairs, parts replaced, or system reboots
          </Text>

          <Text className="mt-4 font-bold">Technician Information</Text>
          <Text>
            Display who attended to the breakdown, including their name and
            contact details
          </Text>
        </View>

        <View className="flex-row items-center justify-between mt-auto mb-8 ml-2">
          <TouchableOpacity className="px-12 py-3 bg-[#0d6000] rounded-3xl ml-2">
            <Text
              className="text-lg font-bold text-white"
              style={{ letterSpacing: 2 }}
            >
              DOWNLOAD REPORT
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="ml-0">
            <MaterialIcons
              name="keyboard-double-arrow-right"
              size={80}
              color="#0d6000"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Breakdownfinish;



