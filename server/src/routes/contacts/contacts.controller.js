const { 
    getAllContacts,
    saveContact,
    findById,
    removeById,
  } = require('../../models/contacts.model');

const {
    createFreshdeskContact,
    getFreshdeskContactsByName,
    updateFreshdeskContact,
    httpErrorHandler,
    getFreshdeskContactById,
    getFreshdeskContactByExternalId
} = require('../../services/freshdesk');

const {
    getGithubUser,
} = require('../../services/github');

/*
List all contacts
*/
async function list(req, res){
    const contacts = await getAllContacts();
    return res.status(200).json(contacts);
}
/*
Show one contact by ID
*/
async function show(req, res){
    const contact = await findById(req.params.id)
    if (!contact) {
        return res.status(404).json({
            error: 'Contact not found',
        });
    }
    return res.status(200).json(contact);
}
/*
Add a new contact
*/
async function add(req, res){
    const contact = req.body;

    if (!contact.githubId) {
        return res.status(400).json({
            error: 'Missing required contact property',
        });
    }

    await saveContact(contact);
    return res.status(201).json(contact);
}
/*
Update an existing contact
*/
async function update(req, res){
    const contactId = req.params.id;

    const contact = req.body;

    contact.githubId = contactId;

    await saveContact(contact);
    return res.status(200).json(contact);
}
/*
Removes an existing contact
*/
async function remove(req, res){
    const contactId = req.params.id;

    const existsContact = await findById(contactId);
    if (!existsContact) {
        return res.status(404).json({
        error: 'Contact not found',
        });
    }

    await removeById(contactId);

    return res.status(204).json({
        ok: true,
    });
}
/*
Imports contact from github user and saves it in freshdesk and in mongo database
*/
async function importContact(req, res){
    const { username, subdomain } = req.body;
    const githubResponse = await getGithubUser(username).catch(httpErrorHandler);
    if (!githubResponse.data) {
        if (githubResponse.status === 404) {
            return res.status(404).json({
                error: `GitHub user with username '${username}' doesn't exist`
            });
        }
        return res.status(githubResponse.status).json({
            error: `Get GitHub User failed with message: ${githubResponse.error}`
        });
    }
    const githubUser = githubResponse.data;
    const freshDeskContact = {
        unique_external_id: githubUser.login,
        name: githubUser.name || githubUser.login,
        address: githubUser.location,
        email: githubUser.email ,
        twitter_id: githubUser.twitter_username
    };

    const freshDeskResponse = await getFreshdeskContactByExternalId(githubUser.login, subdomain).catch(httpErrorHandler);
    if (!freshDeskResponse.data) {
        return res.status(freshDeskResponse.status).json({
            error: `Get Freshdesk Contact failed with message: ${freshDeskResponse.error}`
        });
    }
    let creationResponse;
    if (freshDeskResponse.data.length > 0) {
        creationResponse = await updateFreshdeskContact(freshDeskResponse.data[0].id, freshDeskContact, subdomain).catch(httpErrorHandler);

        if (!creationResponse.data) {
            return res.status(creationResponse.status).json({
                error: `Update Freshdesk Contact failed with message: ${creationResponse.error}`
            });
        }
    } else {
        creationResponse = await createFreshdeskContact(freshDeskContact, subdomain).catch(httpErrorHandler);
        if (!creationResponse.data) {
            return res.status(creationResponse.status).json({
                error: `Update Freshdesk Contact failed with message: ${creationResponse.error}`
            });
        }
    }

    const contact = freshDeskContact;
    contact["twitterUsername"] = (githubUser.twitter_username)?githubUser.twitter_username:'';
    contact["email"] = (githubUser.email)?githubUser.email:'';
    contact["githubId"] = githubUser.login;
    contact["timeZone"] = creationResponse.data.time_zone;
    contact["freshdeskId"] = creationResponse.data.id;

    await saveContact(contact);

    return res.status(200).json(creationResponse.data);
    
}

module.exports = {
    list,
    add,
    show,
    remove,
    update,
    importContact,
}