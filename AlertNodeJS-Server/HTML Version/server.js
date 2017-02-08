var http = require('http');
var port = process.env.port || 1188;
http.createServer(function (req, res) {
	
	
	
	var nodemailer = require('nodemailer');
	
	var url = require('url');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	
	//var E_from = query.vf;
	
	var E_from = new String(query.vf);
	var E_to = new String(query.vt);
	var E_subject = new String(query.vs);
	var E_body = new String(query.vb);

	var subjecta = E_subject.toString();
	var E_bodya = E_body.toString();
	
	if (E_from.length > 0 && E_from != 'undefined') {
		
		
		// create reusable transporter object using the default SMTP transport	
		var smtpConfig = {
							host: 'smtp.gmail.com',
							port: 465,
							secure: true, // use SSL
							auth: {
								user: 'YourName@gmail.com',
								pass: 'YourPassword'
							}
						};
		var transporter = nodemailer.createTransport(smtpConfig);
		// setup e-mail data with unicode symbols
		var mailOptions = {
			from: E_from, 
			to: E_to,  
			subject: subjecta , 
			text: E_bodya,
			html: '<b>'  + E_bodya + '</b>' // html body
		};
		
		//send mail with definedtransport object
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {			
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end('<table><tr><td>Result</td></tr><tr><td>' + error + '</td></tr></table>');
				transporter.close(); 
				return;
			}
			transporter.close(); 
            res.writeHead(200, { 'Content-Type': 'text/html' });
            

			res.end('<table><tr><td>Result</td></tr><tr><td>Success</td></tr></table>');
		}
	
	
		);
	};
	
	
	
	
	
	

}).listen(port);

