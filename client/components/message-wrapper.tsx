interface MessageWrapperProps {
  message: string;
}

export const MessageWrapper = ({ message }: MessageWrapperProps) => {
  return <div className='text-[15px]'>{message}</div>;
};
