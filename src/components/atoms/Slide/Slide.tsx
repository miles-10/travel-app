import {View, Text, Dimensions, Image} from 'react-native';
import React from 'react';
import {slidePropsType} from '@/types/components';
import {useTheme} from '@/theme';
import {heightPercentToDp, widthPercentToDp} from '@/utils/dimensions';
import {RFValue} from 'react-native-responsive-fontsize';

interface SlideProps {
  items: slidePropsType;
}
const {width} = Dimensions.get('window');

const Slide: React.FC<SlideProps> = ({items}) => {
  const {colors, fonts, gutters} = useTheme();
  return (
    <View
      style={{
        width,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: heightPercentToDp('55'),
          width: widthPercentToDp('95'),
          alignItems: 'center',
          alignSelf: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={items?.image}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
      <Text
        style={[
          fonts.fontOpenSansBold,
          fonts.size_20,
          fonts.blue,
          fonts.fontWeight700,
          fonts.textCenter,
          gutters.marginTop_30,
        ]}>
        {items.title}
      </Text>
    </View>
  );
};

export default Slide;
