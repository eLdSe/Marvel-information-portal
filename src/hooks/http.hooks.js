import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [process, setProcess] = useState('waiting');


  const request = useCallback(async (url) => {
    setLoading(true);
    setProcess('loadind');

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}`);
      }

      const data = await response.json();
      setLoading(false);
      return data;

    } catch (e) {
      setLoading(false);
      setError(e.message);
      setProcess('error')
      throw e;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setProcess('loading');
  }, []);

  return { loading, request, error, clearError, process, setProcess };
};
