import { Survey } from "../../../Domain/Entities/Survey";
import { PaginationOptions, PaginatedResult } from "../ISurveyRepository";

export interface IGetAllSurveysUseCase {
    execute(options: PaginationOptions): Promise<PaginatedResult<Survey>>;
}
