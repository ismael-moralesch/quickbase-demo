const express = require('express');

const contactsRouter = require('./contacts/contacts.router');

const api = express.Router();

api.use('/contacts', contactsRouter);

module.exports = api;