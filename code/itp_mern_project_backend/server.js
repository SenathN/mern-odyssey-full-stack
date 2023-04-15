require('dotenv').config();
const connectDB = require('./config/dbConn');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const path = require('path');
const corsOptions = require("./config/corsOptions");
const handleError = require("./middleware/errorLogger");
const { requestLogger, logEvent } = require('./middleware/logger');
const mongoose = require('mongoose');

//mongoDB connection
connectDB();

// middleware custom
app.use(requestLogger);

// middleware third party
app.use(cors(corsOptions))
app.use(cookieParser());

// file accptance
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());

// route handling

app.use('/space-provider', require('./routes/spaceProviderRoutes'));
app.use('/space', require('./routes/spaceRoutes'));
app.use('/', require('./routes/root'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) res.sendFile(path.join(__dirname, 'views', '404.html'));
    else if (req.accepts('json')) res.json({ message: "404 not found." });
    else res.type('txt').send('404 not found.' );
})

// custom middleware logger error-handling
app.use(handleError) ;

//listener for successful db connection
mongoose.connection.once( 'open', ()=> {
    console.log('MongoDB connection successful.')
    app.listen(3500, () => { console.log(`Server running on port ${PORT}`);})
} )

// logging on database connection error 
mongoose.connection.on('error', (error)=> {
    logEvent( `${error.name}\t${error.message}`, 'db-error-log.log')
    console.log(error.stack);
})