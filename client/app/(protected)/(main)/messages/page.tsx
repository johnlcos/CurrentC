"use client";
import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../layout";
import { Conversation } from "@/components/Conversation";

interface Chatroom {
  chatroomId: string;
  username: string;
  display_name: string;
  id: string;
  profile_avatar: string;
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
      setChatrooms(data.chatrooms);
    };
    fetchChatrooms();
  }, []);

  return (
    <div>
      <h1>Messages</h1>
      <div>
        {chatrooms.map((chatroom) => {
          console.log("chatroom: ", chatroom);
          return (
            <Conversation
              key={chatroom.chatroomId}
              chatroomId={chatroom.chatroomId}
              username={chatroom.username}
              display_name={chatroom.display_name}
              profile_avatar={chatroom.profile_avatar}
              lastMessageSentAt={chatroom.lastMessageSentAt}
            />
          );
        })}
      </div>
    </div>
  );
};
export default MessagesPage;
