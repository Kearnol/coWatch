import axios from 'axios';

export function checkAuth(){
    return axios.get('http://localhost:8000/auth', {withCredentials:true})
    }
