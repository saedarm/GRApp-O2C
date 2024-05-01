// public/countdown.js
// Countdown timer
var countdownElement = document.getElementById('timer');
var countdownInterval = null;

// Function to start countdown
function startCountdown() {
    var countdown = 10; // Countdown time in seconds
    countdownInterval = setInterval(function () {
        countdown--;
        countdownElement.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            revealImage();
        }
    }, 1000);
}

// Function to reveal the image
function revealImage() {
    document.getElementById('countdown').style.display = 'none';
    document.getElementById('reveal-image').style.display = 'block';
    document.getElementById('secret-revealed').style.display = 'block';
}
