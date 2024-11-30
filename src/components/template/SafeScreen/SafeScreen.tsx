import {SafeAreaView, StatusBar, Text, View, Image} from 'react-native';

import {useTheme} from '@/theme';

import {PropsWithChildren, useEffect, useState} from 'react';

import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Button} from '@/components/atoms';

const SafeScreen = ({
  children,
  backgroundColor,
  screenName,
  iconColor,
  textColor,
}: PropsWithChildren<{
  backgroundColor?: string;
  iconColor?: boolean;
  screenName?: string;
  textColor?: string;
}>): JSX.Element => {
  const {layout, variant, navigationTheme, components, fonts, gutters} =
    useTheme();

  return (
    <SafeAreaView
      style={[
        layout.flex_1,
        {backgroundColor: backgroundColor ? backgroundColor : '#ffffff'},
      ]}>
      <StatusBar
        barStyle={variant === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={'#ffffff'}
      />
      <View style={[layout.row, layout.justifyCenter, layout.itemsCenter]}>
        {screenName && (
          <Text
            style={[
              gutters.marginTop_20,
              fonts.size_20,
              fonts.fontOpenSansMedium,
              textColor ? {color: textColor} : fonts.white,
              fonts.fontSpacing025,
              fonts.normal,
              fonts.fontWeight600,
              fonts.textVerticalBottom,
            ]}>
            {screenName}
          </Text>
        )}
      </View>
      {children}
    </SafeAreaView>
  );
};

export default SafeScreen;
