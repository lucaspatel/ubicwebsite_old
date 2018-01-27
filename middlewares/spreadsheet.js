var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');
 
// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('1z2a2uBkNaoeR_TzZyECwbmysafJ3aKeKxGYLuohoBOg');
 
module.exports = {
	getData: function getData() {
		doc.useServiceAccountAuth(creds, function (err) {
	  // Get all of the rows from the spreadsheet.
	  	doc.getRows(1, function (err, rows) {
	    	console.log("here")
	    	console.log(rows);
	    	return rows;
	  	});
	});
}}

// Authenticate with the Google Spreadsheets API.

