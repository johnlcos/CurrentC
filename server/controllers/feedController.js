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

feedController.createFeed = async (req, res, next) => {
  try {
    const { message } = req.body;
    const inputs = ['Wei', true, '@weiwang0305', 200, 10, 5, message];
    queryStr =
      'INSERT INTO feeds (name,verificationstatus,uniqueidentifier,views,likes,dislikes,message) VALUES($1,$2,$3,$4,$5,$6,$7)';
    const result = await db.query(queryStr, inputs);
    res.locals.newPost = result.rows;
  } catch (error) {
    next(error);
  }
};

module.exports = feedController;
