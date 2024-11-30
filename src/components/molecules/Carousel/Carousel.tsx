import React, {forwardRef, memo} from 'react';
import {View, FlatList, FlatListProps} from 'react-native';

interface CustomFlatListProps<T> extends FlatListProps<T> {
  containerStyle?: object;
}

const Carousel = forwardRef(
  <T,>(
    {containerStyle, ...props}: CustomFlatListProps<T>,
    ref: React.Ref<FlatList<T>>,
  ) => {
    return (
      <View style={containerStyle}>
        <FlatList ref={ref} {...props} />
      </View>
    );
  },
);

export default memo(Carousel);
