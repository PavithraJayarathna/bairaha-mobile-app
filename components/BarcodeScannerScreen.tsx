import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

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
  const navigation = useNavigation<MachinProfileScreenNavigationProp>();
  const [loading, setLoading] = useState(true);

  
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


  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string; }) => {

    if(scanned) return;

    setScanned(true);
    
    
    const validateMachineId = () => {
      const machineExists = machines.some(machine => machine._id === data);
      if (machineExists) {
        setScanned(false);
        navigation.navigate("MachinProfile", { machineId: data });
      } else {
      
        Alert.alert('Error', 'Invalid Machine ID. Please try again.');
        setScanned(true);
      }
    };
    
    validateMachineId();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <BarCodeScanner
        
        onBarCodeScanned = {scanned ? undefined: handleBarCodeScanned}
        style={{ width: '100%', height: '80%' }}
      />

      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default BarcodeScannerScreen;



