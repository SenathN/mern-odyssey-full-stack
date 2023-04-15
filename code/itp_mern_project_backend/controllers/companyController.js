const Company = require ('../models/Company');

async function simple_returnOrCreateCompanyByName (name) {
    const company = await Company.findOne({ "name" : name }) ;
    if ( company?.name.toLowerCase() == name.toLowerCase() ) 
        return company;

    const companyObj = { "name" : name }; 
    const newcompany = await Company.create(companyObj) ;

    return newcompany ;
};

async function simple_returnOrCreateCompanyById (id) {
    const company = await Company.findById(id).exec() ;
    if (company) 
        return company;
    return ;
};

module.exports = {
    simple_returnOrCreateCompanyById,
    simple_returnOrCreateCompanyByName
} ;