import React, {createContext, useContext, useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';
import axios from 'axios';

type Weather = {
  temp: number;
  description: string;
  main: string;
};

type Forecast = {
  date: string;
  temp: number;
  description: string;
};

type WeatherContextType = {
  weather: Weather | null;
  forecast: Forecast[];
  unit: 'metric' | 'imperial';
  setUnit: (unit: 'metric' | 'imperial') => void;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Forecast[]>([]);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  const API_KEY = 'f4a56a570719ba376bad293a5cda7f71';

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location to fetch weather data.',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const fetchWeather = async () => {
    const permissionGranted = await requestLocationPermission();
    if (!permissionGranted) {
      console.log('Location permission denied');
      return;
    }

    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;

        try {
          const currentRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${API_KEY}`,
          );

          setWeather({
            temp: currentRes.data.main.temp,
            description: currentRes.data.weather[0].description,
            main: currentRes.data.weather[0].main,
          });

          const forecastRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${API_KEY}`,
          );
          console.log(forecastRes, 'forcastres');
          const dailyMap: {[date: string]: Forecast} = {};

          forecastRes.data.list.forEach((entry: any) => {
            const date = new Date(entry.dt * 1000).toDateString();
            if (!dailyMap[date]) {
              dailyMap[date] = {
                date,
                temp: entry.main.temp,
                description: entry.weather[0].description,
              };
            }
          });

          setForecast(Object.values(dailyMap).slice(0, 5));
        } catch (error) {
          console.log('Error fetching weather:', error);
        }
      },
      error => {
        console.log('Location error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  useEffect(() => {
    fetchWeather();
  }, [unit]);

  return (
    <WeatherContext.Provider value={{weather, forecast, unit, setUnit}}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context)
    throw new Error('useWeather must be used within a WeatherProvider');
  return context;
};
