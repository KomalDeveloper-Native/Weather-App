/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useWeather} from '../../../../context/WeatherContext';
import {useNews} from '../../../../context//NewsContext';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../styles/colors';
import Header from '../../Molecules/Header';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import fonts from '../../../styles/fonts';


type Props = {
  navigation:any,
};
const HomeScreen = ({navigation}: Props) => {
  const {weather, forecast, unit} = useWeather();
  const {filteredNews} = useNews();

  console.log(filteredNews, 'filternews');

  return (
    <>
      <Header title={''} navigation={navigation} />
        <ScrollView style={styles.container}>
          <Text style={styles.heading}>🌤 Current Weather</Text>
          {weather ? (
            <View style={styles.card}>
              <Text style={styles.text}>
                Temp: {weather.temp}°{unit === 'imperial' ? 'F' : 'C'}
              </Text>
              <Text style={styles.text}>Condition: {weather.description}</Text>
            </View>
          ) : (
            <Text>Loading weather...</Text>
          )}

          <Text style={styles.heading}>📅 5-Day Forecast</Text>
          {forecast.map((day, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.text}>{day.date}</Text>
              <Text style={styles.text}>
                {day.temp}° - {day.description}
              </Text>
            </View>
          ))}

          <Text style={styles.heading}>📰 Filtered News</Text>
          {filteredNews.length === 0 ? (
            <Text style={{textAlign: 'center', marginVertical: 10,height: responsiveHeight(15)}}>
              No news articles matched your selected categories and weather.
            </Text>
          ) : (
            <FlatList
              data={filteredNews}
              keyExtractor={(item, index) => index.toString()}
              style={{height: responsiveHeight(350), paddingBottom: responsiveHeight(20)}}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                  <View style={styles.newsCard}>
                    <Text style={styles.newsTitle}>{item.title}</Text>
                    <Text style={styles.newsDesc}>{item.description}</Text>
                    <Text style={styles.newsSource}>
                      Source: {item.source?.name} | Category: {item._category}

                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.white,
  },
  heading: {
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.InterBold,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: responsiveFontSize(1.9),
    fontFamily:fonts.InterMedium,
  },
  newsCard: {
    backgroundColor: colors.lightGray,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontFamily: fonts.InterBold,
  },
  newsDesc: {
    fontSize: 14,
    marginVertical: 4,
  },
  newsSource: {
    fontSize: 12,
    fontStyle: 'italic',
    fontFamily: fonts.InterMedium,
    color: colors.primary,
  },
});

export default HomeScreen;
