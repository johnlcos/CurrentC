'use client';
import { useContext, useEffect, useState } from 'react';
import { socket } from '@/socket';
import { SessionContext } from '@/app/(protected)/layout';

interface ChatRoomProps {
  chatId: string;
}

interface MessageType {
  chatId: string;
  content: string;
  user: string;
  created_at: Date;
}

export const ChatRoom = ({ chatId }: ChatRoomProps) => {
  const [message, setMessage] = useState<string>('');
  const [allMessages, setAllMessages] = useState<MessageType[]>([]);
  const { userSession } = useContext(SessionContext);

  useEffect(() => {
    console.log('ChatRoom useEffect firing on socket');
    const handleMessageReceive = (data: any) => {
      setAllMessages((prev) => [...prev, data]);
      // console.log(data);
    };
    socket.on('receive_message', handleMessageReceive);
    return () => socket.off('receive_message', handleMessageReceive);
  }, [socket]);

  useEffect(() => {
    const getIntialMessage = async () => {
      const response = await fetch(
        `http://localhost:8080/messages/?chatId=${chatId}`
      );
      const result = await response.json();
      setAllMessages(result);
    };
    getIntialMessage();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log('In handleSendMessage: ', message);
    if (message !== '') {
      const messageData = {
        chat_id: chatId,
        content: message,
        user: userSession?.user.user_metadata.display_name,
        created_at: new Date(),
      };
      console.log('emit');
      await socket.emit('send_message', messageData);
      setMessage('');
      await fetch('http://localhost:8080/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          sender_id: userSession?.user.id,
          content: message,
        }),
      });
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
              <p>{`${message.created_at}`}</p>
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
