import { useEffect, useState } from "react";

export const useLocalStorage = <T>(
  storageKey: string,
  stateVariable: T,
  stateUpdaterFunction: (data: T) => void
) => {
  const [isDataLoadedFromLocalStorage, setIsDataLoadedFromLocalStorage] =
    useState(false);

  // Restore data from local storage
  useEffect(() => {
    const locallyStoredData = window.localStorage.getItem(storageKey);
    if (locallyStoredData) {
      const parsedData = JSON.parse(locallyStoredData);
      stateUpdaterFunction(parsedData);
    }
    setIsDataLoadedFromLocalStorage(true);
  }, [storageKey, stateUpdaterFunction]);

  // Save data to local storage when its updated
  useEffect(() => {
    if (isDataLoadedFromLocalStorage) {
      window.localStorage.setItem(storageKey, JSON.stringify(stateVariable));
    }
  }, [storageKey, stateVariable, isDataLoadedFromLocalStorage]);
};
