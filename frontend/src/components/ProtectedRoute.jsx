import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('http://localhost:5000/api/protected', {
        method: 'GET',
        credentials: 'include', // Include credentials for cookies
      });

      if (!response.ok) {
        navigate('/Login');
      }
    };

    checkAuth();
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
