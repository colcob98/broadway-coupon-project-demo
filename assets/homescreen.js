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

entryForm.addEventListener('submit', function (event) {
    // Check if the number of entries is empty, not a positive integer, or doesn't have .00 as decimal places
    const entryValue = entryNumberInput.value;
    if (!entryValue || isNaN(entryValue) || !/^\d+\.00$/.test(entryValue) || parseFloat(entryValue) <= 0) {
        event.preventDefault(); // Block form submission
        alert('Please enter a valid, whole dollar amount (i.e. "1.00").');
    } else if (!acceptTermsCheckbox.checked) {
        event.preventDefault(); // Block form submission
        alert('Please accept the terms.');
    } else {
        event.preventDefault();
        numEntries = parseInt(entryNum.value);
        window.location.href = `results.html?entries=${numEntries * 100}`;
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