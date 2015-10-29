$(document).ready(function(){
	var oauth1 = OAuth({
	    consumer: {
	        public: 'testkey',
	        secret: 'testsecret'
	    },
       signature_method: 'HMAC-SHA1'
    });

    var oauth2 = OAuth({
	    consumer: {
	        public: 'testkey',
	        secret: 'testsecret'
	    },
       signature_method: 'HMAC-SHA256'
    });

    var oauth3 = OAuth({
	    consumer: {
	        public: 'testkey',
	        secret: 'testsecret'
	    },
       signature_method: 'PLAINTEXT'
    });

    var request_data = {
	    url: 'http://localhost:3000/sample',
	    method: 'POST'
	};

	var token = {
	    public: 'testkey',
	    secret: 'testsecret'
	};
    
    var oauth_data1 = oauth1.authorize(request_data, token);
    var oauth_data2 = oauth2.authorize(request_data, token);
    var oauth_data3 = oauth3.authorize(request_data, token);

	$.ajax({
	   	url: request_data.url,
	    type: request_data.method,
	    data: request_data.data,
    	headers: oauth1.toHeader(oauth_data1)
	}).done(function(data) {
	    $('#oauth_response1').append($(
	    	'<p>'+ 
	    	  'Response from server: '+data.message+
	    	  '<br />'+
	    	  'Client Signature method: '+oauth_data1.oauth_signature_method+
	    	  '<br />'+
	    	  'Client Signature: '+oauth_data1.oauth_signature+
	    	 '</p>'));
	});

	$.ajax({
	   	url: request_data.url,
	    type: request_data.method,
	    data: request_data.data,
    	headers: oauth2.toHeader(oauth_data2)
	}).done(function(data) {
	    $('#oauth_response2').append($(
	    	'<p>'+ 
	    	  'Response from server: '+data.message+
	    	  '<br />'+
	    	  'Client Signature method: '+oauth_data2.oauth_signature_method+
	    	  '<br />'+
	    	  'Client Signature: '+oauth_data2.oauth_signature+
	    	 '</p>'));
	});

	$.ajax({
	   	url: request_data.url,
	    type: request_data.method,
	    data: request_data.data,
    	headers: oauth3.toHeader(oauth_data3)
	}).done(function(data) {
	    $('#oauth_response3').append($(
	    	'<p>'+ 
	    	  'Response from server: '+data.message+
	    	  '<br />'+
	    	  'Client Signature method: '+oauth_data3.oauth_signature_method+
	    	  '<br />'+
	    	  'Client Signature: '+oauth_data3.oauth_signature+
	    	 '</p>'));
	});

	console.log(oauth1.getBaseString(request_data, oauth1.authorize(request_data, token)));
	console.log(oauth2.getBaseString(request_data, oauth2.authorize(request_data, token)));
	console.log(oauth3.getBaseString(request_data, oauth3.authorize(request_data, token)));

});