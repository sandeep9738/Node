var express=require('express');
var app =   express();
var httpProxy= require('http-proxy');
var bodyParser = require('body-parser');
var apiProxy = httpProxy.createProxyServer();
var jwtauth = require('./controllers/auth.js');
var router = require('./controllers/routes.js');

var usersServer = 'http://localhost:3001',
        ordersServer = 'http://localhost:3002',
        itemsServer  = 'http://localhost:3003';


        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.set('jwtTokenSecret','0123456789');

     global.db=require('./models/db.js');
     global.db.createConnectionPool();

app.use('/',router);

    app.all('/*/users/', [jwtauth],  function (req, res) {
      console.log('Redirecting to Users: ');
      apiProxy.web(req, res, { target: usersServer});
    });


    app.all('/*/orders/', [jwtauth], function (req, res) {
        console.log('Redirecting to Orders');
        apiProxy.web(req, res, { target: ordersServer});
      });


    app.all('/*/items/', [jwtauth],  function (req, res) {
        console.log('Redirecting to Inventory');
        apiProxy.web(req, res, { target: itemsServer});
      });

      console.log("Proxy Server listening to Port -- 3000");
      app.listen(3000);
