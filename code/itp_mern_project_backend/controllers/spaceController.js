const Space = require('../models/Space');
const spaceController = require('./spaceController');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// @desc Create new space   
// @route POST /space
// @access Private
const createSpace = asyncHandler(async (req, res) => {
    const { name } = req.body;

    // back-end validation
    if (!name )
        return res.status(400).json({ message: 'All fields are required.' })

    // avoids duplicate usernames
    const duplicate = await Space.findOne({ name: name }).lean().exec();
    if (duplicate)
        return res.status(409).json({ message: "Space entry already exists." });

    // final object
    const compObject = { name: name }
    const result = await Space.create(compObject);

    if (result)
        return res.status(201).json({ message: `New space entry ${result.name} was created.` })
    else
        return res.status(400).json({ message: `Space entry creation has failed.` }) // bad reqruest

});

// @desc Gets all spaces   
// @route GET /space
// @access Private
const getAllSpaces = asyncHandler(async (req, res) => {
    const spaces = await Space.find().select().lean();

    if (!spaces?.length) return res.status(400).json({ message: 'No accounts found.' }); //bad request
    return res.json(spaces);

});

// @desc Get a user  
// @route GET /service-providers/
// @access Private
const getSpace = asyncHandler(async (req, res) => {


});

// @desc Update service provider   
// @route PATCH /service-providers
// @access Private
const updateSpace = asyncHandler(async (req, res) => {
    const { id, username, roles, profile_status, password, spaceName } = req.body;

    if (!id || !username || !Array.isArray(roles) || !roles?.length || typeof profile_status !== 'boolean')
        return res.status(400).json({ message: 'All fields are required.' });

    // check if exists
    const user = await Space.findById(id).exec();
    if (!user)
        return res.status(400).json({ message: `Service account not found.` })

    // check for duplicate
    const duplicate = Space.findOne({ username }).lean().exec();
    if (!duplicate && duplicate?._id.toString() !== id)
        return res.status(400).json({ message: `Duplicate username. Try a different username.` })

    // configure space name
    const getSpace = await spaceController.simple_returnOrCreateSpaceByName(spaceName)

    // assignment
    user.username = username;
    user.roles = roles;
    console.log(roles);
    user.profile_status = profile_status;
    user.space_id = (getSpace) ? getSpace.id : user.space_id;

    // processing password ONLY if a new password was sent 
    if (password) {
        user.password = await bcrypt.hash(password, 11); // 11 salt rounds
    }

    // updating
    const updatedUser = await user.save();
    return res.status(400).json({ message: `Service account ${updatedUser.username} was updated.` })

});

// @desc Delete service provider   
// @route DELETE /service-provider
// @access Private
const deleteSpace = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id)
        return res.status(400).json({ message: `Account ID is required.` })
    /*
    const userspaces = await Space.findById({space_id : id}).lean().exec()
    if (userspaces?.length) {
        return res.status(400).json({ message : `Account has available spaces.` })
    }*/

    const account = await Space.findById(id).exec();

    if (!account)
        return res.status(400).json({ message: `Account not found.` })

    const result = await account.deleteOne();
    const reply = `Service account ${result.username} with ID ${result.id} was deleted.`

    return res.json(reply);
});

module.exports = {
    createSpace,
    getAllSpaces,
    getSpace,
    updateSpace,
    deleteSpace
};