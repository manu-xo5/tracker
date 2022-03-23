import * as React from "react";

/**
 * @typedef {["TIME_TABLE"]} KEY
 * @param {KEY[number]} key
 * @param {any} defaultState
 */
export default function useLocalStorage(key, defaultState) {
  let [state, _setState] = React.useState(
    defaultState ||
      (() => {
        try {
          return JSON.parse(localStorage.getItem(key));
        } catch {
          return defaultState;
        }
      })
  );

  function setState(data) {
    let serialized = data;
    if (typeof data === "function") {
      let prev = JSON.parse(localStorage.getItem(key));
      serialized = JSON.stringify(data(prev));
    }

    localStorage.setItem(key, serialized);
    _setState(data);
  }

  return [state, setState];
}
