let mongoose = require('mongoose');

let contactSchema = mongoose.Schema({
    name: String,
    number: String,
    email: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('contact', contactSchema);