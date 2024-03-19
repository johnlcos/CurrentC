import Router, { Request, Response } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.post('/signup', userController.signup, (req: Request, res: Response) => {
  res.status(200).json({ redirectUrl: 'http://localhost:3000/overview' });
});

router.post('/signin', userController.signin, (req, res) => {
  res.status(200).json({
    data: res.locals.loggedinUser,
    redirectUrl: 'http://localhost:3000/overview',
  });
});

router.get(
  '/session',
  userController.getSession,
  (req: Request, res: Response) => {
    res.status(200).json({ data: res.locals.data });
  }
);

router.get(
  '/signout',
  userController.signout,
  (req: Request, res: Response) => {
    res.status(200).json({
      success: 'User logged out',
      redirectUrl: 'http://localhost:3000/',
    });
  }
);

router.get('/getUserInfo', userController.getUserInfo, (req, res) => {
  res.status(200).json({ data: res.locals.userInfo });
});

export default router;
