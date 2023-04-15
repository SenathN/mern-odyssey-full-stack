const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvent = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
    const logStmt = `${dateTime}\t${uuid()}\t${message}\n`;

    console.log(`${logStmt}`)
    try {
        if (!fs.existsSync(path.join(__dirname, "..", 'logs')))
            await fsPromises.mkdir(path.join(__dirname, "..", 'logs'));

        await fsPromises.appendFile(path.join(__dirname, "..", 'logs', logFileName), logStmt);

    } catch (error) {
        console.log(error);
    }
}

const requestLogger = (req, res, next) => {
    logEvent(`${req.method}\t${req.url}\t${req.headers.origin}`, 'request-log.log');
    console.log(`${req.method}\t${req.url}\t${req.headers.origin}`)
    next();
}

module.exports = { logEvent, requestLogger };