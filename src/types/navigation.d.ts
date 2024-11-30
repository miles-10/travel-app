import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps as RNBottomTabScreenProps} from '@react-navigation/bottom-tabs';
export type ApplicationStackParamList = {
  Startup: undefined;
  onBoardScreen: undefined;
  BottomTab: undefined;
  Home: undefined;
  Complete: undefined;
  UpComming: undefined;
  History: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Complete: undefined;
  UpComming: undefined;
  AddTask: undefined;
  History: undefined;
};

export type ApplicationScreenProps<T extends keyof ApplicationStackParamList> =
  NativeStackScreenProps<ApplicationStackParamList, T>;
