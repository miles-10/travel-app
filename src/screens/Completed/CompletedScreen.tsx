import {View, Text, SafeAreaView, Animated} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '@/theme';
import {CustomFlatlist} from '@/components/molecules';
import {useDispatch, useSelector} from 'react-redux';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {Alert} from 'react-native';
import {deleteHistoryItem} from '@/services/history/history'; // Assuming this is your action
import {deleteHistoryItemFromDb} from '@/utils/db';
import {HistoryItem} from '@/types/components';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';

const CompletedScreen: FC = (): JSX.Element => {
  const {layout, gutters, backgrounds, fonts, colors, borders} = useTheme();
  const dispatch = useDispatch();
  const history: HistoryItem[] = useSelector(
    (state: any) => state.history.history,
  );

  const handleDateConversion = (dateString: string) => {
    const parts = dateString?.split('/');
    const date = new Date(`${parts[2]}-${parts[0]}-${parts[1]}`);
    return date;
  };
  const getCompletedHistory = () => {
    const currentDate = new Date();
    return history.filter((item: any) => {
      const itemDate = new Date(handleDateConversion(item.date));
      console.log(itemDate, currentDate);
      return itemDate < currentDate;
    });
  };
  const completedHistory = getCompletedHistory();
  console.log(completedHistory);
  const renderHistoryItem = ({item}: {item: any}) => {
    const translateX = new Animated.Value(0);

    const onGestureEvent = Animated.event(
      [{nativeEvent: {translationX: translateX}}],
      {useNativeDriver: true},
    );

    const onHandlerStateChange = ({nativeEvent}: any) => {
      if (nativeEvent.translationX < -150) {
        handleDelete(item.id);
      }
      translateX.setValue(0);
    };
    return (
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={[
            gutters.marginVertical_10,
            gutters.padding_10,
            borders.rounded_16,
            backgrounds.gray100,
            {
              transform: [{translateX}],
            },
          ]}>
          <Text
            style={[
              fonts.size_16,
              fonts.fontOpenSansRegular,
              fonts.black,
              fonts.fontWeight700,
            ]}>
            Location: {item.location}
          </Text>
          <Text
            style={[
              fonts.size_16,
              fonts.fontOpenSansRegular,
              fonts.black,
              fonts.fontWeight700,
            ]}>
            Date: {item.date}
          </Text>
          <Text
            style={[
              fonts.size_16,
              fonts.fontOpenSansRegular,
              fonts.black,
              fonts.fontWeight700,
            ]}>
            Notes: {item.notes}
          </Text>
        </Animated.View>
      </PanGestureHandler>
    );
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this history item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteHistoryItemFromDb(id);

              dispatch(deleteHistoryItem(id));

              Alert.alert('Success', 'History item deleted successfully.');
            } catch (error) {
              console.error('Error deleting item:', error);
              Alert.alert('Error', 'Failed to delete the item.');
            }
          },
        },
      ],
    );
  };
  return (
    <GestureHandlerRootView style={[layout.flex_1, backgrounds.blue]}>
      <SafeScreen screenName="Completed Tasks" backgroundColor={colors.blue}>
        <View style={[layout.flex_1, gutters.paddingHorizontal_10]}>
          <View style={[gutters.marginTop_10]}>
            <CustomFlatlist
              data={completedHistory}
              renderItem={renderHistoryItem}
              keyExtractor={(item: any) => item?.id.toString()}
              ListEmptyComponent={
                <Text
                  style={[
                    fonts.textCenter,
                    fonts.size_14,
                    fonts.fontOpenSansRegular,
                    fonts.fontWeight700,
                    fonts.white,
                  ]}>
                  No Completed tasks.
                </Text>
              }
            />
          </View>
        </View>
      </SafeScreen>
    </GestureHandlerRootView>
  );
};

export default CompletedScreen;
