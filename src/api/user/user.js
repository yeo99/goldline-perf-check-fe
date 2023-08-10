import { createAxios } from "../axiosInstance";

// 로그아웃
export const logout = () => {
    return createAxios.get('/logout');
}