// canonicalShortUrlAPI.js
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

var canonicalShortUrl = require('./canonicalShortUrlSchema').canonicalShortUrl;


//Helper functions

var process_query = function(query, res)
{
  if (query!= null) {
	  query
	  	.exec(function(err, dlist) {
		if(err){
			error
				.handleError(err,res);
		}
	  var response=[];
	  for(i=0; i < dlist.length; i++)
	  {
	    var dobj = dlist[i].toJSON();
		console
			.log("%j", dobj);
		response
			.push(dobj);
	  }
  	  res
	  	.send(response);
	});
  }
  else {
		 res
		 	.status(404);
		 res
		 	.send({"message":"no objects found"});	   
  }
};

//canonicalShortUrl API
var canonicalShortUrlAPI = function (req, res)
{
  console
  	.log("API: GET canonicalShortUrl");
  console
  	.log("---------------------------------------------------");
  
  var query = null;
  query = canonicalShortUrl.find({});
  process_query(query, res);
};

//configure REST API's
exports.configure = function(app)
{
	//API's
	app.get('/canonicalShortUrl', canonicalShortUrlAPI);
};


