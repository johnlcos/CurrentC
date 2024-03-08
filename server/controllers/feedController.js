const db = require('../models/feedModel');

const feedController = {};

feedController.getAllFeed = async (req, res, next) => {
  try {
    const queryStr = 'SELECT * from feeds';
    const result = await db.query(queryStr);
    res.locals.results = result.rows;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = feedController;
