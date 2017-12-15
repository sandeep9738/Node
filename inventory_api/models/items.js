class Item{
    constructor() {
       // console.log('Class');
    }
   getItemById(itemid, callback){
            global.db.executeQuery('select *from items where itemid = ?', [itemid], function (err, results) {
                if(err){
                    return callback(err);
            }
            return callback(null, results);
        });
    }
     getAllItems(callback){
            global.db.executeQuery("select * from items", function (err, results) {
                                if(err){
                                    return callback(err);
                            }
                            return callback(null, results);
            });
    }
     createItem(params, callback){
            var params  = {itemid: params.itemid, item_name: params.item_name, qty: params.qty, price: params.price};
            global.db.executeQuery('INSERT INTO items SET ?', params, function (err, results) {
                        if(err){
                            return callback(err);
                    }
                    return callback(null, results);
            });
    }
     updateItem(itemid, data, callback){
                global.db.executeQuery('UPDATE items SET item_name = ?, qty = ?, price = ?  WHERE itemid = ?', [data.item_name, data.qty, data.price,  itemid], function (err, results) {
                        if(err){
                            return callback(err);
                        }
                        return callback(null, results);
                });
    }
     deleteItem(itemid,  callback){
             global.db.executeQuery('delete from items where itemid = ?', [itemid], function (err, results) {
                        if(err){
                            return callback(err);
                    }
                    return callback(null, results);
            });
    }
}

module.exports = Item;