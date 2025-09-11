// components/CoinDataProvider.js
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useCachedFetch } from '@/hooks/useCachedFetch';

const CoinDataContext = createContext();

export function useCoinData() {
  const context = useContext(CoinDataContext);
  if (!context) {
    throw new Error('useCoinData must be used within CoinDataProvider');
  }
  return context;
}

export function CoinDataProvider({ children }) {
  // Cache API data với thời gian cache dài hơn
  const { data: marketData, loading: marketLoading, error: marketError } = useCachedFetch(
    '/api/coins?vs_currency=usd&per_page=250&page=1&price_change_percentage=24h&sparkline=true',
    { 
      cacheDuration: 300000,  // 5 phút
      retryInterval: 300000   // 5 phút
    }
  );

  const { data: staticData, loading: staticLoading } = useCachedFetch(
    '/api/coins/static',
    { 
      cacheDuration: 86400000, // 24 giờ cho static data
      retryInterval: 86400000  // 24 giờ
    }
  );

  // Generate sparkline data locally để tránh fetch
  const generateSparklineData = (isUp = true, points = 20) => {
    const data = [];
    let price = 100 + Math.random() * 50; 
    
    for (let i = 0; i < points; i++) {
      const change = (Math.random() - 0.5) * 10;
      const trend = isUp ? 0.5 : -0.5;
      price = Math.max(1, price + change + trend);
      data.push(parseFloat(price.toFixed(2)));
    }
    
    return data;
  };

  const getCoinIconUrl = (symbol) => {
    return staticData?.coinIcons[symbol] || '/assets/images/icon/default-coin.png';
  };

  const getStaticTradingUrl = (symbol) => {
    return staticData?.tradingUrls[symbol] || `https://trade.example.com/${symbol}`;
  };

  const getCoinData = (coinId) => {
    return marketData?.find(coin => coin.id === coinId) || {};
  };

  const value = {
    marketData: marketData || [],
    staticData: staticData || {},
    loading: marketLoading || staticLoading,
    error: marketError,
    generateSparklineData,
    getCoinIconUrl,
    getStaticTradingUrl,
    getCoinData
  };

  return (
    <CoinDataContext.Provider value={value}>
      {children}
    </CoinDataContext.Provider>
  );
}
