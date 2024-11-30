import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {ApplicationScreenProps} from '@/types/navigation';
import Brand from '@/components/molecules/Brand/Brand';
import {useTheme} from '@/theme';
import {images} from '@/theme/assets/images';
import {storage} from '@/App';

const Startup: React.FC<ApplicationScreenProps<'Startup'>> = ({navigation}) => {
  const springAnim = useRef(new Animated.Value(0)).current;
  const {gutters, layout, components, backgrounds} = useTheme();

  const navigateAfterModalClose = () => {
    const isFirstTime: any = storage.getString('isFirstTime');
    setTimeout(() => {
      if (isFirstTime === 'false') {
        navigation.reset({
          index: 0,
          routes: [{name: 'BottomTab'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'onBoardScreen'}],
        });
      }
    }, 3000);
  };

  useEffect(() => {
    navigateAfterModalClose();
  }, []);
  useEffect(() => {
    Animated.spring(springAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
    const timer = setTimeout(() => {
      navigation.replace('onBoardScreen');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation, springAnim]);

  return (
    <View
      style={[
        layout.flex_1,
        layout.justifyCenter,
        layout.itemsCenter,
        backgrounds.white,
      ]}>
      <Animated.Image
        source={images.logo}
        style={[components.appLogo, {transform: [{scale: springAnim}]}]}
      />
    </View>
  );
};

export default React.memo(Startup);
