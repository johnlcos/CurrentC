import Router from 'express';
import feedController from '../controllers/feedController';

const router = Router();

router.get('/*', feedController.getFeed, (req, res) =>
  res.status(200).json(res.locals.results)
);

router.post(
  '/create',
  feedController.createFeed,
  feedController.getFeed,
  (req, res) => {
    res.status(200).json(res.locals.results);
  }
);

export default router;
