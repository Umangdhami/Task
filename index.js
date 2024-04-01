const express = require('express');
const app = express();
const body_parser = require('body-parser');
const cookie_parsers = require('cookie-parser')
const port = 5011;
const path = require('path');
const mongoose = require('./database/db');
const route = require('./routes/route')


app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({extended: true}));
app.use(cookie_parsers())

app.use('/', route);
// app.use(express.static(path.join(__dirname, 'public/')));


app.listen(port, () => {
    console.log(`Server Run on Port ${port}`);
})
