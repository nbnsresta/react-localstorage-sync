import React from 'react';
import LSStore, { LSValue } from './LSStore';

const store = LSStore.getInstance();

const useLocalStorage = function(
  key: string
): [LSValue, (value: string) => void] {
  const [storeValue, setStoreValue] = React.useState<LSValue>(
    localStorage.getItem(key)
  );

  React.useLayoutEffect(
    function() {
      const subscription = store.subscribe(key, function(value: string | null) {
        setStoreValue(value);
      });
      return function() {
        subscription.unsubscribe();
      };
    },
    [key]
  );

  const handleValueChange = React.useCallback(
    function(value: string) {
      store.publish(key, value);
    },
    [key]
  );

  return [storeValue, handleValueChange];
};

export default useLocalStorage;
