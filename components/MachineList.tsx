import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types"; // Adjust the path as needed
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';

type MachinProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MachinProfile"
>;

interface Machine {
  _id: string;
  machinename: string;
}

const MachineList: React.FC = () => {
  const navigation = useNavigation<MachinProfileScreenNavigationProp>();
  
  const handleMachinProfile = (id: string) => {
    navigation.navigate("MachinProfile", { machineId: id });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get(
          "https://bairaha-app-api.vercel.app/api/machine/get-machines"
        );
        setMachines(response.data.machines);
      } catch (error) {
        console.error("Error fetching machines:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchMachines();
  }, []);

  if (loading) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" color="#bf111a" />
      </View>
    );
  }
  const handleOpenScanner = () => {
    navigation.navigate('BarcodeScannerScreen');
  };
  return (
    <View className="flex-1 p-4 bg-white">
      {/* Header with back button and QR code */}
      <View className="flex-row items-center justify-between mb-4 ml-3 mr-3">
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenScanner}>
          <View>
            <MaterialIcons name="qr-code-scanner" size={45} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View className="flex-row items-center p-2 mt-3 mb-10 bg-gray-200 rounded-full">
        <EvilIcons
          name="search"
          size={30}
          color="black"
          style={{ marginRight: 10 }}
        />
        <TextInput className="flex-1 text-lg" placeholder="Search" />
      </View>

      {/* Machine list */}
      <ScrollView>
        {machines.map((machine) => (
          <TouchableOpacity
            key={machine._id}
            className="flex-row items-center justify-between mb-2 ml-2"
            onPress={() => handleMachinProfile(machine._id)}
          >
            <View className="w-full px-28 py-7 mt-5 bg-[#bf111a] rounded-2xl pl-10">
              <Text className="text-lg font-bold text-white">
                {machine.machinename}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="flex-row justify-center mt-10 mb-10">
        <TouchableOpacity>
          <AntDesign name="downcircleo" size={55} color="#bf111a" />
        </TouchableOpacity>
      </View>

      {/* Bottom icons */}
      <View className="flex-row justify-around">
        <TouchableOpacity>
          <FontAwesome6 name="add" size={45} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="delete" size={45} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="edit" size={45} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MachineList;
