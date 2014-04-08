// canonicalShortUrl.js
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

/// Summary
/// Returns a unique canonical short code for a given URL string.

/// 1) MD5 hash the URL to the hexdigest
/// 2) Convert it to a Bignum
/// 3) Pack it into a bitstring as a big-endian int
/// 4) base64-encode the bitstring, remove the trailing junk
///
/// url - String URL to shorten.

function CanonicalShortURL() {
}

CanonicalShortURL = window.CanonicalShortURL = window.$csu = window.csu = function (url) {
    return new CanonicalShortURL.core.init(url);
};

CanonicalShortURL.core = CanonicalShortURL.prototype = {
    init: function (urlString) {
        if (!this._initialized) {
			
			this.urlHash = "/*TODO: Generate MD5 HASH*/"; 
			
			this.sourceURL = urlString;
			//TODO: Check DB for existence of MD5 HASH
			
			this.shortURL = ""
			this._exists = true;
        	this._initialized = true;
        }
    },
	
	_exists: false,
    _initialized: false,
	
	urlHash: String,
	sourceURL: String,
	shortURL: [String],
	canonicalURL: [String],
	
	IsValidUrlString: function(urlString) {
		
	},
	Shorten: function(urlString){
		
	},
	CleanUrlString:  function(urlString){
		
	},
	GetMD5Hash:  function(str){
		
	},
	ToBase16Integer:  function(byteArray){
		
	},
	GetBase64UrlSafeEncoding:  function(byteArray){
		
	},
	GetBase64Encoding:  function(byteArray){
		
	},
	ToBigEndianByteOrder:  function(int){
		
	},
	GetBytes:  function(str){
		
	},
	GetStringValue: function(byteArray){
		
	},
	
	_longToByteArray: function(/*long*/long) {
	    // we want to represent the input as a 8-bytes array
	    var byteArray = [0, 0, 0, 0, 0, 0, 0, 0];

	    for ( var index = 0; index < byteArray.length; index ++ ) {
	        var byte = long & 0xff;
	        byteArray [ index ] = byte;
	        long = (long - byte) / 256 ;
	    }

	    return byteArray;
	},

	_byteArrayToLong: function(/*byte[]*/byteArray) {
	    var value = 0;
	    for ( var i = byteArray.length - 1; i >= 0; i--) {
	        value = (value * 256) + byteArray[i];
	    }

	    return value;
	}
};



