import axios from 'axios';
import type { SurveySubmissionData } from '../types';

const API_URL = 'http://localhost:5000/api';

export const submitSurvey = async (data: SurveySubmissionData) => {
    const response = await axios.post(`${API_URL}/surveys/submit`, data);
    return response.data;
};

export const getSurveys = async () => {
    const response = await axios.get(`${API_URL}/surveys/all`);
    return response.data;
};

export const loginAdmin = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
};
