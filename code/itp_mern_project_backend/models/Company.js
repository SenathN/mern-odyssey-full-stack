const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String, default: "none"}
});

module.exports = mongoose.model('Company', companySchema);
