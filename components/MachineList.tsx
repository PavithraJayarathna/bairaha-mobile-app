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
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { Picker } from '@react-native-picker/picker';

type MachinProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MachinProfile"
>;

interface Machine {
  _id: string;
  machinename: string;
  section: string;
}

const MachineList: React.FC = () => {
  const navigation = useNavigation<MachinProfileScreenNavigationProp>();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [sections, setSections] = useState<string[]>([]);
  const [notificationCount, setNotificationCount] = useState(1);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get(
          "https://bairaha-app-api.vercel.app/api/machine/get-machines"
        );
        setMachines(response.data.machines);

        // Extract unique sections from machines
        const uniqueSections = Array.from(
          new Set(response.data.machines.map((machine: Machine) => machine.section))
        ) as string[];
        setSections(uniqueSections); // Update sections state with unique sections
      } catch (error) {
        console.error("Error fetching machines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  // Filter machines based on search query and selected section
  const filteredMachines = machines.filter((machine) => {
    const matchesQuery = machine.machinename
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSection = selectedSection
      ? machine.section === selectedSection
      : true; // If no section is selected, include all machines
    return matchesQuery && matchesSection;
  });

  if (loading) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" color="#bf111a" />
      </View>
    );
  }

  const handleMachinProfile = (id: string, machinename:string) => {
    navigation.navigate("MachinProfile", { machineId: id});
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenScanner = () => {
    navigation.navigate("BarcodeScannerScreen");
  };

  return (
    <View className="flex-1 px-4 py-6 bg-white">
      <View className="flex-row items-center justify-between mb-4 bg-gray-100 rounded-full">
        
        <TouchableOpacity 
          onPress={handleGoBack}
          className="p-4 bg-gray-200 rounded-full shadow-md">
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Machines</Text>

        {/* Notification Bell with Badge */}
        <View className="relative">
          <TouchableOpacity
            onPress={() => console.log("Open Notifications")} 
            className="mr-1"
          >
            <MaterialIcons name="notifications" size={35} color="#000" />
          </TouchableOpacity>

          {/* Red Notification Badge */}
          {notificationCount > 0 && (
            <View className="absolute top-0 right-0 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center">
              <Text className="text-white text-xs font-bold">{notificationCount}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity onPress={handleOpenScanner}
          className="p-3 bg-gray-200 rounded-full shadow-md">
          <MaterialIcons name="qr-code-scanner" size={32} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View className="flex-row items-center p-2 mt-2 mb-2 bg-gray-200 rounded-full">
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

        <View className="bg-white rounded-full border border-gray-300 overflow-hidden mb-2 justify-center">
          <Picker
            selectedValue={selectedSection}
            onValueChange={(itemValue) => setSelectedSection(itemValue)}
            style={{ height: 40, width: "100%" }}
          >
            <Picker.Item label="All Sections" value="" />
            {sections.map((section) => (
              <Picker.Item key={section} label={section} value={section} />
            ))}
          </Picker>
        </View>

      {/* Scrollable machine list */}
      <ScrollView>
        {filteredMachines.map((machine) => (
          <TouchableOpacity
            key={machine._id}
            className="flex-row items-center justify-between"
            onPress={() => handleMachinProfile(machine._id, machine.machinename)}
          >
            <View className="w-full py-6 mt-2 bg-[#bf111a] rounded-2xl">
              <Text className="text-xl font-semibold text-white text-center">
                {machine.machinename}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>
  );
};

export default MachineList;
