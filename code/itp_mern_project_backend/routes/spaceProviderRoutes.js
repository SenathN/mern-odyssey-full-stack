const express = require('express');
const Router = express.Router();
const SpaceProviderController = require ('../controllers/spaceProviderController');

Router.route('/') // at the '/space-provider'
    .get(SpaceProviderController.getAllSpaceProviders)
    .post(SpaceProviderController.createSpaceProvider)
    .patch(SpaceProviderController.updateSpaceProvider)
    .delete(SpaceProviderController.deleteSpaceProvider)

module.exports = Router ;