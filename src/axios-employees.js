import axios from 'axios';

const instance = axios.create({
    baseUrl: 'https://randomuser.me/api/',
});

export default instance;