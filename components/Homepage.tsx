import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

const Homepage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (!hasNavigated) {
          if (userToken) {
            navigation.navigate('MaintenanceCriteria');
          } else {
            navigation.navigate('Login');
          }
          setHasNavigated(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        navigation.navigate('Login');
      }
    };

    checkLoginStatus();
  }, [hasNavigated, navigation]);

  return (
    <View className='justify-between flex-1 p-10 bg-red-800'>
      <Text className='mt-12 text-4xl font-bold text-white'>
        Healthy Food. Healthy Living.
      </Text>
      <Text className='text-lg text-center text-white'>
        BAIRAHA FARMS PLC
      </Text>
    </View>
  );
};

export default Homepage;
