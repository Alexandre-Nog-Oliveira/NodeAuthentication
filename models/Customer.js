const mongosse = require('mongoose');

const Customer = mongosse.Model('Customer', {
    name: String,
    email: String,
    password: String,
    DateOfBirth: Date,
    Document: String,
})

module.exports = Customer