import {View, SafeAreaView, Text} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useTheme} from '@/theme';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {AppDispatch, RootState} from '@/services/store';
import {fetchWeather} from '@/services/weather/weather';
import WeatherIcon from '@/components/template/WeatherIconDisplay/WeatherIcon';
import {kelvinToCelsius} from '@/utils/kelvinToCelcius';
import {loadHistory} from '@/services/history/history';
import {fetchHistoryFromDb} from '@/utils/db';
import SafeScreen from '@/components/template/SafeScreen/SafeScreen';
import {ActivityIndicator} from 'react-native-paper';

const MainScreen: FC = (): JSX.Element => {
  const {layout, gutters, backgrounds, fonts, colors} = useTheme();
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setUserLocation({
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
        });
      },
      error => console.log(error),
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyData = await fetchHistoryFromDb();
        dispatch(loadHistory(historyData));
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchData();
  }, [dispatch]);
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const {data, loading, error} = useSelector(
    (state: RootState) => state.weather,
  );

  useEffect(() => {
    if (userLocation && !loading) {
      dispatch(fetchWeather(userLocation));
    }
  }, [userLocation, dispatch]);
  useEffect(() => {
    if (!loading && data) {
      setIsLoading(false);
    }
  }, [loading, data]);
  const weatherIcon: any = Array.isArray(data?.weather)
    ? data.weather[0]
    : null;
  console.log('loading', data);
  return (
    <SafeScreen screenName="Weather" backgroundColor={colors.blue}>
      <View
        style={[
          layout.flex_1,
          layout.itemsCenter,
          gutters.marginTop_100,
          gutters.paddingHorizontal_10,
        ]}>
        {isLoading ? (
          <View style={[gutters.marginTop_200, layout.justifyCenter]}>
            <ActivityIndicator
              animating={true}
              color={colors.white}
              size={'small'}
            />
          </View>
        ) : (
          <>
            <WeatherIcon main={weatherIcon?.main} size={120} />
            <Text
              style={[
                fonts.white,
                fonts.fontOpenSansMedium,
                fonts.fontWeight900,
                fonts.size_20,
              ]}>
              {data?.name}
            </Text>
            <Text
              style={[
                fonts.white,
                fonts.fontOpenSansMedium,
                fonts.fontWeight900,
                fonts.size_16,
                gutters.marginTop_10,
              ]}>
              {weatherIcon?.description.charAt(0).toUpperCase() +
                weatherIcon?.description.slice(1)}
            </Text>
            <Text
              style={[
                fonts.white,
                fonts.fontOpenSansMedium,
                fonts.fontWeight900,
                fonts.size_16,
                gutters.marginTop_10,
              ]}>{`Current temperature: ${kelvinToCelsius(data?.main.temp)}°C`}</Text>
            <Text
              style={[
                fonts.white,
                fonts.fontOpenSansMedium,
                fonts.fontWeight900,
                fonts.size_16,
                gutters.marginTop_10,
              ]}>{`Max Temperature: ${kelvinToCelsius(data?.main.temp_max)}°C`}</Text>
            <Text
              style={[
                fonts.white,
                fonts.fontOpenSansMedium,
                fonts.fontWeight900,
                fonts.size_16,
                gutters.marginTop_10,
              ]}>{`Min Temperature: ${kelvinToCelsius(data?.main.temp_min)}°C`}</Text>
            <Text
              style={[
                fonts.white,
                fonts.fontOpenSansMedium,
                fonts.fontWeight900,
                fonts.size_16,
                gutters.marginTop_10,
              ]}>{`Feels Like: ${kelvinToCelsius(data?.main.feels_like)}°C`}</Text>
            <Text
              style={[
                fonts.white,
                fonts.fontOpenSansMedium,
                fonts.fontWeight900,
                fonts.size_16,
                gutters.marginTop_10,
              ]}>{`Humidity: ${data?.main.humidity}`}</Text>
          </>
        )}
      </View>
    </SafeScreen>
  );
};

export default MainScreen;
