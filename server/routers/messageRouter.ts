import Router, { Request, Response } from 'express';
import messageController from '../controllers/messageCotroller';

const router = Router();

router.post(
  '/room',
  messageController.getRoom,
  messageController.createRoom,
  (req: Request, res: Response) => {
    res.status(200).json({});
  }
);

export default router;
