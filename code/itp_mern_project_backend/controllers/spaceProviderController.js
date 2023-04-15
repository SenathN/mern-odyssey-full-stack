const SpaceProvider = require('../models/SpaceProvider');
const Space = require('../models/Space');
const Company = require('../models/Company');
const companyController = require('./companyController');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// @desc Create new service providers   
// @route POST /service-providers
// @access Private
const createSpaceProvider = asyncHandler(async (req, res) => {
    const { username, password, companyName, roles } = req.body;

    // back-end validation
    if (!username || !password || !Array.isArray(roles) || !roles.length || !companyName)
        return res.status(400).json({ message: 'All fields are required.' })

    // avoids duplicate usernames
    const duplicate = await SpaceProvider.findOne({ username: username }).lean().exec();
    if (duplicate)
        return res.status(409).json({ message: "User already exists." });

    // configure company name
    const getCompany = await companyController.simple_returnOrCreateCompanyByName(companyName)

    // if safe hashing password
    const hashedpw = await bcrypt.hash(password, 11); // salt rounds

    // user object
    const accObject = { username, "password": hashedpw, 'company_id': getCompany.id, roles }
    const user = await SpaceProvider.create(accObject);

    if (user)
        return res.status(201).json({ message: `New Service Account ${username} was created.` })
    else
        return res.status(400).json({ message: `Account creation has failed.` }) // bad reqruest

});

// @desc Gets all service providers   
// @route GET /service-provider
// @access Private
const getAllSpaceProviders = asyncHandler(async (req, res) => {
    const accounts = await SpaceProvider.find().select('-password').lean();

    if (!accounts?.length) return res.status(400).json({ message: 'No accounts found.' }); //bad request
    return res.json(accounts);

});

// @desc Get a user  
// @route GET /service-providers/
// @access Private
const getSpaceProvider = asyncHandler(async (req, res) => {
    // const { id } = req.body;
    // const foundUser = await SpaceProvider.findById(id).exec();
    // if (!foundUser)
    //     return res.status(400).json({ message: `Space Provider not found.` })

    // if (!foundUser?.length) return res.status(400).json({ message: 'Account not found.' }); //bad request
    // return res.json(foundUser);
});

// @desc Update service provider   
// @route PATCH /service-providers
// @access Private
const updateSpaceProvider = asyncHandler(async (req, res) => {
    const { id, username, roles, profile_status, password, companyName } = req.body;

    if (!id || !username || !Array.isArray(roles) || !roles?.length || typeof profile_status !== 'boolean')
        return res.status(400).json({ message: 'All fields are required.' });

    // check if exists
    const user = await SpaceProvider.findById(id).exec();
    if (!user)
        return res.status(400).json({ message: `Service account not found.` })

    // check for duplicate
    const duplicate = SpaceProvider.findOne({ username }).lean().exec();
    if (!duplicate && duplicate?._id.toString() !== id)
        return res.status(400).json({ message: `Duplicate username. Try a different username.` })

    // configure company name
    const getCompany = await companyController.simple_returnOrCreateCompanyByName(companyName)

    // assignment
    user.username = username;
    user.roles = roles;
    console.log(roles);
    user.profile_status = profile_status;
    user.company_id = (getCompany) ? getCompany.id : user.company_id;

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
const deleteSpaceProvider = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id)
        return res.status(400).json({ message: `Account ID is required.` })
    /*
    const userspaces = await Space.findById({spaceProvider_id : id}).lean().exec()
    if (userspaces?.length) {
        return res.status(400).json({ message : `Account has available spaces.` })
    }*/

    const account = await SpaceProvider.findById(id).exec();

    if (!account)
        return res.status(400).json({ message: `Account not found.` })

    const result = await account.deleteOne();
    const reply = `Service account ${result.username} with ID ${result.id} was deleted.`

    return res.json(reply);
});

module.exports = {
    createSpaceProvider,
    getAllSpaceProviders,
    getSpaceProvider,
    updateSpaceProvider,
    deleteSpaceProvider
};