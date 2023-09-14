var entryNum = document.getElementById('entry-number');
var redeemBtn = document.getElementById('redeem');
var numEntries;

// Get references to the form and its elements
const entryForm = document.querySelector('.boxes');
const entryNumberInput = document.getElementById('entry-number');
const acceptTermsCheckbox = document.getElementById('accept-terms');

entryNum.addEventListener('input', function () {
    // Remove non-digit characters and leading zeros
    let value = this.value.replace(/\D/g, '').replace(/^0+/, '');

    // Add two decimal places if missing
    if (value.length > 2) {
        value = value.slice(0, -2) + '.' + value.slice(-2);
    } else if (value.length === 1) {
        value = '0.0' + value;
    } else if (value.length === 2) {
        value = '0.' + value;
    }

    // Update the input value
    this.value = value;
});

// Add a submit event listener to the form
entryForm.addEventListener('submit', function (event) {
    // Check if the number of entries is empty or not a positive integer
    if (!entryNumberInput.value || isNaN(entryNumberInput.value) || parseInt(entryNumberInput.value) <= 0) {
        event.preventDefault(); // Block form submission
        alert('Please enter a valid number of entries.');
    } else if (!acceptTermsCheckbox.checked) {
        event.preventDefault(); // Block form submission
        alert('Please accept the terms.');
    } else {
        event.preventDefault();
        numEntries = parseInt(entryNum.value);
        window.location.href = `results.html?entries=${numEntries}`;
    }

});

function startTimer() {
    let timerDuration = 50;
    let timerInterval = setInterval(function() {
        timerDuration--;

        if (timerDuration === 0) {
            clearInterval(timerInterval);
            window.location.href = 'index.html'
        }
    }, 1000);
}

startTimer();