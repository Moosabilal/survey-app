import React, { useEffect, useState } from 'react';
import { getSurveys } from '../services/api';
import { useNavigate } from 'react-router-dom';
import type { Survey } from '../types';

const SurveyList: React.FC = () => {
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }

        const fetchData = async () => {
            try {
                const data = await getSurveys();
                setSurveys(data);
            } catch (error) {
                console.error("Failed to fetch surveys", error);
            }
        };
        fetchData();
    }, [navigate]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Survey Submissions</h2>
            <button onClick={() => { localStorage.removeItem('adminToken'); navigate('/admin/login'); }} className="mb-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Gender</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nationality</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveys.map((survey) => (
                            <tr key={survey.id || survey._id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{survey.name}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{survey.gender}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{survey.nationality}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{survey.email}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{survey.phone}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{survey.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SurveyList;
