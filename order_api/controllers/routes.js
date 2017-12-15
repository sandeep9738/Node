var express  = require('express');
var router  = express.Router();
var Order = require('../models/orders.js');
var order = new Order();

router.get('/orders', function(req, res, next) {

    order.getAllOrders(function(err, results) {
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

router.get('/orders/:id', function(req, res, next) {

   order.getOrderById(req.params.id, function(err, msg) {

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

router.post('/orders', function(req, res, next) {

    order.createOrder(req.body, function(err, msg) {
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

router.put('/orders/:id', function(req, res, next) {
    order.updateOrder(req.params.id, req.body,function(err, msg) {
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
router.delete('/orders/:id', function(req, res, next) {
    order.deleteOrder(req.params.id, function(err, msg) {
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

