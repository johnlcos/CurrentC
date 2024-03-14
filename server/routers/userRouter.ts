import Router, { Request, Response } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.post('/signup', userController.signup, (req: Request, res: Response) => {
  res.status(200).json({ redirectUrl: 'http://localhost:3000/' });
});

export default router;
