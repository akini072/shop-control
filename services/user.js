import axios from './axios'
import {
    tokenFormated
} from './authenticate';

export const loginUser = (user) => axios.post('/auth/authenticate', user);

export const registerUser = (user) => axios.post('/auth/register', user);

export const loadingUsers = async () => axios.get('/auth', {
    headers: {
        authorization: await tokenFormated()
    }
});
