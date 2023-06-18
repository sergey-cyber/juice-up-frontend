import { useEffect, useState } from "react";

export const useFetch = <T>(
  fetcher: () => Promise<T>,
  callback: (response: T) => void,
  onError?: () => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps?: any[]
) => {
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetcher()
      .then((res) => callback(res))
      .catch(() => onError?.())
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [reloadKey, ...(deps || [])]);

  return { loading, reload: () => setReloadKey(reloadKey + 1) };
};
