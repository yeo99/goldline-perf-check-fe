/**
 * 철도 구간 코드, 역명 코드를 가져오는 API
 */

import { createAxios } from "../axiosInstance";

// 철도 구간 코드
export const getRailwaySection = () => {
    return createAxios.get('/railway/sections')
}

// 역명 코드
export const getRailwayStation = () => {
    return createAxios.get('/railway/stations')
}
