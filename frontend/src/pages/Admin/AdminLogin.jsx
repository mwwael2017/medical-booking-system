import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import './AdminLogin.css';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock authentication
        if (credentials.email === 'admin@medbook.com' && credentials.password === 'admin123') {
            localStorage.setItem('adminToken', 'mock-token-12345');
            navigate('/admin');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="admin-login-page">
            <div className="login-container">
                <div className="login-header">
                    <div className="login-icon-wrapper">
                        <ShieldCheck size={32} className="login-icon" />
                    </div>
                    <h1>Welcome Back</h1>
                    <p>Enter your credentials to access the admin portal</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    {error && <div className="login-error">{error}</div>}

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="admin@medbook.com"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="••••••••"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        Sign In to Dashboard
                    </button>

                    <div className="login-hint">
                        <strong>Demo Access:</strong> admin@medbook.com / admin123
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
