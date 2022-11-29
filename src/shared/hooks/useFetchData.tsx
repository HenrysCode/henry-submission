import { useState } from "react";

/**
 * Custom hook used to fetch data
 * @returns object with state and handlers
 */
function useFetchData<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);

  const fetchData = (url: string) => {
    setIsLoading(true);
    fetch(url)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        }
        throw new Error("Something went wrong");
      })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch(() => {
        // for simplicity we don't show the full error
        setError(true);
      })
      .finally(() => setIsLoading(false));
  };

  const clearData = () => setData(null);

  const clearError = () => setError(false);

  return { isLoading, data, error, fetchData, clearData, clearError };
}

export default useFetchData;
