import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, BackHandler, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { signoutSuccess } from '../assets/redux/user/userSlice';

type MaintenanceCriteriaNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MachineList' | 'OngoingActionsList' | 'MyActionsList' | 'Login'
>;

const MaintenanceCriteria: React.FC = () => {
  const navigation = useNavigation<MaintenanceCriteriaNavigationProp>();
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);

  const { currentUser } = useSelector((state: any) => state.user);

  const handleMachineList = () => {
    navigation.navigate('MachineList');
  };

  const handleOngoingActionList = () => {
    navigation.navigate('OngoingActionsList');
  };

  const handleMyActionList = () => {
    navigation.navigate('MyActionsList');
  };

  const handleSignOut = () => {
    dispatch(signoutSuccess(currentUser));
    setModalVisible(false);
    navigation.navigate('Login');
  };

  useEffect(() => {
    const onBackPress = () => {
      if (navigation.isFocused()) { 
        Alert.alert(
          'Exit Page',
          'Are you sure you want to exit?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Exit', onPress: () => navigation.goBack() }, 
          ],
          { cancelable: false }
        );
        return true;
      }
      return false;
    };
  
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
    return () => {
      backHandler.remove(); 
    };
  }, [navigation]);
  

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row items-center justify-between mb-4 ml-3 mr-3">
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="flex-row items-center justify-center"
        >
          <Text className="text-xl font-bold">
            {currentUser?.firstname || 'Testing User'}
          </Text>
          <MaterialIcons name="person" size={35} color="black" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text className="mb-4 text-xl font-bold">Sign Out</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleSignOut}>
              <Text className="text-base text-white">Sign Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonSecondary}
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-base text-black">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View className="flex-1 bg-white">
        <View className="items-center mt-8 mb-5">
          <Text className="text-3xl font-semibold">{`Welcome, ${currentUser?.firstname || 'User'}!`}</Text>
          {currentUser?.email && (
            <Text className="text-lg text-gray-600">{currentUser.email}</Text>
          )}
          {currentUser?.role && (
            <Text className="mt-2 text-gray-500 text-md">{`Role: ${currentUser.role}`}</Text>
          )}
        </View>

        <View className="mt-20">
          <TouchableOpacity
            className="flex-row items-center bg-[#0d6000] rounded-2xl p-7"
            onPress={handleMachineList}
          >
            <MaterialCommunityIcons name="robot-industrial" size={35} color="white" style={{ marginRight: 20 }} />
            <Text className="text-xl font-bold text-white">Machines</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-10">
          <TouchableOpacity
            className="flex-row items-center bg-[#0d6000] rounded-2xl p-7"
            onPress={handleOngoingActionList}
          >
            <AntDesign name="barschart" size={35} color="white" style={{ marginRight: 20 }} />
            <Text className="text-xl font-bold text-white">Ongoing Actions</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-10">
          <TouchableOpacity
            className="flex-row items-center bg-[#0d6000] rounded-2xl p-7"
            onPress={handleMyActionList}
          >
            <MaterialIcons name="inventory" size={35} color="white" style={{ marginRight: 20 }} />
            <Text className="text-xl font-bold text-white">My Actions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#bf111a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  modalButtonSecondary: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
});

export default MaintenanceCriteria;
