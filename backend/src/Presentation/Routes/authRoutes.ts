import { Router } from "express";
import { AuthController } from "../Controllers/AuthController";
import { container } from "../../Infrastructure/IOC/container";
import { authMiddleware } from "../Middleware/authMiddleware";

const router = Router();
const controller = container.get<AuthController>(AuthController);

router.post("/login", (req, res) => controller.login(req, res));
router.post("/logout", (req, res) => controller.logout(req, res));
router.get("/verify", (req, res) => {
    res.status(200).json({ message: "Authenticated" });
});

export default router;
