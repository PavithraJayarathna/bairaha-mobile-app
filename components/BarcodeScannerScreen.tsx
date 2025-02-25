import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Vibration, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ActivityIndicator } from 'react-native-paper';
import { RootStackParamList } from '../types';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type MachinProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MachinProfile'
>;

interface Machine {
  _id: string;
  machinename: string;
}

const BarcodeScannerScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<MachinProfileScreenNavigationProp>();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get("https://bairaha-app-api.vercel.app/api/machine/get-machines");
        setMachines(response.data.machines);
      } catch (error) {
        console.error("Error fetching machines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  const handleBarCodeScanned = async ({ data }: { type: string; data: string }) => {
    if (scanned) return;
    setScanned(true);
    Vibration.vibrate();

    const machineExists = machines.some(machine => machine._id === data);
    
    if (machineExists) {
      navigation.navigate("MachinProfile", { machineId: data });
    } else {
      Alert.alert('Error', 'Invalid Machine ID. Please try again.');
    }

    // Reset scanning state after delay
    setTimeout(() => setScanned(false), 2000);
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white text-lg mt-4">Opening Camera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-red-500 text-lg">No access to camera</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Back Button */}
      <View className="absolute top-5 left-5 z-10">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left-long" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Scanner Title */}
      <View className="items-center mt-5 0 mb-2">
        <Text className="text-black text-xl font-bold">Scan a Machine QR Code</Text>
      </View>

      {/* Barcode Scanner */}
      <View className="flex items-center justify-center">
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ width: '100%', height: '100%'}}
        >
          {/* Scanner Frame */}
          <View className="h-full flex items-center justify-center relative">
            <View className="w-72 h-72 relative">
              {/* Top-Left Corner */}
              <View className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white" />
              
              {/* Top-Right Corner */}
              <View className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white" />
              
              {/* Bottom-Left Corner */}
              <View className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white" />
              
              {/* Bottom-Right Corner */}
              <View className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white" />
            </View>
          </View>
        </BarCodeScanner>
      </View>

      {/* Scan Again Button */}
      {scanned && (
        <TouchableOpacity
          onPress={() => setScanned(false)}
          className="absolute bottom-12 px-6 py-3 bg-green-600 rounded-full flex-row items-center self-center"
        >
          <MaterialIcons name="qr-code-scanner" size={24} color="white" />
          <Text className="text-white text-lg font-bold ml-2">Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BarcodeScannerScreen;
