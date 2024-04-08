interface ChatRoomPageProps {
  params: {
    username: string;
    chatId: string;
  };
}
const ChatRoomPage = ({ params }: ChatRoomPageProps) => {
  return <div className='text-text-white p-5'>Chat Room</div>;
};

export default ChatRoomPage;
