const express = require('express');
const Router = express.Router();
const SpaceController = require ('../controllers/spaceController');

Router.route('/') // at the '/space'
    .get(SpaceController.getAllSpaces)
    .post(SpaceController.createSpace)
    .patch(SpaceController.updateSpace)
    .delete(SpaceController.deleteSpace)

module.exports = Router ;