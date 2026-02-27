import { Survey } from "../../../Domain/Entities/Survey";

export interface IGetAllSurveysUseCase {
    execute(): Promise<Survey[]>;
}
