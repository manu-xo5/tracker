import * as React from 'react';

export default function useNotification(timeTable) {
  let [notificationTimers, setNotificationTimers] = React.useState([]);

  function handleQueueNotification(time) {
    if (notificationTimers.includes(time)) return;

    let d = new Date();
    let hr = d.getHours(),
      mm = d.getMinutes();

    if (hr < 10) hr = '0' + hr;
    if (mm < 10) mm = '0' + mm;

    let timeout = new Date(`2022T${time}`) - new Date(`2022T${hr}:${mm}:00`);
    if (timeout < 0) return;
    console.log(timeout);

    setTimeout(() => {
      setNotificationTimers((prev) => {
        let i = prev.indexOf(time);
        prev.splice(i, 1);
        return [...prev];
      });

      window.navigator.serviceWorker.getRegistration().then((res) => {
        res.showNotification('Traccer', {
          body: timeTable.map((task, i) => `${i + 1}) ${task.title}`).join('\n'),
          icon: '/assets/apple-icon-180.png',
          requireInteraction: false,
        });
      });
    }, timeout);

    setNotificationTimers((prev) => [...prev, time]);
  }

  return [notificationTimers, { setNotificationTimers, handleQueueNotification }];
}
