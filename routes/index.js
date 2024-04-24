var express = require('express');
var router = express.Router();

import "./javascript/app";
import "./styles/app.css";
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Gender Reveal' });
});

/* POST gender reveal results. */
router.post('/results', function (req, res, next) {
  var secret = req.body.secret;
  var revealImage = req.body.revealImage;
  var wellWishes = req.body.wellWishes || [];
  res.render('results', { secret: secret, revealImage: revealImage, wellWishes: wellWishes });
});

module.exports = router;