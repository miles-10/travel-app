import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApplicationStackParamList} from '../../types/navigation';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import Startup from '../../screens/Startup/Startup';
import {useTheme} from '@/theme';
import OnBoardScreen from '@/screens/onBoardScreen/OnBoardScreen';
import MainScreen from '@/screens/MainScreen/MainScreen';
import UpCommiongScreen from '@/screens/UpComming/UpCommiongScreen';
import CompletedScreen from '@/screens/Completed/CompletedScreen';
import BottomTabNavigator from '../bottomTab/BottomTabNavigator';
import HistoryScreen from '@/screens/HistoryScreen/HistoryScreen';

const Stack = createNativeStackNavigator<ApplicationStackParamList>();

const ApplicationNavigator: FC = (): JSX.Element => {
  const {variant, navigationTheme} = useTheme();
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        key={variant}
        initialRouteName="Startup"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen name="onBoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
