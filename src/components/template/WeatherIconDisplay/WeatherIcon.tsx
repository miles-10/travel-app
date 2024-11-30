import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

type WeatherMain =
  | 'Clear'
  | 'Clouds'
  | 'Rain'
  | 'Drizzle'
  | 'Thunderstorm'
  | 'Snow'
  | 'Mist'
  | 'Haze'
  | 'Fog'
  | 'Dust'
  | 'Squall'
  | 'Tornado';

interface WeatherIconProps {
  main: WeatherMain;
  size?: number;
}

const getWeatherIcon = (main: WeatherMain) => {
  switch (main) {
    case 'Clear':
      return <Icon name="sun-o" size={30} color="#FFBB33" />;
    case 'Clouds':
      return <Icon name="cloud" size={30} color="#A1A1A1" />;
    case 'Rain':
      return <Icon name="tint" size={30} color="#007BFF" />;
    case 'Drizzle':
      return <Icon5 name="cloud-rain" size={30} color="#5A9FBD" />;
    case 'Thunderstorm':
      return <Icon5 name="bolt" size={30} color="#FFC107" />;
    case 'Snow':
      return <Icon name="snowflake-o" size={30} color="#00BFFF" />;
    case 'Mist':
      return <Icon name="cloud" size={30} color="#B0C4DE" />;
    case 'Haze':
      return <Icon name="cloud" size={30} color="#D3D3D3" />;
    case 'Fog':
      return <Icon name="cloud" size={30} color="#A9A9A9" />;
    case 'Dust':
      return <Icon name="cloud" size={30} color="#D2B48C" />;
    case 'Squall':
      return <Icon5 name="cloud-showers-heavy" size={30} color="#696969" />;
    case 'Tornado':
      return <Icon name="cloud" size={30} color="#8B0000" />;
    default:
      return <Icon name="question-circle" size={30} color="#808080" />;
  }
};

const WeatherIcon: React.FC<WeatherIconProps> = ({main, size}) => {
  const icon = getWeatherIcon(main);
  return React.cloneElement(icon, {size});
};

export default WeatherIcon;
