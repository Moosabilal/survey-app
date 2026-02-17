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

const container = new Container();

container.bind<ISurveyRepository>("ISurveyRepository").to(MongoSurveyRepository);

container.bind<SubmitSurveyUseCase>(SubmitSurveyUseCase).toSelf();
container.bind<GetAllSurveysUseCase>(GetAllSurveysUseCase).toSelf();
container.bind<AdminLoginUseCase>(AdminLoginUseCase).toSelf();

container.bind<SurveyMapper>(SurveyMapper).toSelf();
container.bind<SurveyValidator>(SurveyValidator).toSelf();

container.bind<SurveyController>(SurveyController).toSelf();
container.bind<AuthController>(AuthController).toSelf();

export { container };
