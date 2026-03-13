import React, { useEffect, useState } from 'react';
import { getSurveys } from '../services/api';
import { useNavigate } from 'react-router-dom';
import type { Survey } from '../types';

const SurveyList: React.FC = () => {
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [page, setPage] = useState(1);
    const limit = 3;
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [gender, setGender] = useState('');
    const [nationality, setNationality] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(search), 500);
        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }

        const fetchData = async () => {
            try {
                const params: Record<string, string | number> = { page, limit };
                if (debouncedSearch) params.search = debouncedSearch;
                if (gender) params.gender = gender;
                if (nationality) params.nationality = nationality;

                const response = await getSurveys(params);
                if (response && response.data) {
                    setSurveys(response.data);
                    setTotalPages(response.totalPages);
                } else if (Array.isArray(response)) {
                    setSurveys(response);
                    setTotalPages(1);
                }
            } catch (error) {
                console.error("Failed to fetch surveys", error);
            }
        };
        fetchData();
    }, [navigate, page, limit, debouncedSearch, gender, nationality]);

    const exportToCSV = () => {
        if (surveys.length === 0) return;

        const headers = ["Name", "Gender", "Nationality", "Email", "Phone", "Message"];
        const csvRows = [
            headers.join(','),
            ...surveys.map(s => [
                `"${s.name}"`,
                `"${s.gender}"`,
                `"${s.nationality}"`,
                `"${s.email}"`,
                `"${s.phone}"`,
                `"${s.message.replace(/"/g, '""')}"`
            ].join(','))
        ];

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `survey_submissions_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Survey Submissions</h2>
                <div className="space-x-4">
                    <button
                        onClick={exportToCSV}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition duration-200"
                    >
                        Export to CSV
                    </button>
                    <button
                        onClick={() => { localStorage.removeItem('adminToken'); navigate('/admin/login'); }}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="border p-2 rounded w-full md:w-1/3"
                />
                <select
                    value={gender}
                    onChange={(e) => { setGender(e.target.value); setPage(1); }}
                    className="border p-2 rounded"
                >
                    <option value="">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <select
                    value={nationality}
                    onChange={(e) => { setNationality(e.target.value); setPage(1); }}
                    className="border p-2 rounded"
                >
                    <option value="">All Nationalities</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="India">India</option>
                    <option value="Other">Other</option>
                </select>
            </div>

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

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 hover:bg-blue-700 text-white transition'}`}
                >
                    Previous
                </button>
                <span className="text-gray-700 font-medium">Page {page} of {totalPages}</span>
                <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages || totalPages === 0}
                    className={`px-4 py-2 rounded ${page === totalPages || totalPages === 0 ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 hover:bg-blue-700 text-white transition'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SurveyList;
