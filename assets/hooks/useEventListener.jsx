import { useEffect, useCallback } from 'react';

const useEventListener = (eventName, element, callback, dependency = [], isRef = false) => {
  const savedCallback = useCallback(callback, dependency);

  useEffect(() => {
    if (!element) {
      return undefined;
    }

    const el = isRef ? element.current : element;

    if (!(el && el.addEventListener)) {
      console.warn('Invalid element provided to useEventListener');
      return undefined;
    }

    el.addEventListener(eventName, savedCallback);

    return () => el.removeEventListener(eventName, savedCallback);
  }, [eventName, element, savedCallback, isRef, ...dependency]);
};

export default useEventListener;