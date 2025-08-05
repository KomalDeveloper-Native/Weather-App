import React, { useEffect } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../styles/colors';
import { images } from '../../styles/images';
import Typography from '../Atoms/Typography';
import fonts from '../../styles/fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useWeather } from '../../../context/WeatherContext'; 

type Props = {
  navigation: any
};

const Welcome = ({ navigation }: Props) => {
  const { weather } = useWeather();

  useEffect(() => {
    if (weather) {
      const timer = setTimeout(() => {
        navigation.navigate('HomeScreen1');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [weather]);

  const  getWeather = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('clear')) return '☀️';
    if (desc.includes('snow')) return '❄️';
    return '🌡️';
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.welocome}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover">
        <LinearGradient
          colors={['rgba(135, 199, 225, 0.5)', 'rgba(247, 244, 246, 0.85)', '#9a538fff']}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.content}>
          <View style={styles.textGroup}>
            <Typography style={styles.title} title={'Welcome to'} />
            <Typography style={styles.brand} title={'WeatherNow'} textColor={colors.background} />
            <Typography
              style={styles.subtitle}
              title={'Get real-time weather updates.Plan your day smarter.'}
            />
            {weather && (
              <View style={styles.weatherBox}>
                <Typography
                  style={styles.weatherText}
                  title={`${ getWeather(weather.description)} ${weather.main} | ${Math.round(weather.temp)}°C`}
                />
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(8),
    paddingBottom: responsiveHeight(8),
  },
  textGroup: {
    marginBottom: responsiveHeight(4),
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.InterRegular,
    fontSize: responsiveFontSize(3),
    color: '#333',
  },
  brand: {
    fontFamily: fonts.InterBold,
    fontSize: responsiveFontSize(4),
    color: colors.primary,
  },
  subtitle: {
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.InterMedium,
    color: '#444',
    marginTop: 10,
    lineHeight: 26,
    textAlign: 'center',
  },
  weatherBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  weatherText: {
    marginLeft: 10,
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.InterMedium,
    color: '#333',
  },
});

export default Welcome
