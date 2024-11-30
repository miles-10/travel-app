import {TextStyle} from 'react-native';
import type {FontColors, FontSizes} from '@/types/theme/fonts';
import type {UnionConfiguration} from '@/types/theme/config';
import {config} from '@/theme/_config';
import {useMemo} from 'react';

export const generateFontColors = (configuration: UnionConfiguration) => {
  return Object.entries(configuration.fonts.colors ?? {}).reduce(
    (acc, [key, value]) => {
      return Object.assign(acc, {
        [`${key}`]: {
          color: value,
        },
      });
    },
    {} as FontColors,
  );
};

export const generateFontSizes = () => {
  return config.fonts.sizes.reduce((acc, size) => {
    return Object.assign(acc, {
      [`size_${size}`]: {
        fontSize: size,
      },
    });
  }, {} as FontSizes);
};

const fonts = useMemo(() => {
  return {
    ...generateFontSizes(),
    ...generateFontColors(config),
    ...staticFontStyles,
  };
}, [config]);


export const staticFontStyles = {
  fontSpacing02: {
    letterSpacing: -0.2,
  },
  fontSpacing016: {
    letterSpacing: 0.16,
  },
  fontSpacing025: {
    letterSpacing: 0.25,
  },
  fontSpacing05: {
    letterSpacing: 0.5,
  },
  fontSpacing1: {
    letterSpacing: 1,
  },
  fontSpacing2: {
    letterSpacing: 2,
  },
  fontWeight100: {
    fontWeight: '100',
  },
  fontWeight200: {
    fontWeight: '200',
  },
  fontWeigh300: {
    fontWeight: '300',
  },
  fontWeight400: {
    fontWeight: '400',
  },
  fontWeight500: {
    fontWeight: '500',
  },
  fontWeight600: {
    fontWeight: '600',
  },
  fontWeight700: {
    fontWeight: '700',
  },
  fontWeight800: {
    fontWeight: '800',
  },
  fontWeight900: {
    fontWeight: '900',
  },
  normal: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: 'bold',
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
  textRight: {
    textAlign: 'right',
  },
  textLeft: {
    textAlign: 'left',
  },
  textCenter: {
    textAlign: 'center',
  },
  textJusify: {
    textAlign: 'justify',
  },
  textVerticalCenter: {
    textAlignVertical: 'center',
  },
  textVerticalTop: {
    textAlignVertical: 'top',
  },
  textVerticalBottom: {
    textAlignVertical: 'bottom',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  alignCenter: {
    textAlign: 'center',
  },
  fontOpenSansBold: {
    fontFamily: 'OpenSans-Bold',
  },
  fontOpenSansBoldItalic: {
    fontFamily: 'OpenSans-BoldItalic',
  },
  fontOpenSansExtraBold: {
    fontFamily: 'OpenSans-ExtraBold',
  },
  fontOpenSansExtraBoldItalic: {
    fontFamily: 'OpenSans-ExtraBoldItalic',
  },
  fontOpenSansExtraLight: {
    fontFamily: 'OpenSans-ExtraLight',
  },
  fontOpenSansExtraLightItalic: {
    fontFamily: 'OpenSans-ExtraLightItalic',
  },
  fontOpenSansItalic: {
    fontFamily: 'OpenSans-Italic',
  },
  fontOpenSansLight: {
    fontFamily: 'OpenSans-Light',
  },
  fontOpenSansLightItalic: {
    fontFamily: 'OpenSans-LightItalic',
  },
  fontOpenSansMedium: {
    fontFamily: 'OpenSans-Medium',
  },
  fontOpenSansMediumItalic: {
    fontFamily: 'OpenSans-MediumItalic',
  },
  fontOpenSansRegular: {
    fontFamily: 'OpenSans-Regular',
  },
  fontOpenSansSemiBold: {
    fontFamily: 'OpenSans-SemiBold',
  },
  fontOpenSansSemiBoldItalic: {
    fontFamily: 'OpenSans-SemiBoldItalic',
  },
} as const satisfies Record<string, TextStyle>;
