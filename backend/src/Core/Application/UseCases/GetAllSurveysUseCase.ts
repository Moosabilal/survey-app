import { inject, injectable } from "inversify";
import { ISurveyRepository } from "../Interfaces/ISurveyRepository";
import { Survey } from "../../Domain/Entities/Survey";

@injectable()
export class GetAllSurveysUseCase {
    constructor(
        @inject("ISurveyRepository") private surveyRepository: ISurveyRepository
    ) { }

    async execute(): Promise<Survey[]> {
        return this.surveyRepository.findAll();
    }
}
