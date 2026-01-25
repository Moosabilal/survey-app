import { Router } from "express";
import { SurveyController } from "../Controllers/SurveyController";
import { container } from "../../Infrastructure/IOC/container";

const router = Router();
const controller = container.get<SurveyController>(SurveyController);

router.post("/submit", (req, res) => controller.submit(req, res));
router.get("/all", (req, res) => controller.getAll(req, res));

export default router;
