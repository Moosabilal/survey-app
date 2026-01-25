"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyValidator = void 0;
const inversify_1 = require("inversify");
const zod_1 = require("zod");
let SurveyValidator = class SurveyValidator {
    schema = zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        gender: zod_1.z.enum(["Male", "Female", "Other"], { message: "Invalid gender" }),
        nationality: zod_1.z.string().min(1, "Nationality is required"),
        email: zod_1.z.string().email("Invalid email address"),
        phone: zod_1.z.string().regex(/^\d+$/, "Phone must be numeric").min(10, "Phone number too short"),
        address: zod_1.z.string().min(1, "Address is required"),
        message: zod_1.z.string().optional()
    });
    validate(data) {
        return this.schema.safeParse(data);
    }
};
exports.SurveyValidator = SurveyValidator;
exports.SurveyValidator = SurveyValidator = __decorate([
    (0, inversify_1.injectable)()
], SurveyValidator);
