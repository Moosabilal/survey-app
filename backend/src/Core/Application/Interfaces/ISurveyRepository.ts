import { Survey } from "../../Domain/Entities/Survey";

export interface ISurveyRepository {
    save(survey: Survey): Promise<Survey>;
    findAll(): Promise<Survey[]>;
}
