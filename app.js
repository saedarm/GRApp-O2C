// app.js

let express = require('express');
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

let originalImage = '/1628017469449.jpg'; // Path to the original image file
let image1 = '/gender_reveal_1.jpg'; // Path to the first image file
let image2 = '/gender_reveal_2.jpg'; // Path to the second image file
let currentImage = originalImage; // Current image to display
let revealImage = false; // Flag to determine whether to reveal the image

app.get('/', (req, res) => {
  res.render('results', { secret: null, revealImage: false, currentImage: originalImage });
});

app.post('/reveal', (req, res) => {
  let secret = req.body.secret;
  if (secret === 'boy') {
    currentImage = image1;
    revealImage = true;
  } else if (secret === 'girl') {
    currentImage = image2;
    revealImage = true;
  }
  res.render('results', { secret, revealImage, currentImage });
});

app.get('/babychain', (req, res) => {
  res.render('babychain');
});

module.exports = app;
