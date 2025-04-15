import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//importing axios api
import api from '../../api/axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async ( ) => {
    try {
        console.log('Form Data:', formData);
        const response = await api.post('/api/user', formData);
        console.log('Response:', response.data.user.username);
        localStorage.setItem('username', response.data.user.username);
        alert(`Welcome, ${formData.username}!`);
        // Redirect to login page after successful signup
        let navigate = useNavigate();
        navigate('/');
    } catch (error) {
        console.error('Signup error:', error);
        alert('Error signing up. Please try again.');
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
                <h5 className="mt-3 mb-1">Create your account</h5>
                <small className="text-muted">Start investing today</small>
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
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={formData.email}
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
                    Sign Up
                </button>


            <div className="text-center mt-3">
                <small className="text-muted">
                    Already have an account? <Link to="/login">Log in</Link>
                </small>
            </div>
        </div>
    </div>
);
};

export default Signup;
