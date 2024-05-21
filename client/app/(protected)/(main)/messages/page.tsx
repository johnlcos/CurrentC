"use client";
import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../layout";

interface Chatroom {
  chatroomId: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  lastMessageSentAt: Date;
}

const MessagesPage = () => {
  // store conversations in state
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const { userSession } = useContext(SessionContext);

  useEffect(() => {
    const fetchChatrooms = async () => {
      const response = await fetch(
        `http://localhost:8080/messages/chatrooms?id=${userSession?.user.id}`
      );
      const data = await response.json();
      console.log("chatroom data: ", data);
    };
    fetchChatrooms();
  }, []);

  return <div>Messsages</div>;
};
export default MessagesPage;
