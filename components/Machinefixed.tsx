import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 
type BreakdownfinishScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Breakdownfinish'>;

import Breakdownfinish  from '../components/Breakdownfinish';

const Machinefixed: React.FC = () => {
  
  const navigation = useNavigation<BreakdownfinishScreenNavigationProp>();
  const handleBreakdownfinish = () => {
    navigation.navigate('Breakdownfinish')
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
        <Text className='text-xl font-bold text-black'>
          Machine 1
        </Text>
      </View>
    
    <View className='items-center flex-1 mt-10 mb-4 '>
      <TouchableOpacity className='px-28 py-2 rounded-full bg-[#0d6000]'>
        <Text className='text-lg font-bold text-center text-white'>
          Machine is Fixed
        </Text>
      </TouchableOpacity> 
        </View>
        <View className="mx-4 mt-4 space-y-4">
        <View className="p-4 border rounded-lg">
          <Text className="mb-2 text-gray-500">Participants</Text>
          <TextInput
            placeholder="Add the participants"
            className="text-gray-700"
          />
          <TouchableOpacity className="absolute right-3 top-3">
          <Entypo name="circle-with-cross" size={24} color="black" />
  </TouchableOpacity>
        </View>
        </View>
        <View className="mx-4 mt-8 space-y-4">
        <View className="p-4 border rounded-lg">
          <Text className="mb-2 text-gray-500">Used materials</Text>
          <TextInput
            placeholder="Add the used materials"
            className="text-gray-700"
          /><TouchableOpacity className="absolute right-3 top-3">
          <Entypo name="circle-with-cross" size={24} color="black" />
        </TouchableOpacity>
          
        </View>
        </View>
        <View className="mx-4 mt-8 space-y-4 ">
        <View className="p-4 border rounded-lg">
          <Text className="mb-2 text-gray-500">Special notes</Text>
          <TextInput
            placeholder="Mention other important details"
            className="text-gray-700"
          />
          <TouchableOpacity className="absolute right-3 top-3">
          <Entypo name="circle-with-cross" size={24} color="black" />
  </TouchableOpacity>
        </View>
        </View>

        
        <View className="flex items-center mt-10">
        <Text className="mb-8 text-xl text-[#0d6000]">
          Waiting for Admin approval
        </Text>
        <TouchableOpacity className="px-12 py-3 mb-16 border-4 border-[#0d6000] rounded-full" onPress={handleBreakdownfinish }>
          <Text className="text-lg text-[#0d6000] ">Approve</Text>
        </TouchableOpacity>
      </View>
        </View>


        
  );
};

export default  Machinefixed;