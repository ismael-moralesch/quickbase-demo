const axios = require('axios');

require('dotenv').config();

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_USER_ENDPOINT = '/users';
const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN;

function getGithubUser(username) {
    const config = {
        headers: { Authorization: `Bearer ${GITHUB_API_TOKEN}` }
    };
    
    const response = axios.get(`${GITHUB_API_URL}${GITHUB_USER_ENDPOINT}/${username}`, config);
    return response;
}

module.exports = {
    getGithubUser,
}