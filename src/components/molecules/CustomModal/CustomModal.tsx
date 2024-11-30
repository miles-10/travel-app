import {useTheme} from '@/theme';
import {heightPercentToDp, widthPercentToDp} from '@/utils/dimensions';
import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, Pressable, Animated, Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import layout from '@/theme/layout';
import {Button} from '@/components/atoms';
import uuid from 'react-native-uuid';
import {saveNoteToDb} from '@/utils/db';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabParamList} from '@/types/navigation';
import {addHistoryItem, updateHistoryItem} from '@/services/history/history';
import {useDispatch} from 'react-redux';

const {height} = Dimensions.get('window');

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  editData?: any;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isVisible,
  onClose,
  editData,
}) => {
  const {backgrounds, gutters, components, colors} = useTheme();

  const translateY = useState(new Animated.Value(height))[0];
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [locationText, setLocationText] = useState<string>(
    editData?.location || '',
  );
  const [customDate, setCustomDate] = useState<string>(editData?.date || '');
  const [note, setNote] = useState<string>(editData?.notes || '');
  const dispatch = useDispatch();
  console.log('editData', editData);
  const navigation = useNavigation<NavigationProp<BottomTabParamList>>();

  const formatDate = (date: Date): string => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;
  };

  const handleLocationChange = (location: string) => {
    setLocationText(location);
  };

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setCustomDate(formatDate(selectedDate));
    }
  };
  const handleTextChange = (text: string) => {
    const sanitizedText = text.replace(/\D/g, '');

    let formattedText = sanitizedText;
    if (sanitizedText.length > 2) {
      formattedText = sanitizedText.slice(0, 2) + '/' + sanitizedText.slice(2);
    }
    if (sanitizedText.length > 4) {
      formattedText =
        formattedText.slice(0, 5) + '/' + sanitizedText.slice(4, 8);
    }
    if (formattedText.length > 10) {
      formattedText = formattedText.slice(0, 10);
    }

    setCustomDate(formattedText);

    const parsedDate = new Date(formattedText);
    if (!isNaN(parsedDate.getTime())) {
      setDate(parsedDate);
    } else if (formattedText === '') {
      setDate(new Date());
    }
  };

  const handleNoteChange = (note: string) => {
    setNote(note);
  };

  const handleSave = async () => {
    if (!locationText.trim() || !customDate.trim() || !note.trim()) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    const id = editData?.id || uuid.v4();
    const updatedData = {
      id,
      location: locationText,
      date: customDate,
      notes: note,
    };

    try {
      await saveNoteToDb(id, locationText, customDate, note);
      if (editData) {
        dispatch(updateHistoryItem(updatedData));
      } else {
        dispatch(addHistoryItem(updatedData));
      }

      Alert.alert('Data saved successfully!');
      setLocationText('');
      setCustomDate('');
      setNote('');
      onClose();
    } catch (error) {
      console.error('Failed to save data:', error);
      Alert.alert('An error occurred while saving data.');
    }
  };

  useEffect(() => {
    if (isVisible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, translateY]);

  useEffect(() => {
    if (editData) {
      setLocationText(editData.location);
      setCustomDate(editData.date);
      setNote(editData.notes);
    }
  }, [editData]);
  return (
    <>
      {isVisible && <Pressable style={components.overlay} onPress={onClose} />}
      <Animated.View
        style={[
          components.modalContainer,
          {
            transform: [{translateY}],
          },
        ]}>
        <View style={components.content}>
          <Text style={components.modalText}>Add Destination</Text>
          <View style={components.inputContainer}>
            <TextInput
              label="Enter or Select your destination"
              value={locationText}
              onChangeText={handleLocationChange}
              mode="outlined"
              style={components.input}
              textColor={colors.black}
              theme={{
                colors: {
                  text: colors.blue,
                  placeholder: colors.black,
                  primary: colors.blue,
                  background: colors.blue,
                },
              }}
              right={
                <TextInput.Icon
                  icon={() => <Icon name={'place'} size={20} />}
                />
              }
            />
          </View>
          <View style={components.inputContainer}>
            <TextInput
              label="Enter or Select your Date"
              value={customDate}
              onChangeText={handleTextChange}
              mode="outlined"
              keyboardType="number-pad"
              style={components.input}
              textColor={colors.black}
              theme={{
                colors: {
                  placeholder: colors.black,
                  primary: colors.blue,
                  background: colors.blue,
                },
              }}
              right={
                <TextInput.Icon
                  icon={() => <Icon name="calendar-month" size={20} />}
                  onPress={() => setShowPicker(true)}
                />
              }
            />
            {showPicker && (
              <View style={[gutters.marginTop_10]}>
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              </View>
            )}
          </View>
          <View style={components.inputContainer}>
            <TextInput
              label="Notes"
              value={note}
              textColor={colors.black}
              theme={{
                colors: {
                  placeholder: colors.black,
                  primary: colors.blue,
                  background: colors.blue,
                },
              }}
              onChangeText={handleNoteChange}
              mode="outlined"
              style={components.input}
            />
          </View>
          <View style={[layout.row]}>
            <Button
              title={'Save'}
              style={[{width: widthPercentToDp('45')}, backgrounds.blue]}
              onPress={handleSave}
            />
            <Button
              title={'Close'}
              style={[
                {width: widthPercentToDp('45')},
                gutters.marginLeft_10,
                backgrounds.red500,
              ]}
              onPress={onClose}
            />
          </View>
        </View>
      </Animated.View>
    </>
  );
};

export default React.memo(CustomModal);
