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
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

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
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query

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
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  // Filter machines based on search query
  const filteredMachines = machines.filter((machine) =>
    machine.machinename.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <TextInput
          className="flex-1 text-lg"
          placeholder="Search"
          value={searchQuery} // Bind the input value to the state
          onChangeText={(text) => setSearchQuery(text)} // Update the search query on input change
        />
      </View>

      {/* Scrollable machine list */}
      <ScrollView>
        {filteredMachines.map((machine) => (
          <TouchableOpacity
            key={machine._id}
            className="flex-row items-center justify-between mb-2 ml-2"
            onPress={() => handleMachinProfile(machine._id)}
          >
            <View className="w-full px-28 py-7 mt-2 bg-[#0284c7] rounded-2xl pl-10">
              <Text className="text-lg font-bold text-white">
                {machine.machinename}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="mt-2">
        <Text className="text-center text-sm text-gray-500">— Scroll down for more —</Text>
      </View>
    </View>
  );
};

export default MachineList;
