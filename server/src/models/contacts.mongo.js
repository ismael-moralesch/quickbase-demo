const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  githubId: {
    type: String,
  },
  twitterUsername: {
    type: String,
  },
  timeZone:  {
    type: String,
  },
  freshdeskId: {
    type: Number,
    required: true,
  }
});

// Connects contactsSchema with the "contacts" collection
module.exports = mongoose.model('Contact', contactsSchema);