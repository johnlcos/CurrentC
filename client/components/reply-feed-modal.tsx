import { OverviewContext } from '@/app/(protected)/layout';
import { useContext } from 'react';

export const ReplyFeedModal = () => {
  const { showModal, setShowModal } = useContext(OverviewContext);

  const handleCloseModal = (e: React.MouseEvent) => {
    setShowModal(false);
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {showModal && (
        <div
          onClick={handleCloseModal}
          className='fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center'
        >
          <div
            className='bg-white rounded shadow-md p-2 w-[30%] flex flex-col'
            onClick={handleContentClick}
          >
            <div>
              Modal
              <div>What</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
