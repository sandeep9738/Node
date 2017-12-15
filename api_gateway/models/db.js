var async = require('async');
var waterfall = require('async-waterfall');
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
	},

	insertQuery: function(query, params, callback){

		async.waterfall([
				function1,
				function2,
				function3,
				function4,
				function5
			], function (error, success) {
				if (error) {
					return console.log('Error :', error);
				}
				callback(null,success);
			});

			function function1 (callback) {

				global.db.pool.getConnection(function(err, connection) {

								if(err){
									return console.log('Error :', err);
								}

								callback (null, connection);
				   });

			}

			function function2 (connection, callback) {

					connection.beginTransaction(function(err) {

						if (err) { throw err; }
						callback (null, connection);

					});


			}
			function function3 (connection, callback) {

					connection.query(query, params, function (error, results, fields) {

						if (error) {
							return connection.rollback(function() {
							throw error;
							});
						}

						callback (null, connection);

					});
			}

			function function4 (connection, callback) {

					connection.query('INSERT INTO login SET ?', { userid: params.userid, password: params.userid+'1234' } , function (error, results, fields) {
						if (error) {
							return connection.rollback(function() {
								throw error;
							});
						}
						callback (null, connection);
					});

			}

			function function5 (connection, callback) {

					connection.commit(function(err) {
							if (err) {
								return connection.rollback( function() {
								throw err;
								});
							}

						callback(null,"Success");
					});
				}
			}

	};


