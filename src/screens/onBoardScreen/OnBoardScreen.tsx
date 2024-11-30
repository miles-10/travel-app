import {
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import {useTheme} from '@/theme';
import {ApplicationScreenProps} from '@/types/navigation';
import {slideData} from '@/data/onBoardData';
import {CustomFlatlist} from '@/components/molecules';
import {Button, Footer, Slide} from '@/components/atoms';
import {slidePropsType} from '@/types/components';
import {storage} from '@/App';

const {width: windowWidth} = Dimensions.get('window');
const OnBoardScreen: FC<ApplicationScreenProps<'onBoardScreen'>> = ({
  navigation,
}): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const {layout, gutters, backgrounds} = useTheme();
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleGetStarted = () => {
    storage.set('isFirstTime', 'false');
    navigation.navigate('BottomTab');
  };

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false},
  );

  const goToNextSlide = () => {
    const nextSlideIndex = activeIndex + 1;

    if (nextSlideIndex < slideData.length) {
      const offset = nextSlideIndex * windowWidth;
      flatListRef.current?.scrollToOffset({offset, animated: true});
      setActiveIndex(nextSlideIndex);
    }
  };
  return (
    <SafeAreaView
      style={[
        layout.flex_1,
        layout.itemsCenter,
        layout.itemsCenter,
        gutters.paddingHorizontal_20,
      ]}>
      <View style={[layout.flex_1]}>
        <View style={[layout.flex_08]}>
          <CustomFlatlist
            ref={flatListRef}
            data={slideData}
            renderItem={({item}) => <Slide items={item as slidePropsType} />}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            onMomentumScrollEnd={e =>
              setActiveIndex(
                Math.floor(e.nativeEvent.contentOffset.x / windowWidth),
              )
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={[layout.flex_03, gutters.paddingHorizontal_10]}>
          <Footer slides={slideData} currentSlideIndex={activeIndex} />
          {activeIndex === slideData.length - 1 ? (
            <View style={[gutters.marginTop_40]}>
              <Button title={'Get Started'} onPress={handleGetStarted} />
            </View>
          ) : (
            <View style={[gutters.marginTop_40]}>
              <Button title={'Next'} onPress={goToNextSlide} />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnBoardScreen;
