var mysql = require('mysql');

class User{
    constructor() {
       // console.log('Class');
    }
   getUserById(iss, callback){

        var sql = "SELECT * FROM ?? WHERE ?? = ?";
        var inserts = ['user', 'userid', iss[0].userid];
        sql = mysql.format(sql, inserts);
        global.db.executeQuery(sql, function (err, results) {
            if(err){
                    return callback(err);
            }
            return callback(null, results);
        });
    }

    createUser(params, callback){
        var param  = {userid: params.userid, name: params.name, email: params.email};

            global.db.insertQuery('INSERT INTO user SET ?', param, function (err, results) {
                    if(err){
                            return callback(err);
                    }
                    callback(null, results);
            });
    }

        login(params, callback){
            var sql = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
            var inserts = ['login', 'userid', params.userid, 'password', params.password];
            sql = mysql.format(sql, inserts);
            global.db.executeQuery(sql, function (err, results) {
                if(err){
                        return callback(err);
                }
                return callback(null, results);
            });

        }

}

module.exports = User;