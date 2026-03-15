import { inject, injectable } from "inversify";
import { ISurveyRepository } from "../Interfaces/ISurveyRepository";
import { SurveySubmissionDTO } from "../DTOs/SurveySubmissionDTO";
import { Survey } from "../../Domain/Entities/Survey";
import { ISubmitSurveyUseCase, ISurveySubmissionInput } from "../Interfaces/UseCases/ISubmitSurveyUseCase";

@injectable()
export class SubmitSurveyUseCase implements ISubmitSurveyUseCase {
    constructor(
        @inject("ISurveyRepository") private surveyRepository: ISurveyRepository
    ) { }

    async execute(input: ISurveySubmissionInput): Promise<Survey> {
        const dto = new SurveySubmissionDTO(
            input.name,
            input.gender,
            input.nationality,
            input.email,
            input.phone,
            input.address,
            input.message
        );

        const survey = new Survey(
            dto.name,
            dto.gender,
            dto.nationality,
            dto.email,
            dto.phone,
            dto.address,
            dto.message
        );
        return this.surveyRepository.save(survey);
    }
}
