import * as React from 'react';

export default function useSettings() {
  let [settings, setSettings] = React.useState({
    holdTimeout: 500,
    showNotification: false
  });

  return [settings, setSettings];
}
