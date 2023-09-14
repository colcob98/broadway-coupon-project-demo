// Display a loading screen with countdown
const awardsContainer = document.querySelector('.awards-container');
const loadingContainer = document.querySelector('.loading-container');
const loadingText = document.getElementById('loading-text');
let countdown = 4;

let useAwards = document.getElementById('use-awards');
let collectAwards = document.getElementById('collect-awards');

var urlParams = new URLSearchParams(window.location.search);
var numEntries = parseInt(urlParams.get('entries'));

function updateCountdown() {
    loadingText.innerHTML = `Loading... <span id="countdown-display">${countdown}s</span>`;

    if (countdown < 1) {
        loadingContainer.style.display = 'none'; // Hide loading screen
        awardsContainer.style.display = 'block'; // Show results screen
        displayResults();
    } else {
        countdown--;
        setTimeout(updateCountdown, 1000);
    }
}

updateCountdown();
//const countdownInterval = setInterval(updateCountdown, 1000);

// Define the lottery results object to store the results
let lotteryResults = null;

function displayResults() {

    if (lotteryResults === null) {
        // Parse the URL to get the number of entries
        const urlParams = new URLSearchParams(window.location.search);
        const numEntries = parseInt(urlParams.get('entries'));

        // Calculate the prize amounts for all entries and store the results
        lotteryResults = miniLottery(numEntries);
    }
    
    for (let i = 0; i < lotteryResults.entryResults.length; i++) {
        console.log(`Entry ${i + 1}: $${lotteryResults.entryResults[i]}`);
    }

    if (lotteryResults.totalWinnings === 0) {
        useAwards.style.display = 'none';
        let collectAwardsText = document.getElementById('collect-awards-text');
        collectAwardsText.textContent = 'Print Coupon'
    }

    const awardsNumber = document.getElementById('awards-number');
    awardsNumber.textContent = lotteryResults.totalWinnings;
}

function miniLottery(numEntries) {
    // Define the probabilities and corresponding prizes
    const probabilities = [0.7, 0.1, 0.1, 0.05, 0.05];
    const prizes = [0, 1, 2, 3, 5];

    // Calculate the total probability (should sum to 1)
    const totalProbability = probabilities.reduce((acc, prob) => acc + prob, 0);

    if (Math.abs(totalProbability - 1) > 0.001) {
        throw new Error("Invalid probabilities. They should sum up to 1.");
    }

    const results = [];
    let totalWinnings = 0;

    for (let entry = 0; entry < numEntries; entry++) {
        const randomValue = Math.random();
        let cumulativeProbability = 0;
        let result = 0; 

        for (let i = 0; i < probabilities.length; i++) {
            cumulativeProbability += probabilities[i];
            if (randomValue <= cumulativeProbability) {
                result = prizes[i];
                break; 
            }
        }

        results.push(result); 
        totalWinnings += result; 
    }

    return {
        totalWinnings: totalWinnings,
        entryResults: results
    };
}


// Calculate the prize amounts for all entries
lotteryResults = miniLottery(numEntries);

// Display the total winnings
console.log(`Total Winnings: ${lotteryResults.totalWinnings} points`);
console.log("Results for each entry:");

var awardsNumber = document.getElementById('awards-number');
awardsNumber.innerHTML = lotteryResults.totalWinnings;


useAwards.addEventListener('click', function(event) {
    window.location.href = `results.html?entries=${lotteryResults.totalWinnings}`;
});

function startTimer() {
    let timerDuration = 30;
    let timerInterval = setInterval(function() {
        timerDuration--;

        if (timerDuration === 0) {
            clearInterval(timerInterval);
            window.location.href = 'index.html'
        }
    }, 1000);
}

function printTicket() {
    console.log('Ticket (to Print)');
    console.log(ticketTime);
    console.log(`This will include store location`);
    console.log(`Total awards: ${lotteryResults.totalWinnings}`);
    console.log(`This will include coupon information`);
}


var ticketTime = dayjs().format('dddd, MMMM D YYYY, h:mm:ss a');

const endScreen = document.getElementById('end-screen');
const awards = document.getElementById('awards')

collectAwards.addEventListener('click', function(event) {

    awards.style.display = 'none';

    endScreen.style.display = 'block';
    printTicket();
    startTimer();
});
const returnHome = document.getElementById('return-home');

returnHome.addEventListener('click', function(event) {
    event.stopPropagation();
    window.location.href = 'homescreen.html';
});