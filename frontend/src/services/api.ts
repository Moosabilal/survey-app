import { apiClient } from '../lib/apiClient';
import type { SurveySubmissionData } from '../types';

export interface SurveyFilters {
    page?: number;
    limit?: number;
    search?: string;
    gender?: string;
    nationality?: string;
}

export const submitSurvey = async (data: SurveySubmissionData) => {
    const response = await apiClient.post(`/surveys/submit`, data);
    return response.data;
};

export const getSurveys = async (params?: SurveyFilters) => {
    const response = await apiClient.get(`/surveys/all`, { params });
    return response.data;
};

export const loginAdmin = async (email: string, password: string) => {
    const response = await apiClient.post(`/auth/login`, { email, password });
    return response.data;
};

export const logoutAdmin = async () => {
    const response = await apiClient.post(`/auth/logout`);
    return response.data;
};

export const verifyAdminSession = async () => {
    const response = await apiClient.get(`/auth/verify`);
    return response.data;
};
