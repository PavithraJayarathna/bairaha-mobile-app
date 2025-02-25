import React, { useState, useCallback} from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  BackHandler, 
  Alert 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { signoutSuccess } from '../assets/redux/user/userSlice';
import { StatusBar } from "react-native";
import NotificationBell from '../components/NotificationBell';

type MaintenanceCriteriaNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MachineList' | 'OngoingActionsList' | 'MyActionsList' | 'ScheduledMaintenanceList' | 'Login'
>;

const MaintenanceCriteria: React.FC = () => {
  const navigation = useNavigation<MaintenanceCriteriaNavigationProp>();
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isExitModalVisible, setExitModalVisible] = useState(false); // Modal for exit confirmation

  const { currentUser } = useSelector((state: any) => state.user);

  const [notificationCount, setNotificationCount] = useState(1);


  

  useFocusEffect(
    useCallback(() => {
      // Set StatusBar color when screen is focused
      StatusBar.setBackgroundColor("#ffffff");
      StatusBar.setBarStyle("dark-content"); // Ensure proper text color
  
      const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
  
      // Add back button event listener
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => {
        // Reset StatusBar color when leaving screen
        StatusBar.setBackgroundColor("#FFFFFF");
        StatusBar.setBarStyle("dark-content");
  
        // Remove back button event listener
        backHandler.remove();
      };
    }, [])
  );

  const handleMachineList = () => {
    navigation.navigate('MachineList');
  };

  const handleOngoingActionList = () => {
    navigation.navigate('OngoingActionsList');
  };

  const handleMyActionList = () => {
    navigation.navigate('MyActionsList');
  };

  const handleScheduledMaintenance = () => {
    navigation.navigate('ScheduledMaintenanceList');
  };

  const handleSignOut = () => {
    dispatch(signoutSuccess()); // Clear user data from Redux store
    setModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Reset navigation stack
    });
  };

  const handleOpenScanner = () => {
    navigation.navigate('BarcodeScannerScreen');
  };

  
  return (
    
    <View className="flex-1 p-0 bg-gray-100">
      
      <View className="flex-row items-center justify-between mb-4 p-3 bg-white rounded-b-3xl">
        {/* Role */}
        <View className="flex-row items-center justify-center bg-[#0d6000] rounded-full px-3 py-1"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.8,
            shadowRadius: 4,
            elevation: 10,
          }}>
          <Text className="text-base text-white font-semibold">{currentUser.role}</Text>
        </View>

        <View className="flex-row items-center justify-between bg-white py-2">
          
          <NotificationBell onPress={() => console.log("Open Notifications")} />


          {/* User Profile */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="flex-row items-center bg-[#0d6000] rounded-full px-2 py-1"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.8,
              shadowRadius: 4,
              elevation: 10,
            }}
          >
            <Text className="text-base font-semibold text-white">
              {currentUser?.firstname || 'Testing User'}
            </Text>
            <MaterialIcons name="person" size={28} color="white" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>

      
    </View>


      <View className="flex-row items-center justify-between m-2 mb-10 px-4 py-5 bg-white rounded-2xl shadow-lg">
        <View className="flex-1">
          <Text className="text-sm font-semibold text-gray-700">
          Use this scanner to scan the QR code on the machine for direct access to its profile.
          </Text>
        </View>

        {/* QR Scanner */}
        <TouchableOpacity
          onPress={handleOpenScanner}
          className="p-4 bg-gray-100 rounded-full shadow-md"
        >
          <MaterialIcons name="qr-code-scanner" size={40} color="black" />
        </TouchableOpacity>
      </View>

      <View className='m-4 justify-end flex-1'>
          {/* Navigation Buttons */}
          <View className="mt-2">
            <TouchableOpacity
              className="flex-row items-center bg-[#0d6000] rounded-2xl py-8 pl-4"
              onPress={handleMachineList}
            >
              <MaterialCommunityIcons name="robot-industrial" size={40} color="white" style={{ marginRight: 20 }} />
              <Text className="text-2xl font-bold text-white">Machines</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-2">
            <TouchableOpacity
              className="flex-row items-center bg-[#0d6000] rounded-2xl py-8 pl-4"
              onPress={handleOngoingActionList}
            >
              <AntDesign name="barschart" size={40} color="white" style={{ marginRight: 20 }} />
              <Text className="text-2xl font-bold text-white">Ongoing Actions</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-2">
            <TouchableOpacity
              className="flex-row items-center bg-[#0d6000] rounded-2xl py-8 pl-4"
              onPress={handleMyActionList}
            >
              <MaterialCommunityIcons name="clipboard-check-outline" size={40} color="white" style={{ marginRight: 20 }} />
              <Text className="text-2xl font-bold text-white">My Actions</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-2">
            <TouchableOpacity
              className="flex-row items-center bg-[#0d6000] rounded-2xl py-8 pl-4"
              onPress={handleScheduledMaintenance}
            >
              <MaterialCommunityIcons name="calendar-month" size={40} color="white" style={{ marginRight: 20 }} />
              <Text className="text-2xl font-bold text-white">Scheduled Maintenance</Text>
            </TouchableOpacity>
          </View>
      </View>
      

      {/* Logout Modal */}
      <Modal
        animationType="none"
        transparent
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text className="text-lg font-semibold pb-4">Do you want to Log Out?</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleSignOut}>
              <Text className="text-white text-lg">Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButtonSecondary} onPress={() => setModalVisible(false)}>
              <Text className="text-black text-lg">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    width: '80%',
    alignItems: 'center',
  },
  modalButtonSecondary: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
});

export default MaintenanceCriteria;
