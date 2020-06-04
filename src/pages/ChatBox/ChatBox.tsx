import React, { useState, useRef, useCallback, useEffect } from 'react';
import { a } from '@react-spring/web';
import { nanoid } from 'nanoid';

import DefaultLayout from 'layouts/DefaultLayout';
import usePinToBottom from 'hooks/usePinToBottom';

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
  const [msgs, setMsgs] = useState<Array<Message>>(() => fillMsgs(10));
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
      <div className="">
        <button
          onClick={() => {
            scrollToBottom();
            const id = nanoid();
            setScrollToBottomKey(id);
          }}
          className="mr-2"
        >
          scroll to bottom
        </button>
        <button
          onClick={() => {
            setL(l => l + 1);
          }}
        >
          setL {l}
        </button>
        <div className="fixed bottom-0 right-0 mx-auto">
          <div
            className="bg-purple-300 mr-3 mb-3 flex flex-col"
            style={{
              height: 400,
              width: 300,
            }}
          >
            <div className="bg-purple-400">chat header</div>
            <a.div ref={messagesContainerRef} className="flex-1 overflow-y-scroll">
              {msgs.map(msg => (
                <div key={msg.id} className="my-2 bg-gray-300">
                  {msg.content}
                </div>
              ))}
            </a.div>
            <div className="my-2">
              <button
                className="bg-green-400 select-none mr-2 inline-block"
                onClick={sendMsg}
              >
                send msg
              </button>
              <button
                className="bg-green-400 select-none inline-block mr-2"
                onClick={receiveMsg}
              >
                receive msg
              </button>
              <button
                className="bg-green-400 select-none inline-block"
                onClick={receiveBigMsg}
              >
                receive bigmsg
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ChatBox;
