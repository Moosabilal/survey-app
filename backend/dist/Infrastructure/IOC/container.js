"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
// Implementations
const MongoSurveyRepository_1 = require("../Persistence/Repositories/MongoSurveyRepository");
// Use Cases
const SubmitSurveyUseCase_1 = require("../../Core/Application/UseCases/SubmitSurveyUseCase");
const GetAllSurveysUseCase_1 = require("../../Core/Application/UseCases/GetAllSurveysUseCase");
const AdminLoginUseCase_1 = require("../../Core/Application/UseCases/AdminLoginUseCase");
const SurveyMapper_1 = require("../../Core/Application/Mappers/SurveyMapper");
const SurveyValidator_1 = require("../../Core/Application/Validators/SurveyValidator");
const SurveyController_1 = require("../../Presentation/Controllers/SurveyController");
const AuthController_1 = require("../../Presentation/Controllers/AuthController");
const container = new inversify_1.Container();
exports.container = container;
// Bind Repositories
container.bind("ISurveyRepository").to(MongoSurveyRepository_1.MongoSurveyRepository);
// Bind Use Cases
// Bind Use Cases
container.bind(SubmitSurveyUseCase_1.SubmitSurveyUseCase).toSelf();
container.bind(GetAllSurveysUseCase_1.GetAllSurveysUseCase).toSelf();
container.bind(AdminLoginUseCase_1.AdminLoginUseCase).toSelf();
// Bind Mappers & Validators
container.bind(SurveyMapper_1.SurveyMapper).toSelf();
container.bind(SurveyValidator_1.SurveyValidator).toSelf();
// Bind Controllers
container.bind(SurveyController_1.SurveyController).toSelf();
container.bind(AuthController_1.AuthController).toSelf();
