import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 

type BreakdownfinishScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Breakdownfinish'>;

interface RouteParams {
  machineName: string;
}

const Machinefixed: React.FC = () => {
  const navigation = useNavigation<BreakdownfinishScreenNavigationProp>();
  const route = useRoute();
  const { machineName } = route.params as RouteParams;

  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [materialsList, setMaterialsList] = useState<{ material: string, amount: string }[]>([]);
  const [participants, setParticipants] = useState<string>("");
  const [specialNotes, setSpecialNotes] = useState<string>("");

  const handleBreakdownfinish = () => {
    navigation.navigate('Breakdownfinish', { machineName: machineName });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAddMaterial = () => {
    if (selectedMaterial && amount) {
      const amountNumber = parseFloat(amount);
      if (!isNaN(amountNumber)) {
        const updatedMaterialsList = materialsList.map(item =>
          item.material === selectedMaterial
            ? { ...item, amount: (parseFloat(item.amount) + amountNumber).toString() }
            : item
        );
        
        if (updatedMaterialsList.some(item => item.material === selectedMaterial)) {
          // Update the list if material already exists
          setMaterialsList(updatedMaterialsList);
        } else {
          // Add new material if it does not exist
          setMaterialsList([...materialsList, { material: selectedMaterial, amount }]);
        }
        
        // Clear the selection and amount inputs after adding
        setSelectedMaterial("");
        setAmount("");
      }
    }
  };
  

  const handleRemoveMaterial = (material: string) => {
    setMaterialsList(materialsList.filter(item => item.material !== material));
  };

  return (
    <View className='flex-1 p-4 bg-white'>
      <View className='flex-row items-center justify-between mb-4 ml-3 mr-3'>
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <MaterialIcons name="qr-code-scanner" size={45} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <View className='items-center'>
        <Text className='text-2xl font-bold text-black'>
          {machineName}
        </Text>
      </View>

        <TouchableOpacity className='px-28 py-2 mt-6 rounded-full bg-[#0d6000]'>
          <Text className='text-lg font-bold text-center text-white'>
            Machine is Fixed
          </Text>
        </TouchableOpacity>

      <ScrollView>
      

      <View className='mx-4 mt-8 space-y-4'>
        <View className='p-4 border rounded-lg'>
          <Text className='mb-2 text-gray-500'>Participants</Text>
          <TextInput
            value={participants}
            onChangeText={setParticipants}
            placeholder="Add the participants"
            className='text-gray-700'
          />
          <TouchableOpacity className='absolute right-3 top-3'>
            <Entypo name="circle-with-cross" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View className='mx-4 mt-4 space-y-4'>
        <View className='p-4 border rounded-lg'>
          <Text className='mb-2 text-gray-500'>Used materials</Text>
          <View className='pb-5'>
            <ScrollView>
              {materialsList.length === 0 ? (
                <Text className='text-gray-700'>No materials selected</Text>
              ) : (
                materialsList.map((item, index) => (
                  <View
                    key={index}
                    className='flex-row items-center justify-between p-2 border-gray-300'
                  >
                    <Text>{item.material} - {item.amount}</Text>
                    <TouchableOpacity onPress={() => handleRemoveMaterial(item.material)}>
                      <Entypo name="circle-with-cross" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
          
          <View className='mb-2 border border-gray-300 rounded '>
            <Picker
              selectedValue={selectedMaterial}
              onValueChange={(itemValue) => setSelectedMaterial(itemValue)}
              className='p-2'
            >
              <Picker.Item label="Select material" value="" />
              <Picker.Item label="Material A" value="Material A" />
              <Picker.Item label="Material B" value="Material B" />
              <Picker.Item label="Material C" value="Material C" />
            </Picker>
          </View>
          
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount"
            keyboardType="numeric"
            className='p-3 border border-gray-300 rounded'
          />
          
          <TouchableOpacity
            className='p-2 mt-2 bg-blue-500 rounded'
            onPress={handleAddMaterial}
          >
            <Text className='text-center text-white'>Add Material</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className='mx-4 mt-4 space-y-4'>
        <View className='p-4 border rounded-lg'>
          <Text className='mb-2 text-gray-500'>Special notes</Text>
          <TextInput
            value={specialNotes}
            onChangeText={setSpecialNotes}
            placeholder="Mention other important details"
            className='text-gray-700'
          />
          <TouchableOpacity className='absolute right-3 top-3'>
            <Entypo name="circle-with-cross" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View className='flex items-center mt-10'>
        <TouchableOpacity
          className='px-20 py-3 bg-[#0d6000] rounded-3xl'
          onPress={handleBreakdownfinish}
        >
          <Text className='text-xl font-bold text-white' style={{letterSpacing:2}}>SUBMIT</Text>
        </TouchableOpacity>
      </View>

      </ScrollView>
      
    </View>
  );
};

export default Machinefixed;
