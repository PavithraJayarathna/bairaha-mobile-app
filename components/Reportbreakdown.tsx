import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Picker } from '@react-native-picker/picker'; 
import React, { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 

type StartfixingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Startfixing'>;

interface RouteParams {
  machineName: string;
}

const Reportbreakdown: React.FC = () => {
  const navigation = useNavigation<StartfixingScreenNavigationProp>();
  const route = useRoute();
  const { machineName } = route.params as RouteParams; // Get machineName from params

  const handleStartfixing = () => {
    navigation.navigate('Startfixing', {machineName: machineName});
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleOpenScanner = () => {
    navigation.navigate('BarcodeScannerScreen');
  };
  
  const [selectedScale, setSelectedScale] = useState("");
  const [selectedImpact, setSelectedImpact] = useState("");

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

      <View className='items-center'>
        <Text className='text-2xl font-bold text-black'>
          {machineName}
        </Text>
      </View>
    
      <View className='items-center flex-1 mt-10'>
        <TouchableOpacity className='px-20 py-2 rounded-full bg-green-950'>
          <Text className='text-lg font-bold text-center text-white'>
            History of Breakdowns
          </Text>
        </TouchableOpacity>
      </View>

      <View className='w-full mb-8'>
        <Text className='mb-2 text-gray-600'>Scale of the breakdown</Text>
        <View className='border border-gray-300 rounded-lg'>
          <Picker
            selectedValue={selectedScale}
            onValueChange={(itemValue) => setSelectedScale(itemValue)}
            className='p-2'
          >
            <Picker.Item label="High" value="high" />
            <Picker.Item label="Low" value="low" />
          </Picker>
        </View>
      </View>
      
      <View className='w-full mb-10'>
        <Text className='mb-2 text-gray-600'>Impact of breakdown on production</Text>
        <View className='border border-gray-300 rounded-lg'>
          <Picker
            selectedValue={selectedImpact}
            onValueChange={(itemValue) => setSelectedImpact(itemValue)}
            className='p-2'
          >
            <Picker.Item label="High" value="high" />
            <Picker.Item label="Low" value="low" />
          </Picker>
        </View>
      </View>

      <View className='p-4 mb-10 border-2 border-gray-300 rounded-lg'>
        <Text className='mb-2 text-gray-500'>Briefly describe the nature of the breakdown</Text>
        <TextInput
          placeholder="Description"
          className='text-gray-700'
        />
        <TouchableOpacity className='absolute right-3 top-3'>
          <Entypo name="circle-with-cross" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity className='flex-row items-center justify-between mt-10 mb-8 ml-0 mr-0' onPress={handleStartfixing}>
        <View className='px-8 py-3 bg-[#bf111a] rounded-3xl'>
          <Text className='text-xl font-bold text-white'style={{letterSpacing:2}}>
            REPORT BREAKDOWN
          </Text>  
        </View>  
        <View className='ml-0'>
          <MaterialIcons name="keyboard-double-arrow-right" size={80} color="#bf111a"  />  
        </View>
      </TouchableOpacity>
      
    </View>
  );
};

export default Reportbreakdown;
