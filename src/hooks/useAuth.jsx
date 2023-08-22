// 사용자 인증을 위한 hook
import { useState, useEffect } from 'react';
import { createAxios } from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === null) {
        createAxios.get('/auth/check')
            .then(response => {
                if (response.data.isAuthenticated) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch(error => {
                const errorMessage = error.response.data.error
                alert(errorMessage)
                setIsAuthenticated(false);
                navigate('/login');
            })
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated;
};

export default useAuth;
