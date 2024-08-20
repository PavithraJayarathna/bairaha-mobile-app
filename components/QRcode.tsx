import React, { useState, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { Camera, CameraType, BarcodeScanningResult } from 'expo-camera'; // Ensure you have the correct imports
import { CameraType as ct} from 'expo-camera/build/legacy/Camera.types';

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const cameraRef = useRef<typeof Camera| null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    setScanned(true);
    Alert.alert(`Bar code with type ${result.type} and data ${result.data} has been scanned!`);
  };

  const renderCamera = () => {
    return (
      <View className="w-4/5 mb-10 overflow-hidden rounded-lg aspect-square">
        <Camera
          ref={cameraRef}
          className="flex-1"
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          type={ct.back} // Use CameraType.Back for the back camera
        >
          <View className="flex-1" />
        </Camera>
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View className="items-center justify-center flex-1">
        <Text className="text-lg text-gray-700">Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View className="items-center justify-center flex-1 p-4">
      <Text className="mb-5 text-2xl font-bold">Welcome to the Barcode Scanner App!</Text>
      <Text className="mb-10 text-lg">Scan a barcode to start your job.</Text>
      {renderCamera()}
      <TouchableOpacity
        className={`bg-blue-500 px-5 py-2 rounded ${scanned ? 'opacity-50' : ''}`}
        onPress={() => setScanned(false)}
        disabled={scanned}
      >
        <Text className="text-lg font-bold text-white">Scan QR to Start your job</Text>
      </TouchableOpacity>
    </View>
  );
}
