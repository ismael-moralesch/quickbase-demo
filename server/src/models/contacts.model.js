const contactsDatabase = require('./contacts.mongo');

async function getAllContacts() {
    return await contactsDatabase.find({},);
}

async function saveContact(contact) {
    await contactsDatabase.findOneAndUpdate({
        githubId: contact.githubId,
      }, contact, {
        upsert: true,
      });
}

async function findById(id) {
    return await contactsDatabase.findOne({
        githubId: id
    });
}

async function removeById(id) {
    await contactsDatabase.findOneAndDelete({
        githubId: id
    });
}

module.exports = {
    getAllContacts,
    saveContact,
    findById,
    removeById,
}