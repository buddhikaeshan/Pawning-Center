import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.accountType === 'superadmin') {
          navigate('/Dashboard');
        } else if (data.accountType === 'admin') {
          navigate('/DashboardAdmin');
        } else {
          alert('Unknown account type');
        }
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <p className="text-center mb-5">Enter your details</p>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Type Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Type Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-dark w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
