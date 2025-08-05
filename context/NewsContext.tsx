import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {useWeather} from '../context/WeatherContext';

export type NewsArticle = {
  title: string;
  description: string;
  url: string;
  source: {name: string};
};

type NewsContextType = {
  allNews: NewsArticle[];
  filteredNews: NewsArticle[];
  setFilteredNews: (news: NewsArticle[]) => void;
  setIsManualFilter: (isManual: boolean) => void;
  fetchNews: () => void;
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const {weather} = useWeather();
  const [isManualFilter, setIsManualFilter] = useState(false);

  const API_KEY = 'bcd6c5c6ac3a46748f0586916983e5fd';

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=india&pageSize=50&sortBy=publishedAt&apiKey=${API_KEY}`,
      );

      const articles = response.data.articles;
      setAllNews(articles);

      if (weather && !isManualFilter) {
        const filtered = filterNewsByWeather(
          weather.main.toLowerCase(),
          articles,
        );
        setFilteredNews(filtered);
      }
    } catch (error) {
      console.log('News fetch error:', error);
    }
  };

  useEffect(() => {
    if (weather) {
      fetchNews();
    }
  }, [weather]);

  return (
    <NewsContext.Provider
      value={{
        allNews,
        filteredNews,
        fetchNews,
        setFilteredNews,
        setIsManualFilter,
      }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) throw new Error('useNews must be used within NewsProvider');
  return context;
};

export const filterNewsByWeather = (
  condition: string,
  articles: NewsArticle[],
): NewsArticle[] => {
  const lcCondition = condition.toLowerCase();

  let keywords: string[] = [];

  if (
    lcCondition.includes('cloud') ||
    lcCondition.includes('rain') ||
    lcCondition.includes('haze')
  ) {
    keywords = ['crisis', 'death', 'sad', 'tragedy'];
  } else if (lcCondition.includes('clear') || lcCondition.includes('sun')) {
    keywords = ['win', 'celebrate', 'achievement', 'happy', 'success'];
  } else if (lcCondition.includes('storm') || lcCondition.includes('thunder')) {
    keywords = ['alert', 'danger', 'warning', 'emergency'];
  } else {
    return articles.slice(0, 10);
  }

  const filtered = articles.filter(article =>
    keywords.some(
      k =>
        article.title?.toLowerCase().includes(k) ||
        article.description?.toLowerCase().includes(k),
    ),
  );

  return filtered.length > 0 ? filtered : articles.slice(0, 10);
};
