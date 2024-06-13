const yargs = require("yargs");
const axios = require("axios");
require('dotenv').config();

const options = yargs
 .usage("Usage: -n <username> -s <subdomain>")
 .option("n", { alias: "username", describe: "Github username", type: "string", demandOption: true })
 .option("s", { alias: "subdomain", describe: "Freshdesk subdomain", type: "string", demandOption: true })
 .argv;

const URL_SERVICE_API = `${process.env.URL_SERVICE_API}/v1/contacts/import`;

axios.post(URL_SERVICE_API, {
    username: options.username,
    subdomain: options.subdomain
}).then(response => {
  console.log('REQUEST SUCCESS');
  console.log(JSON.stringify(response.data));
}).catch(error => {
  console.log('REQUEST FAILED');
  console.log(JSON.stringify((error.response) ? error.response.data : (error.code==='ECONNREFUSED') ? 'Server down' : 'Unknown error'));
});