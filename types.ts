export type RootStackParamList = {
  Homepage: undefined;
  Login: undefined;
  MaintenanceCriteria: undefined;
  MachineList: undefined;
  BreakdownService: {machineId: string, machineName: string};
  Fixingstatus: {breakdownID: string};
  Machinefixed: {machineName: string};
  Reportbreakdown: {machineId: string, machineName: string};
  Breakdownfinish: {machineName: string};
  OngoingActionsList: undefined;
  MyActionsList: undefined;
  Sign: undefined;
  Startfixing: {breakdownID: string};
  MachinProfile: { machineId: string};
  BarcodeScannerScreen: undefined; 

  
};
