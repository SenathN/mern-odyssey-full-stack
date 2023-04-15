const express = require('express');
const Router = express.Router();
const CompanyController = require ('../controllers/companyController');

Router.route('/') // at the '/space-provider'
    .get(CompanyController.getAllCompanies)
    .post(CompanyController.createCompany)
    .patch(CompanyController.updateCompany)
    .delete(CompanyController.deleteCompany)

module.exports = Router ;