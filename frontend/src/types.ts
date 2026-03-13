export interface Survey {
    id?: string;
    _id?: string;
    name: string;
    gender: string;
    nationality: string;
    email: string;
    phone: string;
    address: string;
    message: string;
}

export interface SurveySubmissionData {
    name: string;
    gender: string;
    nationality: string;
    email: string;
    phone: string;
    address: string;
    message: string;
}

export interface PaginatedSurveys {
    data: Survey[];
    totalCount: number;
    page: number;
    totalPages: number;
}
