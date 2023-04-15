const { logEvent } = require("./logger");

const handleError = (err, req, res, next) => {
    logEvent( `${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'error-log.log')
    console.log(err.stack);

    const stat = res.statusCode ? res.statusCode : 500 // internal server error
    res.status(stat).json({message: err.message});
    
    next();
}

module.exports = handleError ;