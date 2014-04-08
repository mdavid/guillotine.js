// server.js
// guillotine.js Canonical URL Shortening Web Service
// Author: M. David Peterson

// The MIT License (MIT)
// 
// Copyright (c) 2014 M. David Peterson
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// Module dependencies.

var express = 
		require('express'), 
		http = require('http'),
		path = require('path');

var mongoose = 
		require('mongoose'),
		Schema = mongoose.Schema;

var Dataloader = require('./lib/controllers/dataLoader');

var api = require('./lib/controllers/canonicalShortUrlAPI');
  
var app = express();

// Environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.errorHandler());

// Fine the appropriate database to connect to, defaulting to
// localhost if it doesn't exist or is inaccessible  
var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/Guillotine.js'; //(new) DB name

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to MongoDB : ' + uristring + '. ' + err);
  } else {
    console.log ('Connected to MongoDB: ' + uristring);
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
   console.log("Database access success");
	//populate database
	Dataloader.loadDB();
	console.log("Loaded database");
  });

//setup REST API interface
api.configure(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('================================================================');
  console.log('           guillotine.js Canonical Short URL Web Service ');
  console.log('================================================================');
  console.log('HTTP Server listening on port ' + app.get('port'));
});

