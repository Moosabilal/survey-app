import React, { useState } from 'react';
import { submitSurvey } from '../services/api';
import { FiUser, FiMail, FiPhone, FiFlag, FiMapPin } from 'react-icons/fi';

const SurveyForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        nationality: '',
        email: '',
        phone: '',
        address: '',
        message: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.nationality) newErrors.nationality = 'Nationality is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\d{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be at least 10 digits';
        }
        if (!formData.address) newErrors.address = 'Address is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);

        try {
            await submitSurvey(formData);
            setStatus('success');
            setFormData({ name: '', gender: '', nationality: '', email: '', phone: '', address: '', message: '' });
            setErrors({});
            setTimeout(() => setStatus(''), 5000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = (hasError: boolean) => `
        w-full pl-10 p-3 border rounded-lg outline-none transition-all duration-200
        ${hasError 
            ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200' 
            : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-gray-50 focus:bg-white'}
    `;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                
                <div className="bg-blue-600 p-8 text-center">
                    <h2 className="text-3xl font-bold text-white tracking-wide">Survey Form</h2>
                    <p className="mt-2 text-blue-100">We value your feedback. Please fill out the details below.</p>
                </div>

                <div className="p-8">
                    {status === 'success' && (
                        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
                            <p className="font-medium">Success!</p>
                            <p className="text-sm">Your survey has been submitted successfully.</p>
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                            <p className="font-medium">Error!</p>
                            <p className="text-sm">Something went wrong. Please try again later.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        placeholder="John Doe" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        className={inputClasses(!!errors.name)} 
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">Gender</label>
                                <div className="relative">
                                    <select 
                                        name="gender"
                                        title='Gender'
                                        value={formData.gender} 
                                        onChange={handleChange} 
                                        className={inputClasses(!!errors.gender)}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                {errors.gender && <p className="text-red-500 text-xs mt-1 ml-1">{errors.gender}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="john@example.com" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        className={inputClasses(!!errors.email)} 
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">Phone Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiPhone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input 
                                        type="tel" 
                                        name="phone" 
                                        placeholder="+1 234 567 890" 
                                        value={formData.phone} 
                                        onChange={handleChange} 
                                        className={inputClasses(!!errors.phone)} 
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                            </div>

                             <div className="space-y-2 col-span-1 md:col-span-2">
                                <label className="text-sm font-semibold text-gray-600">Nationality</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiFlag className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input 
                                        type="text" 
                                        name="nationality" 
                                        placeholder="Enter Nationality" 
                                        value={formData.nationality} 
                                        onChange={handleChange} 
                                        className={inputClasses(!!errors.nationality)} 
                                    />
                                </div>
                                {errors.nationality && <p className="text-red-500 text-xs mt-1 ml-1">{errors.nationality}</p>}
                            </div>
                        </div>

                        <div className="space-y-2 mt-4">
                            <label className="text-sm font-semibold text-gray-600">Address</label>
                            <div className="relative">
                                <div className="absolute top-3 left-3 pointer-events-none">
                                    <FiMapPin className="h-5 w-5 text-gray-400" />
                                </div>
                                <textarea 
                                    name="address" 
                                    placeholder="Full street address..." 
                                    value={formData.address} 
                                    onChange={handleChange} 
                                    className={`${inputClasses(!!errors.address)} h-24 pl-10`} 
                                />
                            </div>
                            {errors.address && <p className="text-red-500 text-xs mt-1 ml-1">{errors.address}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Additional Message (Optional)</label>
                            <textarea 
                                name="message" 
                                placeholder="Any feedback or suggestions..." 
                                value={formData.message} 
                                onChange={handleChange} 
                                className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-gray-50 focus:bg-white transition-all h-24" 
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`w-full py-3 px-4 rounded-lg text-white font-semibold tracking-wide shadow-md transition-all duration-200 
                                ${loading 
                                    ? 'bg-blue-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
                                }`}
                        >
                            {loading ? 'Submitting...' : 'Submit Survey'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SurveyForm;