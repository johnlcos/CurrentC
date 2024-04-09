import { ChatRoom } from '@/components/chat-room';

interface ChatRoomPageProps {
  params: {
    username: string;
    chatId: string;
  };
}
const ChatRoomPage = ({ params }: ChatRoomPageProps) => {
  return (
    <div className='text-text-white p-5'>
      <ChatRoom chatId={params.chatId} username={params.username} />
    </div>
  );
};

export default ChatRoomPage;
