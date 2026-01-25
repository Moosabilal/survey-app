import { Router } from "express";
import { AuthController } from "../Controllers/AuthController.js";
import { container } from "../../Infrastructure/IOC/container.js";

const router = Router();
const controller = container.get<AuthController>(AuthController);

router.post("/login", (req, res) => controller.login(req, res));

export default router;
