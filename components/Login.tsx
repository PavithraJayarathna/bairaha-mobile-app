import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {
  const [phone, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const toggleCheckbox = () => {
    setIsRememberMe(!isRememberMe);
  };

  const handleLogin = () => {
    navigation.navigate('MaintenanceCriteria');
  };

  return (
    <SafeAreaView className='justify-center flex-1 px-6 ml-2 mr-2 bg-white'>
      <View className='flex-row items-center justify-between mb-4'>
        <Text className='text-2xl font-extrabold'>Log In</Text>
        <TouchableOpacity>
          <Text className='text-sm text-gray-500 underline'>Reset password</Text>
        </TouchableOpacity>
      </View>
      <Text className='mt-8 mb-2 text-lg'>Phone Number</Text>
      <TextInput
        className='px-4 py-2 mb-4 border rounded border-[#0d6000]'
        placeholder="Phone Number"
        value={phone}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <Text className='mt-5 mb-2 text-lg'>Password</Text>
      <View className='flex-row items-center px-4 py-2 mb-4 border rounded border-[#0d6000]'>
        <TextInput
          className='flex-1'
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidePassword}
          autoCapitalize="none"
          autoComplete="password"
        />
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Text className='text-sm text-gray-500'>{hidePassword ? 'Show' : 'Hide'}</Text>
        </TouchableOpacity>
      </View>
      <View className='flex-row items-center mb-6'>
        <TouchableOpacity 
          onPress={toggleCheckbox} 
          className={`h-6 w-6 border-2 rounded ${isRememberMe ? 'bg-[#0d6000]' : 'bg-white'} border-gray-300`}
          accessibilityLabel="Remember me checkbox"
          accessibilityHint="Toggles remembering your login information"
        >
          {isRememberMe && (
            <FontAwesomeIcon icon={faCheck} size={20} color="#fff" />
          )}
        </TouchableOpacity>
        <Text className='ml-2 text-sm text-gray-700'>Remember me</Text>
      </View>
      <TouchableOpacity 
        className='py-3 rounded-full bg-[#bf111a] mt-28'
        onPress={handleLogin}
      >
        <Text className='text-lg font-bold text-center text-white'>Log In</Text>
      </TouchableOpacity>
      <View className='flex-row justify-center mt-6'>
        <Text className='text-sm text-gray-700'>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Sign')}>
          <Text className='text-sm text-[#bf111a] font-bold'>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;









