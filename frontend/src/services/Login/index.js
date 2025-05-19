import axios from 'axios';
import * as urlPath from '../../path/path'

const BASE_URL = urlPath.BASE_URL;

export const validateUser = async (params) => {
    try {
        let config = {
            method: 'POST',
            url: BASE_URL + urlPath.USER_LOGIN,
            data: params
        }
    
        const response = await axios(config);
        return response;
    }
    catch (error) {
        return error;
    }
}