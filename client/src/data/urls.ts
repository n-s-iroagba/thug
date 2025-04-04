import config from './config'
export const BACKEND_SERVER_URL  = config.apiDomain


export const loginUrl =`${BACKEND_SERVER_URL}/auth/login`
export const verifyEmailUrl = `${BACKEND_SERVER_URL}/auth/verify-email`;
export const resendVerificationCodeUrl = `${BACKEND_SERVER_URL}/resend-verification-code`;

//fan Urls
export const fanSignUpWithContactUrl = `${BACKEND_SERVER_URL}/fans/contact/signup`
export const fanSignupUrl = `${BACKEND_SERVER_URL}/fans/signup`
export const getAllFansUrl = `${BACKEND_SERVER_URL}/fans`
export const  getOneFanUrlId = `${BACKEND_SERVER_URL}/fans/one`
export const updateFanUrlId = `${BACKEND_SERVER_URL}/fans`
export const deleteFanUrlId = `${BACKEND_SERVER_URL}/fans/delete`




export const fetchAllCelebritiesUrl = `${BACKEND_SERVER_URL}/celebrities`


export const fetchFanJobsUrl =`${BACKEND_SERVER_URL}/jobs`
export const fetchJobDetailsUrl = `${BACKEND_SERVER_URL}/jobs`


export  const createAdminUrl =`${BACKEND_SERVER_URL}/admin/`