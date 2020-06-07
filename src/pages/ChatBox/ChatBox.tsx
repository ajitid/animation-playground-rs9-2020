import React, { useState, useRef, useCallback, useEffect } from 'react';
import { a } from '@react-spring/web';
import { nanoid } from 'nanoid';

import DefaultLayout from 'layouts/DefaultLayout';
import usePinToBottom from 'hooks/usePinToBottom';
import Button from 'elements/atoms/Button';

enum MessageStatus {
  Sent = 'sent',
  Received = 'received',
}

interface Message {
  id: string;
  content: string;
  status: MessageStatus;
}

const fillMsgs = (length: number): Array<Message> =>
  [...new Array(length)].map(() => ({
    id: nanoid(),
    content: 'xdnkcjdnckdc xdnkjcd',
    status: MessageStatus.Sent,
  }));

const ChatBox = () => {
  const [msgs, setMsgs] = useState<Array<Message>>(() => fillMsgs(4));
  const [l, setL] = useState(1);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [scrollToBottomKey, setScrollToBottomKey] = useState('');
  const { scrollToBottom } = usePinToBottom(
    messagesContainerRef,
    scrollToBottomKey /* `msgs.length` can work for simple cases*/,
    {
      buffer: messagesContainerRef.current?.clientHeight ?? 0,
      crossBufferScroll: true,
      scrollAction: useCallback(console.log, []),
    }
  );
  useEffect(() => {
    const id = nanoid();
    setScrollToBottomKey(id);
  }, [msgs.length]);

  const sendMsg = () => {
    const id = nanoid();
    setMsgs(v => [
      ...v,
      {
        id,
        content: `sent content ${id}`,
        status: MessageStatus.Sent,
      },
    ]);
    scrollToBottom();
  };

  const receiveMsg = () => {
    const id = nanoid();
    setMsgs(v => [
      ...v,
      {
        id,
        content: `received content ${id}`,
        status: MessageStatus.Received,
      },
    ]);
  };

  const receiveBigMsg = () => {
    const id = nanoid();
    setMsgs(v => [
      ...v,
      {
        id,
        content: `received content ${id} received content ${id} received content ${id} received content ${id} received content ${id} received content ${id} received content ${id} received content ${id} received content ${id} received content ${id} received content ${id} received content ${id} received content ${id} received content ${id} received content ${id} received content ${id} received content ${id} `,
        status: MessageStatus.Received,
      },
    ]);
  };

  return (
    <DefaultLayout pageTitle="Chat box">
      <div className="container mx-auto pt-4">
        <Button
          onClick={() => {
            scrollToBottom();
            const id = nanoid();
            setScrollToBottomKey(id);
          }}
        >
          Scroll to bottom
        </Button>
        <div className="mt-2">
          <Button
            onClick={() => {
              setL(l => l + 1);
            }}
            className="mr-4"
          >
            Increase number
          </Button>
          <span>
            {l} <span className="ml-2 text-gray-600">This is a separate state</span>
          </span>
        </div>

        <div className="fixed bottom-0 right-0 mx-auto">
          {/* Chatbox */}
          <div
            className="bg-gray-200 mr-3 mb-3 flex flex-col rounded shadow-lg border"
            style={{
              height: 400,
              width: 300,
            }}
          >
            <div className="text-sm rounded-t p-2">Chat header</div>
            <a.div
              ref={messagesContainerRef}
              className="bg-gray-300 px-2 flex-1 overflow-y-scroll"
            >
              {msgs.map(msg => (
                <div key={msg.id} className="my-2 bg-gray-100 shadow-sm rounded px-2 py-1">
                  {msg.content}
                </div>
              ))}
            </a.div>
            <div className="my-2 rounded-b px-2">
              <button
                className="text-sm border border-gray-500 text-gray-700 px-2 py-1 mt-2 rounded mr-2 inline-block"
                onClick={sendMsg}
              >
                Send
              </button>
              <button
                className="text-sm border border-gray-500 text-gray-700 px-2 py-1 mt-2 rounded inline-block mr-2"
                onClick={receiveMsg}
              >
                Receive
              </button>
              <button
                className="text-sm border border-gray-500 text-gray-700 px-2 py-1 mt-2 rounded inline-block"
                onClick={receiveBigMsg}
              >
                Receive a big msg
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ChatBox;
