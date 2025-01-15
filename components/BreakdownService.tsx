import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 

type ReportbreakdownScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Reportbreakdown'>;

interface RouteParams {
  machineId: string;
  machineName: string;
}

const BreakdownService: React.FC = () => {
  const navigation = useNavigation<ReportbreakdownScreenNavigationProp>();
  const route = useRoute();
  const { machineId, machineName } = route.params as RouteParams; // Get machineId and machineName from params

  const handleReportbreakdown = () => {
    navigation.navigate('Reportbreakdown', { machineId, machineName });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleOpenScanner = () => {
    navigation.navigate('BarcodeScannerScreen');
  };

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

  
      <View className='items-center flex-1 p-5'>
        <View className='h-full rounded-lg px-10 bg-[#d9d9d9]'>
          <Text className='mx-auto my-auto text-lg text-black'>
            Image of the machine
          </Text>
        </View>
      </View>

      <View className='flex-1 justify-center items-center'>
        <View className='w-11/12'>
          <TouchableOpacity 
            className='flex-row justify-between items-center bg-[#bf111a] py-5 px-6 rounded-2xl mb-4'
            onPress={handleReportbreakdown}
          >
            <Text className='text-xl font-semibold text-white'>Breakdown</Text>
            <Text className='text-2xl text-white'>🔧</Text>
          </TouchableOpacity>
        </View>

        <View className='w-11/12'>
          <TouchableOpacity 
            className='flex-row justify-between items-center bg-[#bf111a] py-5 px-6 rounded-2xl mb-4'
          >
            <Text className='text-xl font-semibold text-white'>Scheduled Maintenance</Text>
            <Text className='text-2xl text-white'>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* <View className='w-11/12'>
          <TouchableOpacity 
            className='flex-row justify-between items-center bg-[#bf111a] py-5 px-6 rounded-2xl mb-4'
          >
            <Text className='text-xl font-semibold text-white'>Inventory</Text>
            <Text className='text-2xl text-white'>📦</Text>
          </TouchableOpacity>
        </View> */}
      </View>

    </View>
  );
};

export default BreakdownService;
