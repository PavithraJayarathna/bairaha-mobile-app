import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Homepage from '../components/Homepage';
import Login from '../components/Login';
import MaintenanceCriteria from '../components/MaintenanceCriteria';
import MachineList from '../components/MachineList';
import MachinProfile from '../components/MachinProfile';
import BreakdownService from '../components/BreakdownService';
import Reportbreakdown from '../components/Reportbreakdown';
import Startfixing from '../components/Startfixing';
import Breakdownfinish from '../components/Breakdownfinish';
import Fixingstatus from '../components/Fixingstatus';
import Machinefixed from '../components/Machinefixed';
import SectorSelection from '../components/SectorSelection';
import OngoingActionsList from '@/components/OngoingActions';
import MyActionsList from '@/components/MyActions';
import ScheduledMaintenanceList from '../components/ScheduledMaintenance';
import MachineScheduleMaintenance from '../components/MachineScheduleMaintenance';
import MaintenanceDetails from '@/components/MaintenanceDetails';
import Sign from '../components/Sign';
import BarcodeScannerScreen from '../components/BarcodeScannerScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Homepage">
        <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="MaintenanceCriteria" component={MaintenanceCriteria} options={{ headerShown: false }} />
        <Stack.Screen name="MachineList" component={MachineList} options={{ headerShown: false }} />
        <Stack.Screen name="MachinProfile" component={MachinProfile} options={{ headerShown: false }} />
        <Stack.Screen name="BreakdownService" component={BreakdownService} options={{ headerShown: false }} />
        <Stack.Screen name="Reportbreakdown" component={Reportbreakdown} options={{ headerShown: false }} />
        <Stack.Screen name="Startfixing" component={Startfixing} options={{ headerShown: false }} />
        <Stack.Screen name="Breakdownfinish" component={Breakdownfinish} options={{ headerShown: false }} />
        <Stack.Screen name="Fixingstatus" component={Fixingstatus} options={{ headerShown: false }} />
        <Stack.Screen name="Machinefixed" component={Machinefixed} options={{ headerShown: false }} />
        <Stack.Screen name="SectorSelection" component={SectorSelection} options={{ headerShown: false }} />
        <Stack.Screen name="Sign" component={Sign} options={{ headerShown: false }} />
        <Stack.Screen name="BarcodeScannerScreen" component={BarcodeScannerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OngoingActionsList" component={OngoingActionsList} options={{ headerShown: false }} />
        <Stack.Screen name="MyActionsList" component={MyActionsList} options={{ headerShown: false }} />
        <Stack.Screen name="ScheduledMaintenanceList" component={ScheduledMaintenanceList} options={{ headerShown: false }} />
        <Stack.Screen name="MaintenanceDetails" component={MaintenanceDetails} options={{ headerShown: false }} />
        <Stack.Screen name="MachineScheduleMaintenance" component={MachineScheduleMaintenance} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
