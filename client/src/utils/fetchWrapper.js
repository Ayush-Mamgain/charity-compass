import { useNavigate } from "react-router-dom";

//this function is for future use
async function fetchWrapper(requestUrl, requestOptions) {
    const API_URL = import.meta.env.VITE_API_URL;
    const refreshTokenUrl = `${API_URL}/api/refreshToken`;
    const navigate = useNavigate();

    async function getNewAccessToken() {
        try {
            const response = await fetch(refreshTokenUrl); //this would store the token in the cookie
            const result = await response.json();
            return result.data.accessToken;
        } catch(error) {
            //unable to get new access token --> need to login again
            console.error(error);
            console.log('Session expired, Please login again');
            navigate('/loginUser');
        }
    }

    try {
        let response = await fetch(requestUrl, requestOptions)
        if(result.statusCode === 401) { //Unauthorized access
            //access token expired --> request for new access token
            const newAccessToken = getNewAccessToken();
            const retryOptions = {
                ...requestOptions,
                headers: {
                    ...requestOptions.headers,
                    Authorization: `Bearer ${newAccessToken}`
                }
            }
            response = await fetch(requestUrl, retryOptions);
        }
        return response;
    } catch(error) {
        console.error('Error in fetching with refresh toekn:\n',error);
        throw error;
    }
}

module.exports = fetchWrapper;