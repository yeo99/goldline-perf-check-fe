import { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { createAxios } from '../../api/axiosInstance';

const PrivateRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // 서버에 인증 확인 요청
        createAxios.get('/auth/check')
            .then(response => {
                if (response.data.isAuthenticated) {
                    setIsAuthenticated(true);
                }
            })
            .catch(error => {
                console.error('Authentication check failed', error);
                if (error.response && error.response.data && error.response.data.error) {
                    alert(error.response.data.error);
                }
            })
            // 나중에 로딩 컴포넌트 필요하면 그때가서 추가
            // .finally(() => {
            //     setIsLoading(false);
            // });
    }, []);

    // 로딩 중인 경우 로딩 표시
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // 로딩이 완료되었으나 인증되지 않은 경우 로그인 페이지로 리디렉션
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 인증된 경우 원래의 컴포넌트 렌더링
    return children;
};

export default PrivateRoute;
