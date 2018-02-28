var express = require('express');
var router = express.Router();
var id = require('../credentials.js').id
var Officer = require('../models/officer.js');
var gsjson = require('google-spreadsheet-to-json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/home', function(req, res, next) {
  res.render('index');
});

//needs some cleaning
router.get('/contact', function(req, res, next) {
  Officer.find({}, function (err, officers) {
    var context = officers[0].toJSON().officers;
    if (err) return res.status(500).send("There was a problem finding the users.");
    res.render('contact', {officers: context});
  });
});

router.get('/opportunities', function(req, res, next) {
  gsjson({
    spreadsheetId: '1z2a2uBkNaoeR_TzZyECwbmysafJ3aKeKxGYLuohoBOg',
    // other options... 
  })
  .then(function(result) {
    result.forEach(function(n) {
      //console.log(n.timestamp);
      if(n.labImageOrLogo != undefined) {
        n.labImageOrLogo = n.labImageOrLogo.replace('open', 'uc');
      } else {
        n.labImageOrLogo = "images/opp_default.jpg";
      }
    })
    res.render('opportunities', {opportunities: result});
      
  })
  .catch(function(err) {
    console.log(err.message);
    console.log(err.stack);
    res.status(500).send(err);
  });
  
});

router.get('/calendar', function(req, res, next) {
  res.render('calendar');
});

router.get('/techdev', function(req, res, next) {
  res.render('techdev');
});

router.get('/gbm1', function(req, res, next) {
  res.redirect('https://www.youtube.com/watch?v=xa6wLAJ9umE')
});

module.exports = router;