"use client";
import { useContext, useEffect, useState } from "react";
import { socket } from "@/socket";
import { SessionContext } from "@/app/(protected)/layout";
import { getTimeDifferenceInMinutes } from "@/utils";
import { Message } from "./message";
import type { Socket } from "socket.io-client";

interface ChatRoomProps {
  chatId: string;
}

interface MessageType {
  chatId: string;
  content: string;
  display_name: string;
  created_at: Date;
  sender_id: string;
}

export const ChatRoom = ({ chatId }: ChatRoomProps) => {
  const [message, setMessage] = useState<string>("");
  const [allMessages, setAllMessages] = useState<MessageType[]>([]);
  const { userSession } = useContext(SessionContext);

  useEffect(() => {
    const handleMessageReceive = (data: any) => {
      setAllMessages((prev) => [...prev, data]);
    };
    socket.on("receive_message", handleMessageReceive);
    return () => {
      socket.off("receive_message", handleMessageReceive);
      // socket.disconnect(); // websocket not working when code active
    };
  }, []);

  useEffect(() => {
    const getIntialMessages = async () => {
      const response = await fetch(
        `http://localhost:8080/messages/?chatId=${chatId}`
      );
      const result = await response.json();
      setAllMessages(result.messages);
    };
    getIntialMessages();
  }, [chatId]);

  const handleSendMessage = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message !== "") {
      const messageData = {
        chat_id: chatId,
        content: message,
        display_name: userSession?.user.user_metadata.display_name,
        sender_id: userSession?.user.id,
        created_at: new Date(),
      };
      console.log("emit");
      await socket.emit("send_message", messageData);
      await fetch("http://localhost:8080/messages/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          sender_id: userSession?.user.id,
          content: message,
        }),
      });
      setMessage("");
    }
  };

  const el = document.getElementById("chat-feed");
  if (el) {
    el.scrollTop = el.scrollHeight;
  }

  return (
    <div className="m-1 p-4 h-screen w-full flex flex-col gap-4">
      <div className="text-text-white p-4 gap-4 h-[95%] w-full flex items-end border-b border-primary-500">
        <div
          id="chat-feed"
          className="w-full flex flex-col gap-4 max-h-full overflow-y-auto px-3"
        >
          {allMessages.map((message, index) => {
            return (
              <Message
                key={index}
                content={message.content}
                display_name={message.display_name}
                created_at={getTimeDifferenceInMinutes(`${message.created_at}`)}
                type={
                  message.sender_id === userSession?.user.id
                    ? "sent"
                    : "received"
                }
              />
            );
          })}
        </div>
      </div>
      <form
        onSubmit={handleSendMessage}
        className="w-full flex justify-center gap-4"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input w-2/3"
        />
        <button
          type="submit"
          className="submit-button-with-disable"
          disabled={message.length === 0}
        >
          Send
        </button>
      </form>
    </div>
  );
};
