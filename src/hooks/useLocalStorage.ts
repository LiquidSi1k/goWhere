interface TimeEntry {
  time: string;
}

export const useLocalStorage = <T>(key: string, defaultValue?: T) => {
  const setItem = (value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const getItem = (): T | undefined => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item) as T;
      } else {
        return defaultValue;
      }
    } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error);
      return defaultValue;
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return { setItem, getItem, removeItem };
};

export const useTimeStorage = (key: string) => {
  const setLocalTime = (value: TimeEntry[]) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const getLocalTime = (): TimeEntry[] => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : []; // Return an empty array if no item found
    } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error);
      return []; // Return an empty array on error
    }
  };

  const removeTime = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return { setLocalTime, getLocalTime, removeTime };
};
