import React, { useState } from 'react';
import { loginAdmin } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiShield } from 'react-icons/fi'; // Icons for professional look

const AdminLogin: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await loginAdmin(formData.email, formData.password);
            if (data.token) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin/dashboard');
            } else {
                 setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.log(err);
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    const inputWrapperClass = "relative";
    const inputClass = "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-200 transition-all duration-200 bg-gray-50 focus:bg-white";
    const iconClass = "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400";

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01]">
                
                <div className="bg-slate-900 p-8 text-center">
                    <div className="mx-auto bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <FiShield className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-wider">Admin Portal</h2>
                    <p className="text-slate-400 text-sm mt-2">Secure Access Only</p>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm rounded animate-pulse">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <div className={inputWrapperClass}>
                                <div className={iconClass}>
                                    <FiMail className="h-5 w-5" />
                                </div>
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="admin@company.com" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                    className={inputClass} 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <div className={inputWrapperClass}>
                                <div className={iconClass}>
                                    <FiLock className="h-5 w-5" />
                                </div>
                                <input 
                                    type="password" 
                                    name="password"
                                    placeholder="••••••••" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    required 
                                    className={inputClass} 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`w-full py-3 px-4 rounded-lg text-white font-bold tracking-wide shadow-lg transition-all duration-300
                                ${loading 
                                    ? 'bg-slate-500 cursor-not-allowed' 
                                    : 'bg-slate-900 hover:bg-slate-800 hover:shadow-xl transform hover:-translate-y-0.5'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Authenticating...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </form>
                </div>
                
                <div className="bg-gray-50 py-4 text-center border-t border-gray-100">
                    <p className="text-xs text-gray-500">Authorized personnel only. All activities are monitored.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;