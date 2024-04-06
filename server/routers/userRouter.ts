import Router, { Request, Response } from "express";
import userController from "../controllers/userController";
import multer from "multer";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

const router = Router();

router.get("/", userController.searchUsers, (req: Request, res: Response) => {
  res.status(200).json({ data: res.locals.searchResults });
});

router.get(
  "/info",
  userController.getUserInfo,
  userController.getFollowCount,
  (req, res) => {
    res.status(200).json({
      data: res.locals.userInfo,
      following: res.locals.following,
      followers: res.locals.followers,
    });
  }
);

router.get(
  "/isfollowing",
  userController.checkIsFollowing,
  (req: Request, res: Response) => {
    res.status(200).json({ data: res.locals.isFollowing });
  }
);

router.get(
  "/follow",
  userController.toggleFollow,
  (req: Request, res: Response) => {
    res.status(200).json({});
  }
);

router.post(
  "/edit",
  upload.single("file"),
  userController.upsertAvatar,
  userController.editProfile,
  (req: Request, res: Response) => {
    res.status(200).json({ data: res.locals.avatarPublicUrl });
  }
);

export default router;
