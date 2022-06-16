
const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const passport = require("passport");
const session = require('express-session');
const ejs = require('ejs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
require('./conf/passport')(passport);

const MongoDBURI = process.env.MONGO_URI || 'mongodb://localhost:27017/loginDetail';

mongoose.connect(MongoDBURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { });

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/loginDetail',
    })
}));
// College Project
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

app.use(passport.initialize())
app.use(passport.session())

app.use(require("./routes/index"))
app.use(require('./routes/auth'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

// listen on port 3000
app.listen(process.env.PORT || 4000, () => {
    console.log('Express app listening on port 4000');
});