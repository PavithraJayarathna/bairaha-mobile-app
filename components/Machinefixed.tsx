import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { RootStackParamList } from '../types';

type BreakdownfinishScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Breakdownfinish'
>;

interface RouteParams {
  machineName: string;
}

interface User {
  id: string;
  name: string;
}

const Machinefixed: React.FC = () => {
  const navigation = useNavigation<BreakdownfinishScreenNavigationProp>();
  const route = useRoute();
  const { machineName } = route.params as RouteParams;

  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [materialsList, setMaterialsList] = useState<
    { material: string; amount: string }[]
  >([]);
  const [participants, setParticipants] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://bairaha-app-api.vercel.app/api/users`
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleBreakdownfinish = () => {
    navigation.navigate('Breakdownfinish', { machineName });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenScanner = () => {
    navigation.navigate('BarcodeScannerScreen');
  };

  const handleAddMaterial = () => {
    if (selectedMaterial && amount) {
      const updatedMaterialsList = materialsList.map((item) =>
        item.material === selectedMaterial
          ? { ...item, amount: (parseFloat(item.amount) + parseFloat(amount)).toString() }
          : item
      );

      if (updatedMaterialsList.some((item) => item.material === selectedMaterial)) {
        setMaterialsList(updatedMaterialsList);
      } else {
        setMaterialsList([...materialsList, { material: selectedMaterial, amount }]);
      }

      setSelectedMaterial('');
      setAmount('');
    }
  };

  const handleRemoveMaterial = (material: string) => {
    setMaterialsList(materialsList.filter((item) => item.material !== material));
  };

  const handleParticipantSelect = (participant: User) => {
    if (!selectedParticipants.some((p) => p.id === participant.id)) {
      setSelectedParticipants([...selectedParticipants, participant]);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 p-4 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenScanner}>
          <MaterialIcons name="qr-code-scanner" size={45} color="black" />
        </TouchableOpacity>
      </View>

      {/* Machine Name */}
      <Text className="text-2xl font-bold text-center text-black">{machineName}</Text>

      {/* Fixed Button */}
      <TouchableOpacity className="px-8 py-3 mt-6 rounded-full bg-green-700">
        <Text className="text-lg font-bold text-center text-white">Machine is Fixed</Text>
      </TouchableOpacity>

      <ScrollView className="mt-4">
        {/* Add Participants */}
        <View className="mb-6">
          <Text className="text-lg font-bold">Add Participants:</Text>
          <TextInput
            placeholder="Search participants"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="border border-gray-300 rounded-lg p-2 mt-2"
          />
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleParticipantSelect(item)}
                className="p-3 bg-gray-100 rounded-lg mt-2"
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Selected Participants */}
        <View className="mb-6">
          <Text className="font-bold">Selected Participants:</Text>
          {selectedParticipants.length > 0 ? (
            selectedParticipants.map((participant) => (
              <Text key={participant.id} className="mt-2">
                - {participant.name}
              </Text>
            ))
          ) : (
            <Text>No participants added yet.</Text>
          )}
        </View>

        {/* Materials */}
        <View className="mb-6">
          <Text className="text-lg font-bold">Used Materials</Text>
          {materialsList.length === 0 ? (
            <Text className="text-gray-500 mt-2">No materials added yet.</Text>
          ) : (
            materialsList.map((item, index) => (
              <View
                key={index}
                className="flex-row items-center justify-between p-2 border-b border-gray-300"
              >
                <Text>
                  {item.material} - {item.amount}
                </Text>
                <TouchableOpacity onPress={() => handleRemoveMaterial(item.material)}>
                  <Entypo name="circle-with-cross" size={20} color="red" />
                </TouchableOpacity>
              </View>
            ))
          )}
          <Picker
            selectedValue={selectedMaterial}
            onValueChange={(itemValue) => setSelectedMaterial(itemValue)}
            className="border border-gray-300 rounded-lg mt-2"
          >
            <Picker.Item label="Select material" value="" />
            <Picker.Item label="Material A" value="Material A" />
            <Picker.Item label="Material B" value="Material B" />
            <Picker.Item label="Material C" value="Material C" />
          </Picker>
          <TextInput
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            className="border border-gray-300 rounded-lg p-2 mt-2"
          />
          <TouchableOpacity
            className="bg-blue-500 rounded-lg p-2 mt-2"
            onPress={handleAddMaterial}
          >
            <Text className="text-center text-white">Add Material</Text>
          </TouchableOpacity>
        </View>

        {/* Special Notes */}
        <View className="mb-6">
          <Text className="text-lg font-bold">Special Notes</Text>
          <TextInput
            placeholder="Enter special notes"
            value={specialNotes}
            onChangeText={setSpecialNotes}
            className="border border-gray-300 rounded-lg p-2 mt-2"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-green-700 rounded-full p-3 mt-4"
          onPress={handleBreakdownfinish}
        >
          <Text className="text-center text-white font-bold text-lg">SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Machinefixed;
