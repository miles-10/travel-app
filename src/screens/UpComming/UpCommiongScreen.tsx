import {View, Text, Alert, SafeAreaView} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useTheme} from '@/theme';
import {useDispatch, useSelector} from 'react-redux';
import {HistoryItem} from '@/types/components';
import {Animated} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {deleteHistoryItemFromDb} from '@/utils/db';
import {deleteHistoryItem, updateHistoryItem} from '@/services/history/history';
import {CustomFlatlist, CustomModal} from '@/components/molecules';
import {useNavigation} from '@react-navigation/native';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';

const UpCommiongScreen: FC = (): JSX.Element => {
  const {layout, gutters, backgrounds, fonts, colors, borders} = useTheme();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const handleOpenModal = (item: HistoryItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  const handleCloseModal = () => setModalVisible(false);

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
      return itemDate > currentDate;
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
      if (nativeEvent.state === State.END) {
        if (nativeEvent.translationX > 150) {
          handleEdit(item.id);
        } else if (nativeEvent.translationX < -150) {
          handleDelete(item.id);
        }

        translateX.setValue(0);
      }
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

  const handleEdit = (id: string) => {
    const itemToEdit: any = history.find((item: any) => item.id === id);
    handleOpenModal(itemToEdit);
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
  const handleSaveEdit = (editedItem: HistoryItem) => {
    dispatch(updateHistoryItem(editedItem));

    handleCloseModal();
  };

  useEffect(() => {
    navigation.setParams({isModalVisible});
  }, [isModalVisible]);

  return (
    <>
      <CustomModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        editData={selectedItem}
        // onSave={handleSaveEdit}
      />
      <GestureHandlerRootView style={[layout.flex_1, backgrounds.blue]}>
        <SafeScreen screenName="Upcomming Tasks" backgroundColor={colors.blue}>
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
                    No Upcomming tasks.
                  </Text>
                }
              />
            </View>
          </View>
        </SafeScreen>
      </GestureHandlerRootView>
    </>
  );
};

export default UpCommiongScreen;
