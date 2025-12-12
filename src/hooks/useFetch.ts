import { useEffect, useState } from "react";

export function useFetch<T>(apiCall: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    apiCall().then(setData);
  }, []);

  return data;
}
