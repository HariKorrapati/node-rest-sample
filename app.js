const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const employeesRouters = require('./api/routes/employees');
const milestonesRouters = require('./api/routes/milestones');

//mongo db connection
mongoose.connect('mongodb://127.0.0.1/test');

//enable morgan logs for dev environment
app.use(morgan('dev'));

//parsing urlencoded and json objects
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//login link, which provides json webtoken (user profile validation is skipped for this demo)
app.use('/login', (req, res, next) => {
    if(req.body.userId === undefined || req.body.userId === ''){
        return res.status(401).json({
            error: {
                message: 'Invalid User Id.'
            }
        });
    }

    //generate jwt token
    const token = jwt.sign({userId: req.body.userId}, process.env.JWT_KEY, {'expiresIn' : '1h'});
    
    return res.status(200).json({
        message: 'Authorisation Successful',
        token: token
    });
})

//routes to handle requests
app.use('/employees', employeesRouters);
app.use('/milestones', milestonesRouters);

//enabling cross origin requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});

//generic error handling
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;