const axios = require('axios');

require('dotenv').config();

const FRESHDESK_API_URL = 'freshdesk.com/api/v2';
const FRESHDESK_CONTACT_ENDPOINT = '/contacts';
const FRESHDESK_API_TOKEN = process.env.FRESHDESK_API_TOKEN;

function createFreshdeskContact(contact, subdomain) {
    const config = {
        headers: { Authorization: `Basic ${new Buffer.from(FRESHDESK_API_TOKEN).toString('base64')}` }
    }

    return axios.post(`https://${subdomain}.${FRESHDESK_API_URL}${FRESHDESK_CONTACT_ENDPOINT}`, contact, config);
}

function getFreshdeskContact(name, subdomain){
    const config = {
        headers: { Authorization: `Basic ${new Buffer.from(FRESHDESK_API_TOKEN).toString('base64')}` }
    }

    return axios.get(`https://${subdomain}.${FRESHDESK_API_URL}${FRESHDESK_CONTACT_ENDPOINT}/autocomplete?term=${name}`, config);
}

function updateFreshdeskContact(id, contact, subdomain){
    const config = {
        headers: { Authorization: `Basic ${new Buffer.from(FRESHDESK_API_TOKEN).toString('base64')}` }
    }

    return axios.put(`https://${subdomain}.${FRESHDESK_API_URL}${FRESHDESK_CONTACT_ENDPOINT}/${id}`, contact, config);
}

function httpErrorHandler(error) {
    return {
        error: error.message,
        status: error.response.status
    };
}

module.exports = {
    createFreshdeskContact,
    getFreshdeskContact,
    updateFreshdeskContact,
    httpErrorHandler,
}