var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3002;
var app = express();
var routes=require('./controllers/routes.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/',routes);

global.db=require('./models/db.js');
global.db.createConnectionPool();
app.listen(port);
console.log('REST API is runnning at ' + port);
