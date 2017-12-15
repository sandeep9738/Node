var express  = require('express');
var router  = express.Router();
var Item = require('../models/items.js');
var item = new Item();

router.get('/items', function(req, res, next) {

    item.getAllItems(function(err, results) {
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

router.get('/items/:id', function(req, res, next) {

   item.getItemById(req.params.id, function(err, msg) {

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

router.post('/items', function(req, res, next) {

    item.createItem(req.body, function(err, msg) {
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

router.put('/items/:id', function(req, res, next) {
    item.updateItem(req.params.id, req.body,function(err, msg) {
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
router.delete('/items/:id', function(req, res, next) {
    item.deleteItem(req.params.id, function(err, msg) {
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

