import { Container } from "inversify";
import "reflect-metadata";

// Interfaces
import { ISurveyRepository } from "../../Core/Application/Interfaces/ISurveyRepository.js";

// Implementations
import { MongoSurveyRepository } from "../Persistence/Repositories/MongoSurveyRepository.js";

// Use Cases
import { SubmitSurveyUseCase } from "../../Core/Application/UseCases/SubmitSurveyUseCase.js";
import { GetAllSurveysUseCase } from "../../Core/Application/UseCases/GetAllSurveysUseCase.js";
import { AdminLoginUseCase } from "../../Core/Application/UseCases/AdminLoginUseCase.js";
import { SurveyMapper } from "../../Core/Application/Mappers/SurveyMapper.js";
import { SurveyValidator } from "../../Core/Application/Validators/SurveyValidator.js";
import { SurveyController } from "../../Presentation/Controllers/SurveyController.js";
import { AuthController } from "../../Presentation/Controllers/AuthController.js";

const container = new Container();

// Bind Repositories
container.bind<ISurveyRepository>("ISurveyRepository").to(MongoSurveyRepository);

// Bind Use Cases
// Bind Use Cases
container.bind<SubmitSurveyUseCase>(SubmitSurveyUseCase).toSelf();
container.bind<GetAllSurveysUseCase>(GetAllSurveysUseCase).toSelf();
container.bind<AdminLoginUseCase>(AdminLoginUseCase).toSelf();

// Bind Mappers & Validators
container.bind<SurveyMapper>(SurveyMapper).toSelf();
container.bind<SurveyValidator>(SurveyValidator).toSelf();

// Bind Controllers
container.bind<SurveyController>(SurveyController).toSelf();
container.bind<AuthController>(AuthController).toSelf();

export { container };
