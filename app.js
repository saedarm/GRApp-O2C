const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let secret = '';
let originalImage = '/1628017469449.jpg'; // Path to the original image file
let image1 = '/gender_reveal_1.jpg'; // Path to the first image file
let image2 = '/gender_reveal_2.jpg'; // Path to the second image file
let currentImage = originalImage; // Current image to display
let revealImage = false; // Flag to determine whether to reveal the image
let wellWishes = []; // Array to store well wishes

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

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
  let secretDisplay = secret ? `<p>It's a: ${secret}!!!</p>` : '';
  let imageDisplay = revealImage ? `<img src="${currentImage}" alt="Reveal Image" width="400">` : `<img src="${originalImage}" alt="Original Image" width="400">`;
  let wellWishesDisplay = wellWishes.length > 0 ? `<h2>Well Wishes</h2><ul>${wellWishes.map(wish => `<li>${wish}</li>`).join('')}</ul>` : '';
  res.send(`
    <h1>Gender Reveal</h1>
    ${imageDisplay}
    ${secretDisplay}
    ${wellWishesDisplay}
    <a href="/wellwishes">Send Well Wishes to Louis</a>
  `);
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
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
