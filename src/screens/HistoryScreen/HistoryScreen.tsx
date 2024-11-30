import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {SafeAreaView} from 'react-native';
import {CustomFlatlist} from '@/components/molecules';
import {useTheme} from '@/theme';
import {useDispatch, useSelector} from 'react-redux';
import {HistoryItem} from '@/types/components';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';

const HistoryScreen: FC = (): JSX.Element => {
  const {layout, gutters, backgrounds, fonts, colors, borders} = useTheme();
  const dispatch = useDispatch();
  const history: HistoryItem[] = useSelector(
    (state: any) => state.history.history,
  );
  const renderHistoryItem = ({item}: {item: any}) => {
    return (
      <View
        style={[
          gutters.marginVertical_10,
          gutters.padding_10,
          borders.rounded_16,
          backgrounds.gray100,
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
      </View>
    );
  };

  return (
    <SafeScreen screenName="History" backgroundColor={colors.blue}>
      <View style={[layout.flex_1, gutters.paddingHorizontal_10]}>
        <View style={[gutters.marginTop_10]}>
          <CustomFlatlist
            data={history}
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
                No History.
              </Text>
            }
          />
        </View>
      </View>
    </SafeScreen>
  );
};

export default HistoryScreen;
