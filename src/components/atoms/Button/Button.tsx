import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useTheme} from '@/theme';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}
const Button: React.FC<CustomButtonProps> = ({
  title,
  loading,
  style,
  ...props
}) => {
  const {components} = useTheme();
  return (
    <TouchableOpacity
      style={[components.buttonStyle, style]}
      activeOpacity={0.8}
      disabled={loading || props.disabled}
      {...props}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={components.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
