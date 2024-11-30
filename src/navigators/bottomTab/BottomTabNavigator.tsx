import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import MainScreen from '@/screens/MainScreen/MainScreen';
import CompletedScreen from '@/screens/Completed/CompletedScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';;
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, {Path} from 'react-native-svg';
import {CustomModal} from '@/components/molecules';
import UpCommiongScreen from '@/screens/UpComming/UpCommiongScreen';
import {BottomTabParamList} from '@/types/navigation';
import HistoryScreen from '@/screens/HistoryScreen/HistoryScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const CustomTabBarBackground = () => {
  return (
    <View style={styles.backgroundWrapper}>
      <Svg
        width="100%"
        height="80"
        viewBox="0 0 100 80"
        preserveAspectRatio="none">
        <Path
          d="M0,1 H25 C35,0 45,10 50,25 C55,10 65,0 75,0 H100 V80 H0 Z"
          fill="#ffffff"
        />
      </Svg>
    </View>
  );
};

const BottomTabNavigator = () => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  return (
    <>
      <CustomModal isVisible={isModalVisible} onClose={handleCloseModal} />
      <Tab.Navigator
        screenOptions={({route}: any) => {
          const isModalVisible =
            route.name === 'UpComming' && route.params?.isModalVisible;
          return {
            tabBarStyle: isModalVisible ? {display: 'none'} : styles.tabBar,
            tabBarBackground: () => <CustomTabBarBackground />,
            tabBarActiveTintColor: '#007BFF',
            tabBarInactiveTintColor: '#8e8e8f',
            tabBarIcon: ({focused, color, size}) => {
              let iconName: string;
              let IconComponent: any;

              if (route.name === 'Home') {
                IconComponent = MaterialCommunityIcons;
                iconName = focused
                  ? 'weather-cloudy-clock'
                  : 'weather-cloudy-clock';
              } else if (route.name === 'Complete') {
                IconComponent = Ionicons;
                iconName = focused
                  ? 'checkmark-done-circle'
                  : 'checkmark-done-circle-outline';
              } else if (route.name === 'UpComming') {
                IconComponent = MaterialCommunityIcons;
                iconName = focused
                  ? 'calendar-arrow-right'
                  : 'calendar-arrow-right';
              } else if (route.name === 'History') {
                IconComponent = MaterialCommunityIcons;
                iconName = focused ? 'history' : 'history';
              } else {
                IconComponent = MaterialCommunityIcons;
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              }

              return (
                <IconComponent name={iconName} size={size} color={color} />
              );
            },
            headerShown: false,
          };
        }}>
        <Tab.Screen name="Home" component={MainScreen} />
        <Tab.Screen name="Complete" component={CompletedScreen} />
        <Tab.Screen
          name="AddTask"
          component={View}
          options={{
            tabBarButton: () => (
              <TouchableWithoutFeedback onPress={handleOpenModal}>
                <View style={styles.addButton}>
                  <Ionicons name="add" size={24} color="#ffffff" />
                </View>
              </TouchableWithoutFeedback>
            ),
          }}
        />
        <Tab.Screen name="UpComming" component={UpCommiongScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: 'transparent',
  },
  tabBar: {
    position: 'absolute',
    height: 80,
    borderTopWidth: 0,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default BottomTabNavigator;
