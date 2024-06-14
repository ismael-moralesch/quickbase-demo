const yargs = require("yargs");
const axios = require("axios");
const readline = require('node:readline');
require('dotenv').config();

// const options = yargs
//  .usage("Usage: -n <username> -s <subdomain>")
//  .option("n", { alias: "username", describe: "Github username", type: "string", demandOption: true })
//  .option("s", { alias: "subdomain", describe: "Freshdesk subdomain", type: "string", demandOption: true })
//  .argv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const URL_SERVICE_API = `${process.env.URL_SERVICE_API}/v1/contacts/import`;

async function importUser(username, subdomain){
  const response = await axios.post(URL_SERVICE_API, {
    username: username,
    subdomain: subdomain
  }).catch(error => {
    console.log('REQUEST FAILED');
    console.log(JSON.stringify((error.response) ? error.response.data : (error.code==='ECONNREFUSED') ? 'Server down' : 'Unknown error'));
    return error;
  });

  if (response.data) {
    console.log('REQUEST SUCCESS');
    console.log(JSON.stringify(response.data));
  }
}

function question(text) {
  return new Promise( (resolve, reject) => {
    rl.question( text, answer => {
      resolve(answer);
    })
  });
};

(async function main() {
  console.log('Welcome to the GitHub User Importer!!!!\n');
  let answer = '';
  while ( answer.toLowerCase() != 'no' ){
    const username = await question('Please provide a GitHub username: ');
    const subdomain = await question('Please provide a FreshDesk subdomain: ');
    await importUser(username, subdomain)
    answer = await question('Do you want to continue (yes/no)? ');
  }
  console.log( '\nCome back soon!!!');
  rl.close();
})();


