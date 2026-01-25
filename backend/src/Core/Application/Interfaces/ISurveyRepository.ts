import { Survey } from "../../Domain/Entities/Survey.js";

export interface ISurveyRepository {
    save(survey: Survey): Promise<Survey>;
    findAll(): Promise<Survey[]>;
}
