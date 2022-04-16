import * as React from 'react';

/**
 * @typedef {["TIME_TABLE"]} KEY
 * @param {KEY[number]} key
 * @param {any} defaultState
 */
export default function useLocalStorage(key, defaultState) {
  let [state, _setState] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || defaultState;
    } catch {
      return defaultState;
    }
  });

  function setState(data) {
    if (typeof data === 'function') {
      _setState((prev) => {
        let newData = data(prev);
        localStorage.setItem(key, JSON.stringify(newData));
        return newData;
      });
    } else {
      localStorage.setItem(key, JSON.stringify(data));
      _setState(data);
    }
  }

  return [state, setState];
}
