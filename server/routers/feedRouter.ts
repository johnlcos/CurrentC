import Router from "express";
import feedController from "../controllers/feedController";

const router = Router();

router.get("/profile", feedController.getProfileFeed, (req, res) =>
  res.status(200).json(res.locals.profileFeed)
);

router.get("/reply", feedController.getReplyFeed, (req, res) =>
  res.status(200).json(res.locals.results)
);

router.get(
  "/main",
  feedController.getFollowedFeed,
  feedController.getProfileFeed,
  feedController.mergeFeeds,
  (req, res) => res.status(200).json(res.locals.results)
);

router.get("/*", feedController.getFeed, (req, res) =>
  res.status(200).json(res.locals.results)
);

router.post(
  "/create",
  feedController.createFeed,
  feedController.getFollowedFeed,
  feedController.getProfileFeed,
  feedController.mergeFeeds,
  (req, res) => {
    console.log("in create", res.locals.results);
    res.status(200).json(res.locals.results);
  }
);

router.post(
  "/reply",
  feedController.createFeed,
  feedController.getReplyFeed,
  (req, res) => {
    console.log("in create", res.locals.results);
    res.status(200).json(res.locals.results);
  }
);

export default router;
