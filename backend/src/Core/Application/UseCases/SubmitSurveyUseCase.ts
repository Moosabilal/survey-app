import { inject, injectable } from "inversify";
import { ISurveyRepository } from "../Interfaces/ISurveyRepository";
import { SurveySubmissionDTO } from "../DTOs/SurveySubmissionDTO";
import { Survey } from "../../Domain/Entities/Survey";
import { ISubmitSurveyUseCase } from "../Interfaces/UseCases/ISubmitSurveyUseCase";

@injectable()
export class SubmitSurveyUseCase implements ISubmitSurveyUseCase {
    constructor(
        @inject("ISurveyRepository") private surveyRepository: ISurveyRepository
    ) { }

    async execute(input: SurveySubmissionDTO): Promise<Survey> {
        const survey = new Survey(
            input.name,
            input.gender,
            input.nationality,
            input.email,
            input.phone,
            input.address,
            input.message
        );
        return this.surveyRepository.save(survey);
    }
}
