import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { colors } from '../../styles/colors';
import fonts from '../../styles/fonts';
import Typography from '../Atoms/Typography';
import LinearGradient from 'react-native-linear-gradient';

type HeaderProps = {
  title: string;
  showNotification?: boolean;
  showLogout?: boolean;
  onNotificationPress?: () => void;
  onLogoutPress?: () => void;
  navigation?: any;
};

const Header = ({
  title,
  showNotification = true,
  navigation
}: HeaderProps) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const slideDown = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0],
  });

  return (
    <Animated.View style={{ transform: [{ translateY: slideDown }], elevation: 5 ,}}>
      
      <LinearGradient
                colors={['#f1ddeeff',colors.primary,]}
      
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerContainer}>
        
        <TouchableOpacity
          style={styles.iconButton}>
          <Icon name="menu" size={26} color={colors.white} />
        </TouchableOpacity>

        <Typography
          title={title}
          textColor={colors.white}
          style={styles.headerTitle}
        />

        <View style={styles.rightIcons}>
          {showNotification && (
            <TouchableOpacity
              style={styles.iconButton}>
              <Icon name="cog-outline" size={24} color={colors.white} 
              onPress={() => navigation.navigate('Settings')}/>
            </TouchableOpacity>
          )}
       
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? responsiveHeight(5) : responsiveHeight(3),
    paddingBottom: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: '#ffffff30',
  },
  iconButton: {
    padding: responsiveWidth(1.5),
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: fonts['InterBold'],
    flex: 1,
    textAlign: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
