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

    var oauth4 = OAuth({
	    consumer: {
	        public: 'testkey',
	        secret: 'testsecret'
	    },
       signature_method: 'RSA-SHA1'
    });

    var request_data = {
	    url: 'http://localhost:3000/sample',
	    method: 'POST'
	};

	var token = {
	    public: 'testkey',
	    secret: 'testsecret'
	};
    
    var signingTiming1 , signingTiming2, signingTiming3, signingTiming4;
    
    var startTime1 = new Date().getTime();
    var oauth_data1 = oauth1.authorize(request_data, token);
    var endTime1 = new Date().getTime()
    signingTiming1 = endTime1 - startTime1; 

    var startTime2 = new Date().getTime();
    var oauth_data2 = oauth2.authorize(request_data, token);
    var endTime2 = new Date().getTime();
    signingTiming2 = endTime2 - startTime2;

    var startTime3 = new Date().getTime();
    var oauth_data3 = oauth3.authorize(request_data, token);
    var endTime3 = new Date().getTime();
    signingTiming3 = endTime3 - startTime3;

    var startTime4 = new Date().getTime();
    var oauth_data4 = oauth4.authorize(request_data, token);
    var endTime4 = new Date().getTime();
    signingTiming4 = endTime4 - startTime4;

    
	$.ajax({
	   	url: request_data.url,
	    type: request_data.method,
	    data: request_data.data,
    	headers: oauth1.toHeader(oauth_data1)
	}).done(function(data, status, xhr) {
	    $('#oauth_response1').append($(
	    	'<p>'+ 
	    	  'Response from server: '+data.message+
	    	  '<br />' +
	    	   'Server response time (including signature verification): '+xhr.getResponseHeader('X-Response-Time')+
	    	  '<br />'+
	    	  'Client Signature method: '+oauth_data1.oauth_signature_method+
	    	  '<br />'+
	    	  'Client Signature Base String: '+oauth1.getBaseString(request_data, oauth1.authorize(request_data, token))+
	    	  '<br />'+
	    	  'Client Signature: '+oauth_data1.oauth_signature+
	    	  '<br />'+
	    	  'Client Side Timing: '+signingTiming1+ ' in milliseconds'+
	    	 '</p>'));
	});

	$.ajax({
	   	url: request_data.url,
	    type: request_data.method,
	    data: request_data.data,
    	headers: oauth2.toHeader(oauth_data2)
	}).done(function(data, status, xhr) {
	    $('#oauth_response2').append($(
	    	'<p>'+ 
	    	  'Response from server: '+data.message+
	    	  '<br />' +
	    	   'Server response time (including signature verification): '+xhr.getResponseHeader('X-Response-Time')+	    	  
	    	  '<br />'+
	    	  'Client Signature method: '+oauth_data2.oauth_signature_method+
	    	  '<br />'+
	    	  'Client Signature Base String: '+oauth2.getBaseString(request_data, oauth2.authorize(request_data, token))+
	    	  '<br />'+
	    	  'Client Signature: '+oauth_data2.oauth_signature+
	    	  '<br />'+
	    	  'Client Side Timing: '+signingTiming2+ ' in milliseconds'+
	    	 '</p>'));
	});

	$.ajax({
	   	url: request_data.url,
	    type: request_data.method,
	    data: request_data.data,
    	headers: oauth3.toHeader(oauth_data3)
	}).done(function(data, status, xhr) {
	    $('#oauth_response3').append($(
	    	'<p>'+ 
	    	  'Response from server: '+data.message+
	    	  '<br />' +
	    	   'Server response time (including signature verification): '+xhr.getResponseHeader('X-Response-Time')+	    	  
	    	  '<br />'+
	    	  'Client Signature method: '+oauth_data3.oauth_signature_method+
	    	  '<br />'+
	    	  'Client Signature Base String: '+oauth3.getBaseString(request_data, oauth3.authorize(request_data, token))+
	    	  '<br />'+
	    	  'Client Signature: '+oauth_data3.oauth_signature+
	    	  '<br />'+
	    	  'Client Side Timing: '+signingTiming3+ ' in milliseconds'+	    	  
	    	 '</p>'));
	});

	$.ajax({
	   	url: request_data.url,
	    type: request_data.method,
	    data: request_data.data,
    	headers: oauth4.toHeader(oauth_data4)
	}).done(function(data, status, xhr) {
	    $('#oauth_response4').append($(
	    	'<p>'+ 
	    	  'Response from server: '+data.message+
	    	  '<br />' +
	    	   'Server response time (including signature verification): '+xhr.getResponseHeader('X-Response-Time')+	    	  
	    	  '<br />'+
	    	  'Client Signature method: '+oauth_data4.oauth_signature_method+
	    	  '<br />'+
	    	  'Client Signature Base String: '+oauth4.getBaseString(request_data, oauth4.authorize(request_data, token))+
	    	  '<br />'+
	    	  'Client Signature: '+oauth_data4.oauth_signature+
	    	  '<br />'+
	    	  'Client Side Timing: '+signingTiming4+ ' in milliseconds'+	    	  
	    	 '</p>'));
	});

	console.log(oauth1.getBaseString(request_data, oauth1.authorize(request_data, token)));
	console.log(oauth2.getBaseString(request_data, oauth2.authorize(request_data, token)));
	console.log(oauth3.getBaseString(request_data, oauth3.authorize(request_data, token)));
	console.log(oauth4.getBaseString(request_data, oauth3.authorize(request_data, token)));
});