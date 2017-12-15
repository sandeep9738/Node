var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var user=new User();

global.db=require('../models/db.js');
global.db.createConnectionPool();


router.get('/users', function(req, res, next) {

        user.getAllUsers(function(err, results) {
            if (err) {
                return res.status(500).json({
                    error: true,
                    message: "Error occured: " + err
                });
            }
            return res.json({
                type: true,
                results: results
            });
        });
});

router.get('/users/:id', function(req, res, next) {

            user.getUserById(req.params.id, function(err, results) {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        message: "Error occured: " + err
                    });
                }
                return res.json({
                    type: true,
                    results: results
                });
            });
    });




router.post('/users', function(req, res, next) {

        user.createUser(req.body, function(err, msg) {
            if (err) {
                return res.status(500).json({
                    error: true,
                    message: "Error occured: " + err
                });
            }
            return res.json({
                type: true,
                msg: msg
            });
        });
});

router.put('/users/:id', function(req, res, next) {

    user.updateUser(req.params.id,req.body, function(err, msg) {
        if (err) {
            return res.status(500).json({
                error: true,
                message: "Error occured: " + err
            });
        }
        return res.json({
            type: true,
            msg: msg
        });
    });

});

router.delete('/users/:id', function(req, res, next) {
    user.deleteUser(req.params.id, function(err, msg) {
        if (err) {
            return res.status(500).json({
                error: true,
                message: "Error occured: " + err
            });
        }
        return res.json({
            type: true,
            msg: msg
        });
    });

});

module.exports = router;

