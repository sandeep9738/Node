var express = require('express');
var bodyParser = require('body-parser');
var router=require('./controllers/routes.js');
var port = process.env.PORT || 3001;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('jwtTokenSecret','0123456789');


app.use('/api', router);

app.listen(port);
console.log('REST API is runnning at ' + port);
