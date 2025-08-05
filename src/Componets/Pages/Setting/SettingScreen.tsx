/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Switch} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Checkbox} from 'react-native-paper';
import {useWeather} from '../../../../context/WeatherContext';
import ArrowBack from '../../Molecules/ArrowBack';
import fonts from '../../../styles/fonts';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {colors} from '../../../styles/colors';
import {filterNewsByWeather, useNews} from '../../../../context/NewsContext';
import axios from 'axios';

const categories = [
  'general',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
];

const API_KEY = 'bcd6c5c6ac3a46748f0586916983e5fd';

type Props = {
  navigation: any;
};

const SettingsScreen = ({navigation}: Props) => {
  const {unit, setUnit} = useWeather();
  const {weather} = useWeather();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {setFilteredNews, setIsManualFilter} = useNews();

  useEffect(() => {
    const loadPreferences = async () => {
      const savedCategories = await AsyncStorage.getItem('categories');
      const savedUnit = await AsyncStorage.getItem('unit');

      if (savedCategories) setSelectedCategories(JSON.parse(savedCategories));
      if (savedUnit) setUnit(savedUnit);
    };
    loadPreferences();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('categories', JSON.stringify(selectedCategories));
    AsyncStorage.setItem('unit', unit);
  }, [selectedCategories, unit]);

  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
  };

  const toggleCategory = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
  };

  const fetchNews = async (
    categoriesToFetch: string[] = selectedCategories,
  ) => {
    try {
      setLoading(true);
      setError('');

      if (categoriesToFetch.length === 0) {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=india&pageSize=50&sortBy=publishedAt&apiKey=${API_KEY}`,
        );
        const articles = response.data.articles ?? [];

        let filtered = articles;
        if (weather) {
          const weatherFiltered = filterNewsByWeather(weather.main, articles);
          filtered = weatherFiltered.length > 0 ? weatherFiltered : articles;
        }

        setFilteredNews(filtered);
        setIsManualFilter(false);
        navigation.navigate('HomeScreen1');
        return;
      }

      const promises = categoriesToFetch.map(async category => {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=${category}&country=in&apiKey=${API_KEY}`,
        );
        console.log(response, 'ress;;;;;', category);
        return (response.data.articles || []).map((article: any) => ({
          ...article,
          _category: category,
        }));
      });

      const categoryResults = await Promise.all(promises);
      const allArticles = categoryResults.flat();

      let filtered = allArticles;
      if (weather) {
        const weatherFiltered = filterNewsByWeather(weather.main, allArticles);
        filtered = weatherFiltered.length > 0 ? weatherFiltered : allArticles;
      }

      setFilteredNews(filtered);
      setIsManualFilter(true);
      navigation.navigate('HomeScreen1');
    } catch (err) {
      setError('Failed to fetch news');
      console.error('News Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = async () => {
    setSelectedCategories([]);
    setFilteredNews([]);
    setIsManualFilter(false);
    await fetchNews([]);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <ArrowBack navigation={navigation} />
        <Text style={styles.title}>Temperature Unit</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Celsius (°C)</Text>
          <Switch value={unit === 'imperial'} onValueChange={toggleUnit} />
          <Text style={styles.label}>Fahrenheit (°F)</Text>
        </View>

        <Text style={styles.title}>News Categories</Text>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            onPress={() => toggleCategory(category)}
            style={styles.categoryRow}>
            <Text style={styles.label}>{category}</Text>
            <Checkbox
              status={
                selectedCategories.includes(category) ? 'checked' : 'unchecked'
              }
              onPress={() => toggleCategory(category)}
            />
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={() => clearAll()} style={styles.clearButton}>
          <Text style={styles.clearText}>Clear All Categories</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => fetchNews()}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Submit</Text>
          )}
        </TouchableOpacity>

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: responsiveFontSize(1.8),
    marginVertical: 12,
    fontFamily: fonts.InterBold,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  clearButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  clearText: {
    color: 'red',
    fontFamily: fonts.InterBold,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  submitText: {
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: fonts.InterBold,
  },
  error: {
    fontFamily: fonts.InterMedium,

    color: 'red',
    marginTop: 10,
  },
});

export default SettingsScreen;
