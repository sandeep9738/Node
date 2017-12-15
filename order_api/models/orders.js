class Order{
    constructor() {
       // console.log('Class');
    }
   getOrderById(orderid, callback){
            global.db.executeQuery('select *from user.order where orderid = ?', [orderid], function (err, results) {
                if(err){
                    return callback(err);
            }
            return callback(null, results);
        });
    }
     getAllOrders(callback){
            global.db.executeQuery("select * from user.order", function (err, results) {
                                if(err){
                                    return callback(err);
                            }
                            return callback(null, results);
            });
    }
     createOrder(params, callback){
            var param  = {orderid: params.orderid, userid: params.userid, subject: params.subject, price: params.price};
            global.db.executeQuery('INSERT INTO user.order SET ?', param, function (err, results) {
                        if(err){
                            return callback(err);
                    }
                    return callback(null, results);
            });
    }
     updateOrder(orderid, data, callback){
                global.db.executeQuery('UPDATE user.order SET userid = ?, subject = ?, price = ?  WHERE orderid = ?', [data.userid, data.subject, data.price,  orderid], function (err, results) {
                        if(err){
                            return callback(err);
                        }
                        return callback(null, results);
                });
    }
     deleteOrder(orderid,  callback){
             global.db.executeQuery('delete from user.order where orderid = ?', [orderid], function (err, results) {
                        if(err){
                            return callback(err);
                    }
                    return callback(null, results);
            });
    }
}

module.exports = Order;