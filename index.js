require('dotenv').config({path:'.env'});

const express = require('express'),
    mongoose = require('mongoose');

const app = express(),
    port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('wow')
})

app.listen(port, () => {
    console.log('run server')
})