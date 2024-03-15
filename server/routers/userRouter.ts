import Router, { Request, Response } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.post('/signup', userController.signup, (req: Request, res: Response) => {
  res.status(200).json({ redirectUrl: 'http://localhost:3000/' });
});

router.post('/signin', userController.signin, (req, res) => {
  res
    .status(200)
    .json({
      data: res.locals.loggedinUser,
      redirectUrl: 'http://localhost:3000/',
    });
});

router.get(
  '/getSession',
  userController.getSession,
  (req: Request, res: Response) => {
    res.status(200).json({ data: res.locals.data });
  }
);

router.get('/getUserInfo', userController.getUserInfo, (req, res) => {
  res.status(200).json({ data: res.locals.userInfo });
});

export default router;
