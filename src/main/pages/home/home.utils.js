import { Notifications } from 'expo';

import { getNotificationId, addNotification } from '../../sqlite/notification.sqlite';
// import { } from '../../assets/app-icon.png';

export const cancelAllNotifications = () => {
  Notifications.cancelAllScheduledNotificationsAsync();
};

export const pushNotification = notification => {
  const { id, title, description, time } = notification;

  getNotificationId(id, time, async (notificationId) => {
    if (!notificationId) {
      const localNotification = {
        title,
        body: description,
        android:
        {
          sound: true,
          icon: '../../assets/app-icon.png',
          priority: 'high',
          vibrate: true
          // link (optional) (string) — external link to open when notification is selected.
        }
      };
      const schedulingOptions = {
        time: new Date(time)
      };

      const newNotificationId =
        await Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);

      addNotification(newNotificationId, id, time);
    }
  });
};

export const pushTestNotification = () => {
  const localNotification = {
    title: 'Hey ho yo',
    body: 'description',
    android:
    {
      sound: true,
      icon: '../../assets/app-icon.png',
      priority: 'high',
      vibrate: true
      // link (optional) (string) — external link to open when notification is selected.
    }
  };

  Notifications.presentLocalNotificationAsync(localNotification);
};
