import React from 'react';
import { Pressable, StyleSheet, View, StyleProp, ViewStyle, ActivityIndicator } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Typography from './Typography';
import { colors } from '../../styles/colors';

type Props = {
  title?: string;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
  icon?: string;
  onPress?: () => void;
  loading?:boolean
};

const Button = ({ title, style, textColor, icon, onPress,loading }: Props) => {
  return (
    <Pressable style={[styles.btn, style]} onPress={onPress}>
      {
        loading ?
        <ActivityIndicator size={30} color={colors.white} />
  :
   <View style={styles.content}>
        {icon && <Icon name={icon} size={20} color={textColor || '#fff'} style={styles.icon} />}
        <Typography title={title} textColor={textColor || '#fff'} />
      </View>
      }
     
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: responsiveWidth(90),
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: 50,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, 
  },
  icon: {
    marginRight: 8,
  },
});

export default Button;
