import React, { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';
import { a, useSpring, useTransition } from '@react-spring/web';
import { interpolate } from '@popmotion/popcorn';
import { Plus, X } from 'react-feather';
import { nanoid } from 'nanoid';

import DefaultLayout from 'layouts/DefaultLayout';
import Button from 'elements/atoms/Button';
import { noop, logWithOr } from 'utils/helpers';

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
  const [notifications, setNotifications] = useState<Array<NotificationShape>>(() => []);

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

  const notifsTrans = useTransition(notifications, {
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
      return { y: -(containerHeight - notificationHeight * i), config: { duration: 2000 } };
    },
    leave: {
      scale: 0.6,
      opacity: 0,
    },
    key: v => v.id,
    config: {
      duration: 200,
    },
  });

  const notifsToRender = notifsTrans((style, notif, _, i) => (
    <Notification
      key={notif.id}
      id={notif.id}
      style={style}
      content={notif.content}
      handleClose={() => clearNotification(notif.id)}
    />
  ));

  return (
    <DefaultLayout pageTitle="From state">
      <div className="relative min-h-screen bg-indigo-900">
        <div className="container mx-auto pt-4">
          <Button LeftIcon={Plus} onClick={createNotification}>
            Create notification
          </Button>
        </div>
      </div>
      <div className="relative">{notifsToRender}</div>
    </DefaultLayout>
  );
};

export default Notifications;
