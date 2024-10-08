import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 

type ReportbreakdownScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Reportbreakdown'>;

interface RouteParams {
  machineName: string;
}

const BreakdownService: React.FC = () => {
  const navigation = useNavigation<ReportbreakdownScreenNavigationProp>();
  const route = useRoute();
  const {machineName } = route.params as RouteParams; // Get machineName from params

  const handleReportbreakdown = () => {
    navigation.navigate('Reportbreakdown', {machineName: machineName });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleOpenScanner = () => {
    navigation.navigate('BarcodeScannerScreen');
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

      <View className='items-center mb-4'>
        <Text className='text-2xl font-bold text-black'>
          {machineName}
        </Text>
      </View>

      <View className='items-center flex-1 p-5'>
        <View className='h-full rounded-lg px-10 bg-[#d9d9d9]'>
          <Text className='mx-auto my-auto text-lg text-black'>
            Image of the machine
          </Text>
        </View>
      </View>

      <View className='items-center'>
        <TouchableOpacity className='flex-row w-full px-28 mt-4 mb-5 bg-[#bf111a] py-8 rounded-2xl' onPress={handleReportbreakdown}>
          <Text className='text-xl font-semibold text-white'>Breakdown</Text>
          <Text className='ml-4 text-2xl text-white'>🔧</Text>
        </TouchableOpacity>
      </View>

      <View className='items-center'>
        <TouchableOpacity className='flex-row w-full px-28 mt-4 mb-4 bg-[#bf111a] py-5 rounded-2xl'>
          <Text className='text-xl font-semibold text-white'>Scheduled Maintenance</Text>
          <Text className='ml-4 text-2xl text-white'>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View className='items-center'>
        <TouchableOpacity className='flex-row w-full px-28 mt-4 mb-16 bg-[#bf111a] py-8 rounded-2xl'>
          <Text className='text-xl font-semibold text-white'>Inventory</Text>
          <Text className='ml-4 text-2xl text-white'>📦</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BreakdownService;
