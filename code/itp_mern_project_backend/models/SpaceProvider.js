const mongoose = require('mongoose');

const spaceProviderSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    company_id: { type: mongoose.Schema.Types.ObjectId },
    roles: [{ 
        type: String,
        default: "user" 
    }],
    profile_status: { type: Boolean, default: true },
    space_ids: [{ type: mongoose.Schema.Types.ObjectId }]
});

module.exports = mongoose.model('SpaceProvider', spaceProviderSchema);
 