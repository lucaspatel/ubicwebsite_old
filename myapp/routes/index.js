var express = require('express');
var router = express.Router();
//obviously do not leave db objects in creds.js
var off = require('../credentials.js').officers;
var Officer = require('../models/officer.js');

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
    console.log(context);
    if (err) return res.status(500).send("There was a problem finding the users.");
    //res.status(200).send((context.officers));
    res.render('contact', {officers: context});
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

//catch all
router.get(/^(.*)$/, function(req, res, next){
  res.render(req.params[0].substring(1));
});


module.exports = router;