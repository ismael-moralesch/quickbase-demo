# QUICKBASE DEMO

## Getting Started

1. Ensure you have Node.js installed.
2. Create a [Mongo Atlas](https://www.mongodb.com/atlas/database) database online or start a local MongoDB database.
3. Create a `server/.env` file with following properties:
    `PORT` property set to the port you want the express api to run on.
    `MONGO_URL` property set to your MongoDB connection string.
    `FRESHDESK_API_TOKEN` token to authenticate in the FreshDesk API.
    `GITHUB_API_TOKEN` token to authenticate in the GitHub API.
3. Create a `client/.env` file with following properties:
    `URL_SERVICE_API` property set to the url where the express API will run (in our case should be `http://localhost:PORT`).
4. In the terminal, run: `npm install`

## Running the Project

1. In the terminal, run: `npm run server`
2. In a second terminal:
    go inside client folder 'client' by running `cd client`
    run `node index.js -n <github username> -s <freshdesk subdomain>`
