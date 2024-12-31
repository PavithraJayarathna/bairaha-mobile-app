import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { signInFailure, signInSuccess, signInStart } from '../assets/redux/user/userSlice';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {
  const [phonenumber, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();

  const toggleCheckbox = () => {
    setIsRememberMe(!isRememberMe);
  };

  const handleLogin = async () => {
    if (!phonenumber || !password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }

    try {
      dispatch(signInStart());
      const response = await axios.post(
        'https://bairaha-app-api.vercel.app/api/auth/signin',
        { phonenumber, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log(response.status >= 200 && response.status < 300);

      if (response.status >= 200 && response.status < 300) {
        dispatch(signInSuccess(response.data));
        navigation.navigate('MaintenanceCriteria');

      } else {
        dispatch(signInFailure(response.data.message || 'Login failed'));
        Alert.alert('Login Failed', response.data.message || 'Invalid credentials.');
      }
      
    } catch (error: any) {
      const errMessage = error.response?.data?.message || error.message || 'An error occurred';
      dispatch(signInFailure(errMessage));
      Alert.alert('Login Failed', errMessage);
    }
  };

  return (
    <SafeAreaView className="justify-center flex-1 px-6 ml-2 mr-2 bg-white">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-extrabold">Log In</Text>
        <TouchableOpacity>
          <Text className="text-sm text-gray-500 underline">Reset password</Text>
        </TouchableOpacity>
      </View>
      <Text className="mt-8 mb-2 text-lg">Phone Number</Text>
      <TextInput
        className="px-4 py-2 mb-4 border rounded border-[#0d6000]"
        placeholder="Phone Number"
        value={phonenumber}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        autoComplete="tel"
      />
      <Text className="mt-5 mb-2 text-lg">Password</Text>
      <View className="flex-row items-center px-4 py-2 mb-4 border rounded border-[#0d6000]">
        <TextInput
          className="flex-1"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidePassword}
          autoCapitalize="none"
          autoComplete="password"
        />
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Text className="text-sm text-gray-500">{hidePassword ? 'Show' : 'Hide'}</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center mb-6">
        <TouchableOpacity
          onPress={toggleCheckbox}
          className={`h-6 w-6 border-2 rounded ${
            isRememberMe ? 'bg-[#0d6000] border-[#0d6000]' : 'bg-white border-gray-300'
          }`}
          accessibilityLabel="Remember me checkbox"
          accessibilityHint="Toggles remembering your login information"
        >
          {isRememberMe && <FontAwesomeIcon icon={faCheck} size={20} color="#fff" />}
        </TouchableOpacity>
        <Text className="ml-2 text-sm text-gray-700">Remember me</Text>
      </View>
      <TouchableOpacity
        className="py-3 rounded-full bg-[#bf111a] mt-28"
        onPress={handleLogin}
      >
        <Text className="text-lg font-bold text-center text-white">Log In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
