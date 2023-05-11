export const setNotification = (message, date) => {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
    return;
  } else if (Notification.permission === 'granted') {
    scheduleNotification(message, date);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        scheduleNotification(message, date);
      }
    });
  }
};

const scheduleNotification = (message, date) => {
  const now = new Date().getTime();
  const timeUntilTrigger = date.getTime() - now;

  setTimeout(() => {
    new Notification('Alarm', {
      body: message,
    });
    console.log('Alarm fired at ' + new Date().toLocaleTimeString());
  }, timeUntilTrigger);
};
