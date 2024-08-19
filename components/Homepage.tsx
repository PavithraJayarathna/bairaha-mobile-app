import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

import Login  from '../components/Login';

import { RootStackParamList } from '../types'; // Adjust the path as necessary
import { useNavigation, NavigationProp } from '@react-navigation/native';


const Homepage = (props: any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  

  useEffect(() => {
    
    const timer = setTimeout(() => {
      navigation.navigate('Login'); 
    }, 300);

    
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View className='justify-between flex-1 p-10 bg-red-800'>
     
        <Text className='mt-12 text-4xl font-bold text-white'>
          Healthy Food. Healthy Living.
        </Text>
        
        <Text className='text-lg text-center text-white ' >
          BAIRAHA FARMS PLC
        </Text>
      
     
    </View>
  );
};

export default Homepage; 


