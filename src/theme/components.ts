import {
  ImageStyle,
  Platform,
  TextStyle,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import type {ComponentTheme} from '@/types/theme/theme';
import {heightPercentToDp, widthPercentToDp} from '@/utils/dimensions.ts';
import {useTheme} from '.';

export default ({layout, backgrounds, fonts, colors}: ComponentTheme) => {
  return {
    appLogo: {
      width: 150,
      height: 150,
    },
    buttonStyle: {
      padding: 15,
      backgroundColor: colors.blue,
      borderRadius: 5,
      ...layout.justifyCenter,
      ...layout.itemsCenter,
    },
    buttonText: {
      color: colors.white,
      fontSize: 18,
    },
    footerIndicator: {
      height: 8,
      width: 40,
      backgroundColor: '#D9D9D9',
      marginHorizontal: 3,
      borderRadius: 5,
    },
    tabBar: {
      backgroundColor: colors.white,
      height: 80,
    },
    icon: {
      width: 24,
      height: 24,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1,
    },
    modalContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '50%',
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      zIndex: 2,
    },
    content: {
      flex: 1,
      padding: 16,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: heightPercentToDp('3'),
      marginBottom: 20,
    },
    closeButton: {
      backgroundColor: 'red',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    inputContainer: {
      width: '100%',
      marginBottom: 20,
    },
    input: {
      height: 50,
      backgroundColor: 'white',
      color: colors.black
    },
  } as const satisfies Record<string, ImageStyle | TextStyle | ViewStyle>;
};
