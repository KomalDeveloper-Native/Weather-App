/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Pressable, StyleSheet, Text, } from 'react-native';
import fonts from '../../styles/fonts';
import { colors } from '../../styles/colors';

type Props={
    title?:string;
    style?:object
    textColor?:string
    onPress?:()=>void
};
  
  const Typography = ({title,style,textColor,onPress}: Props) => {
  return (
    <Pressable onPress={onPress}>
  <Text style={[styles.title,style,{color:textColor}]}>
     {title}
   </Text>
    </Pressable>
 

  );
};

const styles = StyleSheet.create({
  title:{
     fontFamily:fonts['InterSemiBold'],
     color:colors.background,
     
  },
});

export default Typography;