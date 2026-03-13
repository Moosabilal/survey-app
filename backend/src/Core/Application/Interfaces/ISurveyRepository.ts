import { Survey } from "../../Domain/Entities/Survey";

export interface PaginationOptions {
    page: number;
    limit: number;
    searchQuery?: string;
    filters?: {
        gender?: string;
        nationality?: string;
    };
}

export interface PaginatedResult<T> {
    data: T[];
    totalCount: number;
    page: number;
    totalPages: number;
}

export interface ISurveyRepository {
    save(survey: Survey): Promise<Survey>;
    findAll(options: PaginationOptions): Promise<PaginatedResult<Survey>>;
}
