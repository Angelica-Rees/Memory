const moves = document.getElementById("moves-count");
const timeValue= document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let loading = false;
let firstCard = false;
let secondCard = false;

//Items array
const items = [
    {name:"cat", image:"images/cat.png"},
    {name:"chicken", image:"images/chicken.png"},
    {name:"dog", image:"images/dog.png"},
    {name:"goat", image:"images/goat.png"},
    {name:"monkey", image:"images/monkey.png"},
    {name:"mouse", image:"images/mouse.png"},
    {name:"pig", image:"images/pig.png"},
    {name:"rabbit", image:"images/rabbit.png"}
];

//Initial Time
let seconds= 0,
    minutes = 0;

//Initial moves and win count
let movesCount = 0, 
    winCount = 0;

//For timer
const timeGenerator = () => {
    seconds +=1;
    if(seconds >= 60) {
        minutes +=1;
        seconds =0;
    }
    //format time before displaying
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time: </span>${minutesValue}:${secondsValue}`;

};

//Moves
const movesCounter = () => {
    movesCount +=1;
    moves.innerHTML = `<span>Moves: </span>${movesCount}`;
};

//Pick random from array
const generateRandom = (size = 4) => {
    let tempArray = [...items];
    let cardValues = [];
    size = (size * size) / 2;
    for(let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1); 
    }
    return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues,...cardValues];
    cardValues.sort(() => Math.random() - 0.5);
    for(let i = 0; i < size * size; i++){
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}-${i}">
        <div class="card-before"><img src="images/blank.png" class="image"/></div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
    }
    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            console.log(loading);
            if(!card.classList.contains("matched") && !loading) {
                card.classList.add("flipped");
                if(!firstCard) {
                    firstCard = card;
                    firstCardValue = card.getAttribute("data-card-value");
                    firstCardNameEnd = firstCardValue.indexOf("-")
                }else {
                    movesCounter();
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    let secondCardNameEnd = secondCardValue.indexOf("-")

                    if(firstCardValue != secondCardValue && 
                        secondCardValue.substring(0,secondCardNameEnd) == firstCardValue.substring(0,firstCardNameEnd)) {
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        firstCard = false;
                        winCount += 1;
                        if(winCount == Math.floor(cardValues.length/2)) {
                            result.innerHTML = `<h2>You Won </h2>
                            <h4>Moves: ${movesCount}<h4>`;
                            stopGame();
                        }
                    }else {
                        loading = true
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped"); 
                            loading = false;  
                        }, 800);
                    }
                }
            }
        });
    });
};

//Start game
startButton.addEventListener("click", () => {
    seconds = 0;
    minutes = 0;
    movesCount = 0;
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    interval = setInterval(timeGenerator, 1000);
    moves.innerHTML = `<span>Moves: </span> ${movesCount}`;
    timeValue.innerHTML = `<span>Time: </span>00:00`;
    initializer();
});

//Stop game
stopButton.addEventListener("click", (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
}));

const initializer = () => {
    result.innerText = "";
    winCount= 0;
    let cardValues = generateRandom();
    matrixGenerator(cardValues);
};

initializer();
