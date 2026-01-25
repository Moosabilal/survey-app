"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyController = void 0;
const inversify_1 = require("inversify");
const SubmitSurveyUseCase_1 = require("../../Core/Application/UseCases/SubmitSurveyUseCase");
const GetAllSurveysUseCase_1 = require("../../Core/Application/UseCases/GetAllSurveysUseCase");
const SurveySubmissionDTO_1 = require("../../Core/Application/DTOs/SurveySubmissionDTO");
const SurveyValidator_1 = require("../../Core/Application/Validators/SurveyValidator");
let SurveyController = class SurveyController {
    _submitSurveyUseCase;
    _getAllSurveysUseCase;
    _validator;
    constructor(submitSurveyUseCase, getAllSurveysUseCase, validator) {
        this._submitSurveyUseCase = submitSurveyUseCase;
        this._getAllSurveysUseCase = getAllSurveysUseCase;
        this._validator = validator;
    }
    async submit(req, res) {
        try {
            const validation = this._validator.validate(req.body);
            if (!validation.success) {
                res.status(400).json({ errors: validation.error.errors });
                return;
            }
            const { name, gender, nationality, email, phone, address, message } = req.body;
            const dto = new SurveySubmissionDTO_1.SurveySubmissionDTO(name, gender, nationality, email, phone, address, message);
            const result = await this._submitSurveyUseCase.execute(dto);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getAll(req, res) {
        try {
            const result = await this._getAllSurveysUseCase.execute();
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
exports.SurveyController = SurveyController;
exports.SurveyController = SurveyController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(SubmitSurveyUseCase_1.SubmitSurveyUseCase)),
    __param(1, (0, inversify_1.inject)(GetAllSurveysUseCase_1.GetAllSurveysUseCase)),
    __param(2, (0, inversify_1.inject)(SurveyValidator_1.SurveyValidator)),
    __metadata("design:paramtypes", [SubmitSurveyUseCase_1.SubmitSurveyUseCase,
        GetAllSurveysUseCase_1.GetAllSurveysUseCase,
        SurveyValidator_1.SurveyValidator])
], SurveyController);
