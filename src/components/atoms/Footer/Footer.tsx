import {View, Dimensions} from 'react-native';
import React from 'react';
import {useTheme} from '@/theme';

const {width} = Dimensions.get('window');

interface FooterProps {
  slides: any[];
  currentSlideIndex: number;
}

const Footer: React.FC<FooterProps> = ({slides, currentSlideIndex}) => {
  const {layout, colors, gutters} = useTheme();

  return (
    <View style={[gutters.marginTop_20, layout.itemsCenter]}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={{
              height: 8,
              width: currentSlideIndex === index ? 30 : 8,
              backgroundColor:
                currentSlideIndex === index ? colors.blue : colors.gray300,
              borderRadius: 4,
              marginHorizontal: 4,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default Footer;
