import Router from 'express';
import settingsController from '../controllers/settingsController';

const router = Router();

router.post('/password', settingsController.changePassword, (req, res) => {
  res.status(200).json({});
});

export default router;
