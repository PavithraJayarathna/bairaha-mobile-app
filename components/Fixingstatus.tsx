import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 
type MachinefixedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Machinefixed'>;

import Machinefixed from '../components/Machinefixed';

interface RouteParams {
  machineName: string;
}

const Fixingstatus: React.FC = () => {

  const navigation = useNavigation<MachinefixedScreenNavigationProp>();
  
  const route = useRoute();
  const { machineName } = route.params as RouteParams;
  
  const handleMachinefixed = () => {
    navigation.navigate('Machinefixed', {machineName: machineName})
  };

  const handleGoBack = () => {
    navigation.goBack()
  };
  
    return (
      <View className='flex-1 p-4 bg-white'>
        
        <View className='flex-row items-center justify-between mb-4 ml-3 mr-3'>
          <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
          <View>
            <MaterialIcons name="qr-code-scanner" size={45} color="black" />
          </View>
          </TouchableOpacity>  
           </View>

           <View className='items-center '>
        <Text className='text-2xl font-bold text-black'>
          {machineName}
        </Text>
      </View>
    
    <View className='items-center flex-1 mt-10'>
      <TouchableOpacity className='px-20 py-2 bg-[#ecb500] rounded-full'>
        <Text className='text-lg font-bold text-center text-white'>
          Machine is being Fixing
        </Text>
      </TouchableOpacity>
      <View className='p-4 mt-16 bg-gray-100 border border-gray-300 rounded-lg shadow-2xl h-96'>
        
        <Text className='font-bold'>Scale of the breakdown</Text>
        <Text>Major breakdown</Text>

        <Text className='mt-4 font-bold'>
          Impact of breakdown on production
        </Text>
        <Text>High</Text>

        <Text className='mt-4 font-bold'>
          Description - Nature of the breakdown
        </Text>
        <Text>
          Machine is broken machine is broken machine is broken machine is
          broken machine is broken machine is broken machine is broken
        </Text>

        <Text className='mt-4 font-bold'>
          Breakdown reported time
        </Text>
        <Text>11:13 AM - 07/23/2024</Text>

        <Text className='mt-4 font-bold'>
          Fixing started time
        </Text>
        <Text>11:30 AM - 07/23/2024</Text>
      
    </View>

   
<TouchableOpacity className='flex-row items-center justify-between mt-10 mb-8' onPress={handleMachinefixed}>

<View className='px-20 py-3 bg-green-950 rounded-3xl' >
  <Text className='text-lg font-bold text-white'>
    Done Fixing
  </Text>  
</View>  


<View className='ml-2 '>
  <MaterialIcons name="keyboard-double-arrow-right" size={80} color="#052e16" />  
</View>  
</TouchableOpacity>


          
          
  </View>
  </View>
  );
};

export default  Fixingstatus;