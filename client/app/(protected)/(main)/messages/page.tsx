"use client";
import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../layout";

interface Chatroom {
  chatroomId: string;
  userId: string;
  avatarUrl: string;
  lastMessageSentAt: Date;
}

const MessagesPage = () => {
  // store conversations in state
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const { userSession } = useContext(SessionContext);

  useEffect(() => {
    const fetchConversations = async () => {
      const response = await fetch(
        `http://localhost:8080/messages/chatrooms?id=${userSession?.user.id}`
      );
      const data = await response.json();
    };
  }, []);

  return <div>Messsages</div>;
};
export default MessagesPage;
