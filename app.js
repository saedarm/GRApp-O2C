const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let secret = '';
let originalImage = '/1628017469449.jpg'; // Path to the original image file
let image1 = '/gender_reveal_1.jpg'; // Path to the first image file
let image2 = '/gender_reveal_2.jpg'; // Path to the second image file
let currentImage = originalImage; // Current image to display
let revealImage = false; // Flag to determine whether to reveal the image
let wellWishes = []; // Array to store well wishes


// Livereload setup


// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


if (process.env.NODE_ENV === "development") {
  var livereload = require("livereload");
  var connectLiveReload = require("connect-livereload");

  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, "public"));
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
  app.use(connectLiveReload());
}



// Route to serve the form for inputting the secret
app.get('/input', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'input.html'));
});

// Route to receive secret input
app.post('/reveal', (req, res) => {
  secret = req.body.secret.toLowerCase();
  revealImage = true;
  if (secret === 'boy') {
    currentImage = image1;
  } else {
    currentImage = image2;
  }
  res.redirect('/results');
});

// Route to display results along with the image and well wishes
app.get('/results', (req, res) => {
  res.render('results', {
    secret: secret,
    currentImage: currentImage,
    revealImage: revealImage, // Pass revealImage to the template
    wellWishes: wellWishes
  });
});

// Route to send well wishes
app.get('/wellwishes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'well_wishes_form.html'));
});

app.post('/wellwishes', (req, res) => {
  const { messages } = req.body;
  const newWellWishes = Array.isArray(messages) ? messages : [messages];
  wellWishes.push(...newWellWishes);
  res.redirect('/results');
});

// Route for the main page
app.get('/', (req, res) => {
  res.redirect('/results');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!')
});


module.exports = app;
