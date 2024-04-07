import Router from 'express';
import settingsController from '../controllers/settingsController';

const router = Router();

router.post('/password', settingsController.changePassword, (req, res) => {
  res.status(200).json({
    success: { status: 200, message: 'Sucessfully changed password' },
  });
});

router.post('/delete', settingsController.accountDeletion, (req, res) => {
  res
    .status(200)
    .json({ success: { status: 200, message: 'Successfully deleted user' } });
});
export default router;
