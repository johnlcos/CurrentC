import Router from 'express';
import feedController from '../controllers/feedController';

const router = Router();

router.get('/', feedController.getAllFeed, (req, res) =>
  res.status(200).json(res.locals.results)
);

router.post(
  '/create',
  feedController.createFeed,
  feedController.getAllFeed,
  (req, res) => {
    res.status(200).json(res.locals.results);
  }
);

module.exports = router;
