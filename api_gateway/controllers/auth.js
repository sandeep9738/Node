var jwt = require('jwt-simple');
var User = require('../models/users.js');

module.exports = function(req, res, next) {
    console.log('Middlwware');
    //get "authorization" token from either of one. Surley from header
    var token = (req.body && req.body.authorization) || (req.query && req.query.authorization) || req.headers['authorization'];
    var bearerToken;
    var app = req.app;
    console.log('token:', token);
    //request headers are intercepted and the authorization header is extracted. If a bearer token exists in this header, that token is assigned
    // if (typeof token !== 'undefined') {
    //     // var bearer = token.split(" ");
    //     // bearerToken = bearer[1];
    //     // token = bearerToken;
    // } else {
    //     return res.status(403).json({
    //         error: 'Forbidden: Token does not exists.'
    //     });
    // }
    if (typeof token == 'undefined') {
        return res.status(403).json({
                    error: 'Forbidden: Token does not exists.'
            });
    }

    if (token) {
        try {
            var jwtSecrete;
             jwtSecrete = app.get('jwtTokenSecret'); //get JWT secrete

            var decoded = jwt.decode(token, jwtSecrete);
            console.log(decoded);
            //If token has expired end the request with 400.
            if (decoded.exp <= Date.now()) {
                return res.status(401).json({
                    error: 'Access token has expired. Please Renew it.'
                });
            }

            //Get the iss(unique field of the user and add to the request object.
            var user = new User();

            console.log('decoded.is:', decoded.iss);
            user.getUserById(decoded.iss, function(err, user) {
                console.log('user:', user);
                if (err) {
                    return res.status(500).json({
                        error: true,
                        data: {
                            message: err
                        }
                    });
                } else if (!user) {
                    return res.status(401).json({
                        error: 'User is not there.'
                    });
                } else {
                    req.userData = user;
                    console.log('req.userData:', req.userData);
                    next();
                }
            });
        } catch (err) {
            res.status(500).json({
                error: 'Internal Service Error',
                Err: JSON.stringify(err)
            });
        }
    } else {
        return res.status(401).json({
            error: 'Invalid access token'
        });
    }
};