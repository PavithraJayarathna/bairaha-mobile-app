export type RootStackParamList = {
  Homepage: undefined;
  Login: undefined;
  MaintenanceCriteria: undefined;
  MachineList: undefined;
  BreakdownService: {machineId: string, machineName: string};
  Fixingstatus: {machineName: string};
  Machinefixed: {machineName: string};
  Reportbreakdown: {machineId: string, machineName: string};
  Breakdownfinish: {machineName: string};
  
  Sign: undefined;
  Startfixing: {machineId: string,machineName: string};
  MachinProfile: { machineId: string};
  BarcodeScannerScreen: undefined; 

  
};
