const entryTable = [
  { entries: 1, points: 50000 },
  { entries: 2, points: 29975 },
  { entries: 1, points: 10000 },
  { entries: 1, points: 7500 },
  { entries: 12, points: 5000 },
  { entries: 22, points: 3750 },
  { entries: 11, points: 2500 },
  { entries: 4, points: 2250 },
  { entries: 158, points: 2000 },
  { entries: 8, points: 1875 },
  { entries: 8, points: 1750 },
  { entries: 10, points: 1500 },
  { entries: 315, points: 1250 },
  { entries: 25, points: 1125 },
  { entries: 275, points: 1000 },
  { entries: 350, points: 750 },
  { entries: 1150, points: 625 },
  { entries: 1215, points: 500 },
  { entries: 737, points: 375 },
  { entries: 1375, points: 250 },
  { entries: 7000, points: 125 },
  { entries: 17000, points: 50 },
  { entries: 23000, points: 25 },
  { entries: 197320, points: 0 },
];

let arrayChances = JSON.parse(localStorage.getItem("arrayChances"));

if (!arrayChances) {
  arrayChances = createArrayChances();
  localStorage.setItem("arrayChances", JSON.stringify(arrayChances));
}

const awardsContainer = document.querySelector(".awards-container");
const loadingContainer = document.querySelector(".loading-container");
const loadingText = document.getElementById("loading-text");
let countdown = 4;

let useAwards = document.getElementById("use-awards");
let collectAwards = document.getElementById("collect-awards");

var urlParams = new URLSearchParams(window.location.search);
var numEntries = parseInt(urlParams.get("entries"));

function updateCountdown() {
  loadingText.innerHTML = `Loading... <span id="countdown-display">${countdown}s</span>`;

  if (countdown < 1) {
    loadingContainer.style.display = "none";
    awardsContainer.style.display = "block";
    displayResults();
  } else {
    countdown--;
    setTimeout(updateCountdown, 1000);
  }
}

updateCountdown();

function createArrayChances() {
  const newChances = [];

  for (let i = 0; i < entryTable.length; i++) {
    const { entries, points } = entryTable[i];

    // Repeat the points value 'entries' number of times
    for (let j = 0; j < entries; j++) {
      newChances.push(points);
    }
  }

  return newChances;
}

function randomlyChooseElements(numTimes) {
  const randomElements = [];
  let randomElementsTotal = 0;

  if (numTimes <= arrayChances.length) {
    for (let i = 0; i < numTimes; i++) {
      const randomIndex = Math.floor(Math.random() * arrayChances.length);
      const randomElement = arrayChances[randomIndex];
      randomElements.push(randomElement);
      randomElementsTotal += randomElement;

      arrayChances.splice(randomIndex, 1);
    }
  } else if (numTimes > arrayChances.length) {
    const remainder = numTimes - arrayChances.length;
    for (let i = 0; i < arrayChances.length; i++) {
      randomElements.push(arrayChances[i]);
      randomElementsTotal += arrayChances[i];
    }
    localStorage.removeItem("arrayChances");
    console.log(arrayChances.length);
    arrayChances = createArrayChances();
    for (let i = 0; i < remainder; i++) {
      const randomIndex = Math.floor(Math.random() * arrayChances.length);
      const randomElement = arrayChances[randomIndex];
      randomElements.push(randomElement);
      randomElementsTotal += randomElement;

      arrayChances.splice(randomIndex, 1);
    }
    console.log(arrayChances.length)
  }

  localStorage.setItem("arrayChances", JSON.stringify(arrayChances));
  console.log(arrayChances.length)

  return {
    totalWinnings: randomElementsTotal,
    entryResults: randomElements,
  };
}

let lotteryResults = null;

function displayResults() {
  if (lotteryResults === null) {
    lotteryResults = randomlyChooseElements(numEntries);
  }

  if (lotteryResults.totalWinnings === 0) {
    useAwards.style.display = "none";
    let collectAwardsText = document.getElementById("collect-awards-text");
    collectAwardsText.textContent = "Print Coupon";
  }

  const awardsNumber = document.getElementById("awards-number");
  awardsNumber.textContent = lotteryResults.totalWinnings;
}

lotteryResults = randomlyChooseElements(numEntries);

console.log(`Total Winnings: ${lotteryResults.totalWinnings} points`);
console.log(arrayChances.length);
//console.log("Results for each entry:");
//console.log(lotteryResults.entryResults);

var awardsNumber = document.getElementById("awards-number");
awardsNumber.innerHTML = lotteryResults.totalWinnings;

useAwards.addEventListener("click", function (event) {
  window.location.href = `results.html?entries=${lotteryResults.totalWinnings / 25}`;
});

function startTimer() {
  let timerDuration = 30;
  let timerInterval = setInterval(function () {
    timerDuration--;

    if (timerDuration === 0) {
      clearInterval(timerInterval);
      window.location.href = "index.html";
    }
  }, 1000);
}

function printTicket() {
  console.log("Ticket (to Print)");
  console.log(ticketTime);
  console.log(`This will include store location`);
  console.log(`Total awards: ${lotteryResults.totalWinnings}`);
  console.log(`This will include coupon information`);
}

var ticketTime = dayjs().format("dddd, MMMM D YYYY, h:mm:ss a");

const endScreen = document.getElementById("end-screen");
const awards = document.getElementById("awards");

collectAwards.addEventListener("click", function (event) {
  awards.style.display = "none";

  endScreen.style.display = "block";
  printTicket();
  startTimer();
});
const returnHome = document.getElementById("return-home");

returnHome.addEventListener("click", function (event) {
  event.stopPropagation();
  window.location.href = "homescreen.html";
});
