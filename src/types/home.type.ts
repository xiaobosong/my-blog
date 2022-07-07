export interface HomeTestResultItem {
  element: string;
  unit: string;
  redAlarmList: AlarmList[];
  yellowAlarmList: AlarmList[];
  blueAlarmList: AlarmList[];
}

export interface AlarmList {
  id: number;
  value: string;
  compareSymbol: CompareSymbol;
  alarmLevel: number;
}

export enum CompareSymbol {
  CompareSymbol = '<',
  Empty = '<=',
  Fluffy = '>',
  Purple = '=',
}
