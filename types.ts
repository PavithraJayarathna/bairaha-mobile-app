export type RootStackParamList = {
  Homepage: undefined;
  Login: undefined;
  MaintenanceCriteria: undefined;
  MachineList: undefined;
  BreakdownService: {machineId: string, machineName: string};
  Fixingstatus: {machineName: string};
  Machinefixed: {machineName: string};
  Reportbreakdown: {machineName: string};
  Breakdownfinish: {machineName: string};
  
  Sign: undefined;
  Startfixing: {machineName: string};
  MachinProfile: { machineId: string};
  BarcodeScannerScreen: undefined; 

  
};
