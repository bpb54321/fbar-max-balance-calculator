import { useEffect } from "react";

export const useLocalStorage = <T>(
  storageKey: string,
  stateVariable: T,
  stateUpdaterFunction: (data: T) => void
) => {
  // Restore data from local storage
  useEffect(() => {
    const locallyStoredData = window.localStorage.getItem(storageKey);
    if (locallyStoredData) {
      const parsedData = JSON.parse(locallyStoredData);
      stateUpdaterFunction(parsedData);
    }
  }, [storageKey, stateUpdaterFunction]);

  // Save data to local storage when its updated
  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(stateVariable));
  }, [storageKey, stateVariable]);
};
