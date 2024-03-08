const { Router } = require('express');
const feedController = require('../controllers/feedController');

const router = Router();

router.get('/', feedController.getAllFeed, (req, res) =>
  res.status(200).json(res.locals.results)
);

module.exports = router;
