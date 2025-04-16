import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//importing axios api
import api from '../../api/axios';

const Login = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async () => {
    try {
        console.log('Login details:', formData);
        const response = await api.post('/api/user/login', formData);
        console.log('Response:', response);
        localStorage.setItem('userId', response.data.userId);
        navigate('/');
    } catch (error) {
        console.error('Login error:', error);
        alert('Invalid username or password. Please try again.');
    }
  };

return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="p-4 border rounded shadow-sm bg-white" style={{ width: '350px' }}>
            <div className="text-center mb-4">
                <img
                    src="https://zerodha.com/static/images/logo.svg"
                    alt="Zerodha Logo"
                    style={{ width: '150px' }}
                />
                <h5 className="mt-3 mb-1">Log in to your account</h5>
                <small className="text-muted">Enter your credentials to continue</small>
            </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>
                    Log In
                </button>

            <div className="text-center mt-3">
                <small className="text-muted">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </small>
            </div>
        </div>
    </div>
);
};

export default Login;
