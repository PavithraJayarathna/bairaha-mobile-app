import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

const NotificationBell: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  const notificationCount = useSelector((state: any) => state.notifications.count);

  return (
    <View className="relative mr-6">
      <TouchableOpacity onPress={onPress} className="mr-1">
        <MaterialIcons name="notifications" size={35} color="#0d6000" />
      </TouchableOpacity>

      {notificationCount > 0 && (
        <View className="absolute top-0 right-0 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center">
          <Text className="text-white text-xs font-bold">{notificationCount}</Text>
        </View>
      )}
    </View>
  );
};

export default NotificationBell;
