import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * useFetch — generic data-fetching hook with loading, error, and refetch support.
 *
 * @param {string|null} url       - The URL to fetch. Pass null to skip fetching.
 * @param {object}      options   - Fetch options (method, body, headers, etc.)
 *
 * Usage:
 *   const { data, loading, error, refetch } = useFetch('/api/workouts');
 */
const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!url);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetchData = useCallback(async (fetchUrl, fetchOptions) => {
    if (!fetchUrl) return;

    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(fetchUrl, {
        ...fetchOptions,
        signal: abortRef.current.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(fetchOptions.headers || {}),
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();
      setData(json);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(url, options);
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const refetch = () => fetchData(url, options);

  return { data, loading, error, refetch };
};

export default useFetch;
