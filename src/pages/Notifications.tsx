import React, { useState, ReactNode, CSSProperties } from 'react';
import { a, useTransition } from '@react-spring/web';
import { Plus, X } from 'react-feather';
import { nanoid } from 'nanoid';

import DefaultLayout from 'layouts/DefaultLayout';
import Button from 'elements/atoms/Button';
import usePreviousValue from 'hooks/usePreviousValue';

// recreated https://twitter.com/mattgperry/status/1151086681484865536

const Notification: React.FC<{
  id: string;
  content: ReactNode;
  style?: any;
  handleClose: Function;
}> = ({ id, content, handleClose, style = {} }) => {
  return (
    <a.div
      key={id}
      className="fixed bottom-0 right-0 shadow-lg rounded p-3 bg-white mb-3 mr-5"
      style={{ ...style, width: '250px' }}
    >
      <div className="flex justify-end">
        <button className="pl-2 pb-1" onClick={() => void handleClose()}>
          <X className="text-red-500" size={17} />
        </button>
      </div>
      <div className="text-sm">{content}</div>
    </a.div>
  );
};

interface NotificationShape {
  id: string;
  content: ReactNode;
}

// Portals can define the heirarchy correctly
const Notifications: React.FC = () => {
  const [slow, setSlow] = useState(false);
  const [notifications, setNotifications] = useState<Array<NotificationShape>>(() => []);
  const prevNotifications = usePreviousValue(notifications);

  const createNotification = () => {
    const id = nanoid();
    setNotifications(prevNotifs => [
      ...prevNotifs,
      {
        id,
        content: `${prevNotifs.length + 1} yay`,
      },
    ]);
  };

  const clearNotification = (id: string) => {
    setNotifications(prevNotifs => {
      const notifs = [...prevNotifs];
      const notifIdx = notifs.findIndex(n => n.id === id);
      if (notifIdx === -1) return prevNotifs;
      notifs.splice(notifIdx, 1);
      return notifs;
    });
  };

  const notificationHeight = 78;
  let containerHeight = notificationHeight * (notifications.length - 1);

  const notifsTrans = useTransition(
    notifications.map((n, i) => ({ ...n, zIndex: notifications.length - i })),
    {
      from: {
        scale: 0.9,
        opacity: 0.4,
      },
      enter: (d, i) => ({
        scale: 1,
        opacity: 1,
        y: -(containerHeight - notificationHeight * i),
      }),
      update: (d, i) => {
        const pi = prevNotifications.findIndex(n => n.id === d.id);
        return {
          y: -(containerHeight - notificationHeight * (pi !== -1 ? pi : i)),
        };
      },
      leave: {
        scale: 0.6,
        opacity: 0,
        zIndex: 0,
      },
      key: v => v.id,
      config: { duration: slow ? 5000 : 200 },
    }
  );

  const notifsToRender = notifsTrans((style, notif, _, i) => (
    <Notification
      key={notif.id}
      id={notif.id}
      style={{ zIndex: notif.zIndex, ...style }}
      content={notif.content}
      handleClose={() => clearNotification(notif.id)}
    />
  ));

  return (
    <DefaultLayout pageTitle="From state">
      <div className="relative min-h-screen bg-indigo-900 text-white">
        <div className="container mx-auto pt-4">
          <Button LeftIcon={Plus} onClick={createNotification}>
            Create notification
          </Button>
          <label className="block mt-2">
            <input
              type="checkbox"
              checked={slow}
              onChange={e => setSlow(e.target.checked)}
            />{' '}
            Slow down
          </label>
        </div>
      </div>
      {notifsToRender}
    </DefaultLayout>
  );
};

export default Notifications;
