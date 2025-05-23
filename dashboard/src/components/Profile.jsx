import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//importing axios api
import api from "../api/axios";

const UserProfile = () => {
  const [newPassword, setNewPassword] = useState('');

  const [userInfo, setUserInfo] = useState({});

  const Navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get(`/api/user/${localStorage.getItem('userId')}`);
        console.log('Fetching user info...');
        console.log(response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [])

  const handlePasswordUpdate = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("User not found in localStorage");
      return;
    }

    if (!newPassword.trim()) {
      alert('Please enter a valid password');
      return;
    }

    const response = await api.patch(`/api/user/${userId}`, { password: newPassword });
    console.log('Updating password...');
    console.log('Response:', response);
    
    console.log(response.data);
    if (response.status === 200) {
      alert(response.data.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await api.post('/api/user/logout');
      console.log('Logging out...');
      console.log('Response:', response);

      localStorage.removeItem('userId'); // Clear username from local storage after logout
      if (response.status === 200) {
        alert(response.data.message);
        Navigate("/login") // Redirect to login page
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">

        {/* SECTION 1: USER INFO */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title mb-3">👤 Profile Information</h5>
              <div className="mb-3">
                <label className="form-label fw-semibold">Username</label>
                <input type="text" className="form-control" value={userInfo.username || " "} disabled readOnly />
              </div>
              <div>
                <label className="form-label fw-semibold">Email</label>
                <input type="email" className="form-control" value={userInfo.email || " "} disabled readOnly />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: PASSWORD UPDATE */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title mb-3">🔒 Update Password</h5>
              <div className="mb-3">
                <label className="form-label fw-semibold">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-success w-100" onClick={handlePasswordUpdate}>
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 3: LOGOUT */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title mb-3">🚪 Logout</h5>
              <p className="text-muted">Click the button below to safely log out of your account.</p>
              <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
