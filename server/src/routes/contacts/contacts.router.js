const express = require('express');

const { 
    list,
    add,
    show,
    remove,
    update,
    importContact
 } = require('./contacts.controller');

const contactsRouter = express.Router();

contactsRouter.get('/', list);
contactsRouter.post('/', add);
contactsRouter.get('/:id', show);
contactsRouter.put('/:id', update);
contactsRouter.delete('/:id', remove);
contactsRouter.post('/import', importContact);

module.exports = contactsRouter;