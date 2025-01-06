import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

import { signoutSuccess } from '../assets/redux/user/userSlice';

type MachineListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MachineList'>;

const MaintenanceCriteria: React.FC = () => {
  const navigation = useNavigation<MachineListScreenNavigationProp>();
  const dispatch = useDispatch();

  // State for controlling the modal visibility
  const [isModalVisible, setModalVisible] = useState(false);

  // Access currentUser from the Redux store
  const { currentUser } = useSelector((state: any) => state.user);

  const handleMachineList = () => {
    navigation.navigate('MachineList');
  };

  const handleSignOut = () => {
    dispatch(signoutSuccess(currentUser));
    setModalVisible(false);
    navigation.navigate('Login');
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row items-center justify-between mb-4 ml-3 mr-3">
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="flex-row items-center justify-center"
        >
          <Text className="text-xl font-bold">{currentUser?.firstname || 'Testin user'}</Text>
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
            <Text className="text-xl font-bold mb-4">Sign Out</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleSignOut}>
              <Text className="text-base text-white">Sign Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButtonSecondary} onPress={() => setModalVisible(false)}>
              <Text className="text-base text-black">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View className="flex-1 bg-white">
        <View className="items-center mt-8 mb-5">
          <Text className="text-3xl font-semibold">Your Sector</Text>
        </View>

        <View className="mt-20">
          <TouchableOpacity
            className="flex-row items-center bg-[#0d6000] rounded-2xl p-7"
            onPress={handleMachineList}
          >
            <MaterialCommunityIcons name="robot-industrial" size={35} color="white" style={{ marginRight: 20 }} />
            <Text className="text-xl font-bold text-white">Machines</Text>
            <View className="items-center justify-center h-8 ml-auto bg-[#bf111a] rounded-2xl w-8">
              <Text className="text-xs text-white">{12}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Inventory Section */}
        <View className="mt-10">
          <TouchableOpacity className="flex-row items-center bg-[#0d6000] rounded-2xl p-7">
            <MaterialIcons name="inventory" size={35} color="white" style={{ marginRight: 20 }} />
            <Text className="text-xl font-bold text-white">Inventory</Text>
            <View className="items-center justify-center h-8 ml-auto bg-[#bf111a] rounded-2xl w-8">
              <Text className="text-xs text-white">{8}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Ongoing Actions Section */}
        <View className="mt-10">
          <TouchableOpacity className="flex-row items-center bg-[#0d6000] rounded-2xl p-7">
            <AntDesign name="barschart" size={35} color="white" style={{ marginRight: 20 }} />
            <Text className="text-xl font-bold text-white">Ongoing Actions</Text>
            <View className="items-center justify-center h-8 ml-auto bg-[#bf111a] rounded-2xl w-8">
              <Text className="text-xs text-white">{15}</Text>
            </View>
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
