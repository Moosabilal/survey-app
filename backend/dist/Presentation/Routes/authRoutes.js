"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../Controllers/AuthController");
const container_1 = require("../../Infrastructure/IOC/container");
const router = (0, express_1.Router)();
const controller = container_1.container.get(AuthController_1.AuthController);
router.post("/login", (req, res) => controller.login(req, res));
exports.default = router;
