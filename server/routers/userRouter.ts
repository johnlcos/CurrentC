import Router, { Request, Response } from "express";
import userController from "../controllers/userController";

const router = Router();

router.post("/signup", userController.signup, (req: Request, res: Response) => {
  res.status(200).json({ redirectUrl: "http://localhost:3000/overview" });
});

router.post("/signin", userController.signin, (req, res) => {
  res.status(200).json({
    data: res.locals.loggedinUser,
    redirectUrl: "http://localhost:3000/overview",
  });
});

router.get(
  "/session",
  userController.getSession,
  (req: Request, res: Response) => {
    res.status(200).json({ data: res.locals.data });
  }
);

router.get(
  "/signout",
  userController.signout,
  (req: Request, res: Response) => {
    res.status(200).json({
      success: "User logged out",
      redirectUrl: "http://localhost:3000/",
    });
  }
);

router.get("/", userController.searchUsers, (req: Request, res: Response) => {
  res.status(200).json({ data: res.locals.searchResults });
});

router.get("/info", userController.getUserInfo, (req, res) => {
  res.status(200).json({ data: res.locals.userInfo });
});

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

router.put(
  "/edit",
  userController.editProfile,
  (req: Request, res: Response) => {
    res.status(200).json({});
  }
);

export default router;
