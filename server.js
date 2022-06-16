// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const passport = require("passport");
// const authRoute = require("./routes/auth");
// const cookieSession = require("cookie-session");
// const passportStrategy = require("./passport");
const ejs = require('ejs');
const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');


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

const index = require('./routes/index');
app.use('/', index);

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

// app.use(
//     cookieSession({
//         name: "session",
//         keys: ["cyberwolve"],
//         maxAge: 24 * 60 * 60 * 100,
//     })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(
//     cors({
//         origin: "http://localhost:4000",
//         methods: "GET,POST,PUT,DELETE",
//         credentials: true,
//     })
// );

// app.use("/auth", authRoute);

// listen on port 3000
app.listen(process.env.PORT || 4000, () => {
    console.log('Express app listening on port 4000');
});