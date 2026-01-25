import { inject, injectable } from "inversify";
import { ISurveyRepository } from "../Interfaces/ISurveyRepository.js";
import { Survey } from "../../Domain/Entities/Survey.js";

@injectable()
export class GetAllSurveysUseCase {
    constructor(
        @inject("ISurveyRepository") private surveyRepository: ISurveyRepository
    ) { }

    async execute(): Promise<Survey[]> {
        return this.surveyRepository.findAll();
    }
}
