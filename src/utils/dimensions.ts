import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, moderateScale, verticalScale };

const widthPercentToDp = (value: string) => {
	const givenWidth = typeof value === 'number' ? value : parseFloat(value);

	return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
};

const heightPercentToDp = (value: string) => {
	const givenHeight = typeof value === 'number' ? value : parseFloat(value);

	return PixelRatio.roundToNearestPixel((height * givenHeight) / 100);
};

// Actual figma screen res. is 414x896
const widthToDp = (value: number) => {
	return widthPercentToDp(`${(value / width) * 100}%`);
};

const heightToDp = (value: number) => {
	return heightPercentToDp(`${(value / height) * 100}%`);
};

export { height, heightPercentToDp, heightToDp, width, widthPercentToDp, widthToDp };

export const sHeight = Dimensions.get('screen').height;
export const statusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;
const bottomBarHeightAndroid = sHeight - height - (statusBarHeight || 0);
const bottomNavigationBar =
	Platform.OS === 'android'
		? bottomBarHeightAndroid < (statusBarHeight || 0)
			? bottomBarHeightAndroid + (statusBarHeight || 0)
			: bottomBarHeightAndroid
		: 0;
const mainTrayHeight = sHeight - (bottomNavigationBar + (statusBarHeight || 0) + 350);
export const greetingPackageHeight = mainTrayHeight - 124 - RFValue(24) - RFValue(24);
export const recommendedTrayHeight = mainTrayHeight - 54;

export const nCellDimensions = {
	// Font Sizes
	fontXSmall: RFValue(8),
	fontXMidSmall: RFValue(9),
	fontSmall: RFValue(11),
	fontMidSmall: RFValue(12),
	fontMidMedium: RFValue(14),
	fontMedium: RFValue(15),
	fontMidLarge: RFValue(16),
	fontLarge: RFValue(18),
	fontXLarge: RFValue(21),
	fontXXL: RFValue(24),
	fontXXXL: RFValue(30),

	// Font Weights
	lightWeight: '200',
	regularWeight: '400',
	mediumWeight: '500',
	condensedBold: '700',
	boldWeight: '800',

	// Direct Values
	dimensionHalf: 0.5,
	dimensionTwo: 2,
	dimensionThree: 3,
	dimensionFour: 4,
	dimensionFive: 5,
	dimensionSix: 6,
	dimensionSeven: 7,
	dimensionEight: 8,
	dimensionTen: 10,
	dimensionTwelve: 12,
	dimensionFourteen: 14,
	dimensionFifteen: 15,
	dimensionSixteen: 16,
	dimensionEighteen: 18,
	dimensionTwenty: 20,
	dimensionTwentyEight: 28,
	dimensionTwentySeven: 27,
	dimensionTwentyFive: 25,
	dimensionTwentyFour: 24,
	dimensionThirty: 30,
	dimensionThirtyFive: 35,
	dimensionForty: 40,
	dimensionFortyFour: 44,
	dimensionFortySix: 46,
	dimensionFortyEight: 48,
	dimensionFifty: 50,
	dimensionFiftyFour: 54,
	dimensionFiftySix: 56,
	dimensionSixty: 60,
	dimensionSixtyFour: 64,
	dimensionSeventy: 70,
	dimensionSeventyThree: 73,
	dimensionSeventySix: 76,
	dimensionEighty: 80,
	dimensionNinety: 90,
	dimensionNinetySeven: 97,
	dimensionHundred: 100,
	dimensionHundredAndEight: 108,
	dimensionHundredAndTen: 110,
	dimensionOneTwenty: 120,
	dimensionOneThirty: 130,
	dimensionOneThirtySeven: 137,
	dimensionOneFifty: 150,
	dimensionTwoHundred: 200,
	dimensionTwoTwenty: 220,
	dimensionTwoFifty: 250,

	paddingSix: '1.67%',
	paddingTwelve: '3.34%',
	percentageTwentyFour: '6.95%',
	percentageThirty: '8.7%',
	percentageForty: '11.6%',
	percentageSeventy: '70%',
	percentageHundredAndEight: '31.3%',
	percentageTwoFifty: '72%',
	percentageNinety: '90%',
	percentageHundred: '100%',
	PercentageTwentyFive: '25%',
	singleCardWidth: (width - 12) / 3 - 12,
	swipedItemWidth: width - 80,
	swipeItemContainerWidth: width - 24,
	dialogWidth: 0.7 * width,
	pack1x1width: (width - 12) / 3 - 12,
	pack1x1widthV2: (width - 12) / 3,
	pack2x1width: ((width - 12) / 3 - 12) * 2 + 15,
	pack3x1width: ((width - 12) / 3 - 12) * 3 + 30,
	screenHeight: sHeight,
	deviceHeight: height,
	bottomNavBarHeight: bottomNavigationBar,
	trayHeight: mainTrayHeight,
	appStatusBarHeight: statusBarHeight,
	sampleWidth: width,
	navBarImageOuterView: Platform.OS === 'ios' ? 56.5 : 44.5,
	navBarImageInnerView: Platform.OS === 'ios' ? 50.5 : 38.5,
	drawerImageOuterView: Platform.OS === 'ios' ? 89 : 89,
	drawerImageInnerView: Platform.OS === 'ios' ? 80 : 80,
	pack1x1widthElection: (width - 12) / 2.5,
	percentageFifety: '40%',
};
