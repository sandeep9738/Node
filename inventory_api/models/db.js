var mysql = require('mysql');
module.exports = {

	createConnectionPool: function(){
		if(!this.pool){
			this.pool  = mysql.createPool({
			   connectionLimit : 10,
			   host     : 'localhost',
			   user     : 'root',
			   password : 'sand',
			   database : 'user'
			});
		}
},

	executeQuery: function(query, params, callback){
		this.pool.getConnection(function(err, connection) {
			  if(err){
			  	return console.log('Error :', err);
			  }
		 	connection.query(query, params, function (error, results, fields) {
				if(error){
				   	 callback(error);
				}
				callback(null, results);
			});
		});
	}
};