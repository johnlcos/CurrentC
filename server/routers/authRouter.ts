import Router, { Request, Response } from "express";
import authController from "../controllers/authController";

const router = Router();

router.post("/signup", authController.signup, (req: Request, res: Response) => {
  res.status(200).json({ redirectUrl: "http://localhost:3000/overview" });
});

router.post("/signin", authController.signin, (req, res) => {
  res.status(200).json({
    data: res.locals.loggedinUser,
    redirectUrl: "http://localhost:3000/overview",
  });
});

router.get(
  "/session",
  authController.getSession,
  (req: Request, res: Response) => {
    res.status(200).json({ data: res.locals.data });
  }
);

router.get(
  "/signout",
  authController.signout,
  (req: Request, res: Response) => {
    res.status(200).json({
      success: "User logged out",
      redirectUrl: "http://localhost:3000/",
    });
  }
);

export default router;
