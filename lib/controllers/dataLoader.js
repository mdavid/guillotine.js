// dataLoader.js
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


//get the schemas
var canonicalShortUrl = require("./canonicalShortUrlSchema").canonicalShortUrl;

var canonicalShortUrl_data = [
{
	
	urlHash: "String",
	sourceURL: "String",
	shortURL: ["String"],
	canonicalURL: ["String"]
}
];

//populate the database with the static data
exports.loadDB = function()
{
	//check if canonicalShortUrl collection has already been loaded.
	var fquery = null;
	fquery = canonicalShortUrl.find({});
	if (fquery!=null) {
		fquery.exec(function(err, flist) {
			if(err){
				error.handleError(err,res);
			}
			if (flist.length == 0) {
				console.log('No canonicalShortUrl objects');
				//load canonicalShortUrl static data
				for (i = 0; i < franchises_data.length; i++) {
					var fObj = new canonicalShortUrl(franchises_data[i]);
					console.log('Loading canonicalShortUrl object %j', fObj);
					fObj.save(function (err) {
				  	if (err) // ...
						console.log('canonicalShortUrl object %j loading error', fObj);
					});
			    }
				console.log('canonicalShortUrl objects loaded');
			}
			else 
			   console.log('%d canonicalShortUrl objects', flist.length);
		});
	}
}
