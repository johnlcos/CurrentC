import Router, { Request, Response } from 'express';
import messageController from '../controllers/messageCotroller';

const router = Router();

router.get(
  '/',
  messageController.getAllMessages,
  (req: Request, res: Response) => {
    res
      .status(200)
      .json({
        success: 'Successfully got messages',
        messages: res.locals.messages,
      });
  }
);

router.post(
  '/room',
  messageController.getRoom,
  messageController.createRoom,
  (req: Request, res: Response) => {
    res
      .status(200)
      .json({ success: 'Successfully created room', chatId: res.locals.room });
  }
);

router.post(
  '/send',
  messageController.createNewMessage,
  (req: Request, res: Response) => {
    res.status(200).json({ success: 'Message Sent' });
  }
);

export default router;
