var mysql = require('mysql');

class User{
    constructor() {
       // console.log('Class');
    }
   getUserById(userid, callback){
        var sql = "SELECT * FROM ?? WHERE ?? = ?";
        var inserts = ['user', 'userid', userid];
        sql = mysql.format(sql, inserts);
        global.db.executeQuery(sql, function (err, results) {
            if(err){
                    return callback(err);
            }
            return callback(null, results);
        });
    }
     getAllUsers(callback){
            global.db.executeQuery("select * from user", function (err, results) {
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
     updateUser(userid,data, callback){

         global.db.executeQuery('UPDATE user SET name = ?, email = ? WHERE userid = ?', [data.name, data.email, userid], function (err, results) {
                    if(err){
                        return callback(err);
                }
                return callback(null, results);
        });
    }
     deleteUser(userid,  callback){

        global.db.executeQuery('delete from user where userid = ?', [userid], function (err, results) {
                    if(err){
                        return callback(err);
                }
                return callback(null, results);
        });
    }
}

module.exports = User;