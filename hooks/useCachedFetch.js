// hooks/useCachedFetch.js
import { useState, useEffect, useRef } from 'react';

export function useCachedFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cacheRef = useRef(new Map());
  const timeoutRef = useRef(null);

  const {
    cacheDuration = 300000, // 5 phút cache mặc định
    retryInterval = 300000,  // 5 phút retry
    maxRetries = 3
  } = options;

  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;

    const fetchData = async () => {
      const now = Date.now();
      const cached = cacheRef.current.get(url);

      // Kiểm tra cache còn hợp lệ không
      if (cached && (now - cached.timestamp) < cacheDuration) {
        setData(cached.data);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(url, {
          headers: {
            'Cache-Control': 'max-age=300', // Client cache 5 phút
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (isMounted) {
          setData(result);
          setError(null);
          
          // Cache data
          cacheRef.current.set(url, {
            data: result,
            timestamp: now
          });
          
          retryCount = 0; // Reset retry count on success
        }
      } catch (err) {
        console.error('Fetch error:', err);
        
        if (isMounted) {
          setError(err.message);
          
          // Retry logic với exponential backoff
          if (retryCount < maxRetries) {
            const delay = Math.min(1000 * Math.pow(2, retryCount), 30000);
            timeoutRef.current = setTimeout(() => {
              retryCount++;
              fetchData();
            }, delay);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Setup interval với reduced frequency
    const interval = setInterval(fetchData, retryInterval);

    return () => {
      isMounted = false;
      clearInterval(interval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [url, cacheDuration, retryInterval, maxRetries]);

  return { data, loading, error };
}
