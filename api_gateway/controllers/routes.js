
var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var jwt = require('jwt-simple');
var moment = require('moment');


router.get('/', function(req, res, next) {
                res.json({
                    message : "Hello"
                });
 });

router.post('/register', function(req, res, next) {

    var user = new User();
    user.createUser(req.body, function(err, response) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(response);
        }
    });
});

router.post('/login', function(req, res, next) {

    var userid = req.body.userid;
    var password = req.body.password;
    var app = req.app;
    console.log('Requested auth');
    if (userid && password) {
        var params = {
            userid: userid,
            password: password,
        };

        var user = new User();
        user.login(params, function(err, user) {
            if (err) {
                return res.status(500).json({
                    error: true,
                    message: "Error occured: " + err
                });
            }
            if (user) {
                var expires = moment().add( 365, 'days').valueOf();

                var token = jwt.encode({
                    iss: user, //should be unique
                    exp: expires
                }, app.get('jwtTokenSecret'));

                return res.json({
                    type: true,
                    token: token,
                    expires: expires,
                    user: user
                });
            } else {
                return res.json({
                    type: false,
                    message: "Incorrect username or password."
                });
            }
        });
    } else {
        return res.status(400).json({
            error: 'Invalid route- Required parameters missing.'
        });
    }
});

module.exports = router;
