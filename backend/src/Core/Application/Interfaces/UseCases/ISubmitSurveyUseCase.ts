import { SurveySubmissionDTO } from "../../DTOs/SurveySubmissionDTO";
import { Survey } from "../../../Domain/Entities/Survey";

export interface ISubmitSurveyUseCase {
    execute(input: SurveySubmissionDTO): Promise<Survey>;
}
