'use client';
import { useEffect, useState } from 'react';
import { socket } from '@/socket';

interface ChatRoomProps {
  chatId: string;
  username: string;
}

interface MessageType {
  chatId: string;
  content: string;
  user: string;
  time: Date;
}

export const ChatRoom = ({ chatId, username }: ChatRoomProps) => {
  const [message, setMessage] = useState<string>('');
  const [allMessages, setAllMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    console.log('ChatRoom useEffect firing on socket');
    const handleMessageReceive = (data: any) => {
      setAllMessages((prev) => [...prev, data]);
      // console.log(data);
    };
    socket.on('receive_message', handleMessageReceive);
    return () => socket.off('receive_message', handleMessageReceive);
  }, [socket]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log('In handleSendMessage: ', message);
    if (message !== '') {
      const messageData = {
        chatId,
        content: message,
        user: username,
        time: new Date(),
      };
      console.log('emit');
      await socket.emit('send_message', messageData);
      setMessage('');
    }
  };

  // console.log(allMessages);

  return (
    <div className='text-text-white'>
      <div>
        {allMessages.map((message) => {
          return (
            <div key={message.content}>
              <p>{message.content}</p>
              <p>{message.user}</p>
              <p>{`${message.time}`}</p>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};
