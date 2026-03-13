import { inject, injectable } from "inversify";
import { ISurveyRepository, PaginationOptions, PaginatedResult } from "../Interfaces/ISurveyRepository";
import { Survey } from "../../Domain/Entities/Survey";
import { IGetAllSurveysUseCase } from "../Interfaces/UseCases/IGetAllSurveysUseCase";

@injectable()
export class GetAllSurveysUseCase implements IGetAllSurveysUseCase {
    constructor(
        @inject("ISurveyRepository") private surveyRepository: ISurveyRepository
    ) { }

    async execute(options: PaginationOptions): Promise<PaginatedResult<Survey>> {
        return this.surveyRepository.findAll(options);
    }
}
