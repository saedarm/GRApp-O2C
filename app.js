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
let wellWishes = []; // Array to store well wishes

app.get('/', (req, res) => {
  res.render('results', { secret: null, revealImage: false, currentImage: originalImage, wellWishes: wellWishes });
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
  res.render('results', { secret, revealImage, currentImage, wellWishes: wellWishes });
});

app.post('/wellwishes', (req, res) => {
  let message = req.body.message;
  wellWishes.push(message);
  res.json({ message: message });
});

module.exports = app;
