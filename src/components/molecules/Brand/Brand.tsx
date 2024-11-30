import {DimensionValue, View} from 'react-native';

import {ImageVariant} from '@/components/atoms';
import {useTheme} from '@/theme';
import {isImageSourcePropType} from '@/guards/image';

import TravelLogo from '@/theme/assets/images/travel_app_logo.png';

type Props = {
  height?: DimensionValue;
  width?: DimensionValue;
  mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
};

const Brand = ({ height = 200, width = 200, mode = 'contain' }: Props) => {
  const {layout} = useTheme();

  if (
    !isImageSourcePropType(TravelLogo) ||
    !isImageSourcePropType(TravelLogo)
  ) {
    throw new Error('Image source is not valid');
  }

  return (
    <View testID="brand-img-wrapper" style={{height, width}}>
      <ImageVariant
        testID="brand-img"
        style={[layout.fullHeight, layout.fullWidth]}
        source={TravelLogo}
        sourceDark={TravelLogo}
        resizeMode={mode}
      />
    </View>
  );
};


export default Brand;
