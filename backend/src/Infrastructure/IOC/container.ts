import { Container } from "inversify";
import "reflect-metadata";

import { ISurveyRepository } from "../../Core/Application/Interfaces/ISurveyRepository";

import { MongoSurveyRepository } from "../Persistence/Repositories/MongoSurveyRepository";

import { SubmitSurveyUseCase } from "../../Core/Application/UseCases/SubmitSurveyUseCase";
import { GetAllSurveysUseCase } from "../../Core/Application/UseCases/GetAllSurveysUseCase";
import { AdminLoginUseCase } from "../../Core/Application/UseCases/AdminLoginUseCase";
import { SurveyMapper } from "../../Core/Application/Mappers/SurveyMapper";
import { SurveyValidator } from "../../Core/Application/Validators/SurveyValidator";
import { SurveyController } from "../../Presentation/Controllers/SurveyController";
import { AuthController } from "../../Presentation/Controllers/AuthController";

import { ISubmitSurveyUseCase } from "../../Core/Application/Interfaces/UseCases/ISubmitSurveyUseCase";
import { IGetAllSurveysUseCase } from "../../Core/Application/Interfaces/UseCases/IGetAllSurveysUseCase";
import { IAdminLoginUseCase } from "../../Core/Application/Interfaces/UseCases/IAdminLoginUseCase";

const container = new Container();

container.bind<ISurveyRepository>("ISurveyRepository").to(MongoSurveyRepository);

container.bind<ISubmitSurveyUseCase>("ISubmitSurveyUseCase").to(SubmitSurveyUseCase);
container.bind<IGetAllSurveysUseCase>("IGetAllSurveysUseCase").to(GetAllSurveysUseCase);
container.bind<IAdminLoginUseCase>("IAdminLoginUseCase").to(AdminLoginUseCase);

container.bind<SurveyMapper>(SurveyMapper).toSelf();
container.bind<SurveyValidator>(SurveyValidator).toSelf();

container.bind<SurveyController>(SurveyController).toSelf();
container.bind<AuthController>(AuthController).toSelf();

export { container };
