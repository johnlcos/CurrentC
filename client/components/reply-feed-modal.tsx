interface ReplyFeedModalProps {
  showModal: boolean;
  closeModal: () => void;
}

export const ReplyFeedModal = ({ showModal }: ReplyFeedModalProps) => {
  return (
    <div className='fixed bg-white'>
      {showModal && (
        <div>
          Modal
          <div>
            Whatasdfasdfoajsdhfioaudiofuasiodfuaiopsdfioasudfiopausdiofaujsdoifhasjkdfhaijlsdfhjkalsdfjkahsdkfj
          </div>
        </div>
      )}
    </div>
  );
};
