import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const BarcodeScannerScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
    setScanned(true);

    // Limiting the length of data to avoid display issues
    const displayData = data.length > 50 ? `${data.substring(0, 47)}...` : data;

    if (data.startsWith('http://') || data.startsWith('https://')) {
      // If the scanned data is a URL, open it
      Linking.openURL(data).catch((err) =>
        Alert.alert('Error', 'Failed to open the URL.')
      );
    } else {
      // If not a URL, display the scanned data in an alert
      Alert.alert(
        "Scanned Barcode",
        `Bar code with type ${type} and data ${displayData} has been scanned!`,
        [{ text: "OK", onPress: () => setScanned(false) }]
      );
    }
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
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ width: '100%', height: '80%' }}
      />
      {scanned && (
        <Button
          title={'Tap to Scan Again'}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  );
};

export default BarcodeScannerScreen;


