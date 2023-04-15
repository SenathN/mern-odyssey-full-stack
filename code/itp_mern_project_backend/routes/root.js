const express = require("express");
const router = express.Router();
const path = require('path');

// / or /index.html

router.get('/service-signup(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..' ,'views' ,'serviceSignup.html'));
})

router.get('^/$|/home(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..' ,'views' ,'home.html'));
})

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..' ,'views' ,'index.html'));
})

module.exports = router ;