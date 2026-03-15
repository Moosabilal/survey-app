import { Survey } from "../../../Domain/Entities/Survey";

export interface ISurveySubmissionInput {
    name: string;
    gender: string;
    nationality: string;
    email: string;
    phone: string;
    address: string;
    message: string;
}

export interface ISubmitSurveyUseCase {
    execute(input: ISurveySubmissionInput): Promise<Survey>;
}
