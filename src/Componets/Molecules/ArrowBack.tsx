/* eslint-disable @typescript-eslint/no-unused-vars */

import {Pressable, StyleSheet, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../../styles/colors';
import Typography from '../Atoms/Typography';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';



const ArrowBack = ({navigation}: any) => {
  return (
    <Pressable style={styles.headerContainer} onPress={() => navigation.goBack()}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color={colors.darkText} />
      </Pressable>
 
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(0.9),},
  backButton: {
    borderRadius: 10,
    marginRight: responsiveWidth(3),
  },
  header: {
    fontSize: responsiveFontSize(2.8),
  },
});

export default ArrowBack;
