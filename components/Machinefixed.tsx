import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
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
  _id: string;
  fullname: string;
}

interface Material {
  _id: string;
  materialname: string;
}

const Machinefixed: React.FC = () => {
  const navigation = useNavigation<BreakdownfinishScreenNavigationProp>();
  const route = useRoute();
  const { machineName } = route.params as RouteParams;

  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [materialsList, setMaterialsList] = useState<
    { material: string; amount: string}[]
  >([]);
  const [allMaterials, setAllMaterials] = useState<Material[]>([]);
  const [searchMaterialQuery, setSearchMaterialQuery] = useState<string>('');
  const [participants, setParticipants] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://bairaha-app-api.vercel.app/api/user/getusers`
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    const fetchMaterials = async () => {
      try {
        const response = await axios.get(
          `https://bairaha-app-api.vercel.app/api/inventory/get-inventory-item`
        );
        setAllMaterials(response.data.inventoryItems);
      } catch (error) {
        console.error('Failed to fetch materials:', error);
      }
    };

    fetchUsers();
    fetchMaterials();
  }, []);

  const handleBreakdownfinish = async () => {
    const dataToSubmit = {
      participantstoFixed: selectedParticipants.map((participant) => participant.fullname),
      usedMaterials: materialsList.map((item) => ({
        materialname: item.material,
        quantity: parseFloat(item.amount),
        unit: 'pcs',
      })),
      specialNote: specialNotes,
      timeFixed: new Date().toISOString(),
    };
  
    try {
      const response = await axios.put(
        `https://bairaha-app-api.vercel.app/api/machine/breakdown/${machineName}/fixing-done`,
        dataToSubmit
      );
  
      if (response.status === 200) {
        console.log('Breakdown finished successfully:', response.data);
        navigation.navigate('Breakdownfinish', { machineName });
      } else {
        console.error('Failed to submit data:', response.data);
      }
    } catch (error) {
      console.error('Error submitting breakdown:', error);
    }
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
      setSearchMaterialQuery('');
    }
  };

  const handleRemoveMaterial = (material: string) => {
    setMaterialsList(materialsList.filter((item) => item.material !== material));
  };

  const handleParticipantSelect = (participant: User) => {
    if (!selectedParticipants.some((p) => p._id === participant._id)) {
      setSelectedParticipants([...selectedParticipants, participant]);
      setSearchQuery('');
    }
  };

  const handleRemoveParticipant = (participantId: string) => {
    setSelectedParticipants(selectedParticipants.filter((p) => p._id !== participantId));
  };

  const filteredUsers = users.filter((user) =>
    user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMaterials = allMaterials.filter((material) =>
    material.materialname.toLowerCase().includes(searchMaterialQuery.toLowerCase())
  );

  const handleMaterialSelect = (material: string) => {
    setSelectedMaterial(material);
    setSearchMaterialQuery(material);

  }

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">{machineName}</Text>
        <TouchableOpacity onPress={handleOpenScanner}>
          <MaterialIcons name="qr-code-scanner" size={35} color="black" />
        </TouchableOpacity>
      </View>

      <View className="items-center mt-8 mb-8 py-2 rounded-full bg-[#0d6000]">
        <Text className="text-lg font-bold text-center text-white">Machine is Fixed</Text>
      </View>

      <ScrollView className="mt-4">
        <View className="mb-4">
          <Text className="text-lg font-bold">Add Participants</Text>
          {selectedParticipants.length > 0 ? (
            selectedParticipants.map((participant) => (
              <View key={participant._id} className="flex-row items-center justify-between mt-2">
                <Text>{participant.fullname}</Text>
                <TouchableOpacity onPress={() => handleRemoveParticipant(participant._id)}>
                  <Entypo name="circle-with-cross" size={20} color="red" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text className="text-gray-500 mt-2">No participants added yet.</Text>
          )}
        </View>

        <TextInput
          placeholder="Search participants"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="border border-gray-300 rounded-lg p-2 mt-2"
        />
        {searchQuery ? (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item._id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleParticipantSelect(item)}
                className="p-3 bg-gray-100 rounded-lg mt-2"
              >
                <Text>{item.fullname}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text className="text-gray-500 mt-2">No participants found.</Text>}
          />
        ) : null}

        <View className="mt-6 mb-6">
          <Text className="text-lg font-bold">Used Materials</Text>
          {materialsList.length === 0 ? (
            <Text className="text-gray-500 mt-2 mb-4">No materials added yet.</Text>
          ) : (
            materialsList.map((item, index) => (
              <View key={index} className="flex-row items-center justify-between p-2 border-gray-300">
                <Text>
                  {item.material} - {item.amount}
                </Text>
                <TouchableOpacity onPress={() => handleRemoveMaterial(item.material)}>
                  <Entypo name="circle-with-cross" size={20} color="red" />
                </TouchableOpacity>
              </View>
            ))
          )}
          <TextInput
            placeholder="Search materials"
            value={searchMaterialQuery}
            onChangeText={setSearchMaterialQuery}
            className="border border-gray-300 rounded-lg p-2 mt-2"
          />
          {searchMaterialQuery ? (
            <FlatList
              data={filteredMaterials}
              keyExtractor={(item) => item._id}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleMaterialSelect(item.materialname)}
                  className="p-3 bg-gray-100 rounded-lg mt-2"
                >
                  <Text>{item.materialname}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text className="text-gray-500 mt-2">No materials found.</Text>}
            />
          ) : null}
          <TextInput
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            className="border border-gray-300 rounded-lg p-2 mt-2"
          />
          <TouchableOpacity className="bg-blue-500 rounded-2xl p-3 mt-2" onPress={handleAddMaterial}>
            <Text className="text-center text-white">Add Material</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-lg font-bold">Special Notes</Text>
        <TextInput
          placeholder="Enter special notes"
          value={specialNotes}
          onChangeText={setSpecialNotes}
          className="border border-gray-300 rounded-lg p-2 mt-2"
        />

        <TouchableOpacity className="bg-green-700 rounded-full p-3 mt-4" onPress={handleBreakdownfinish}>
          <Text className="text-center text-white font-bold text-lg">SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Machinefixed;
