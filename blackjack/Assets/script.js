const startBtn = document.getElementById("start-btn");
const btnSpace = document.getElementById("btn-space");
const dealerCards = document.getElementById("dealer-cards");
const playerCards = document.getElementById("player-cards");
const dealerValueText = document.getElementById("dealer-hand-value");
const playerValueText = document.getElementById("player-hand-value");
let playMSG = document.getElementById("play-msg");
let hitBtn;
let standBtn;

function buildDeck() {
    let deck = [];
    const suits = ["♠", "♣", "♥", "♦"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];    
    for(const suit of suits){
        for(const value of values){
            deck.push(` ${value} ${suit} `);
        }
    }
    return deck;
}
let deckOfCards;

let dealerHandValue = 0;
let playerHandValue = 0;
let playerAceHand  = 0;
let dealerAceHand = 0;
let dealerCardCount = 0;
let playerCardCount = 0;

function renderField() {
    deckOfCards = buildDeck();
    dealerCards.innerText = "";
    playerCards.innerText = "";
    dealerHandValue = 0;
    playerHandValue = 0;
    playerAceHand  = 0;
    dealerAceHand = 0;
    btnSpace.innerHTML= "<button id=\'hit-btn\'>Hit</button><button id=\'stand-btn\'>Stand</button>";
    hitBtn = document.getElementById("hit-btn");
    standBtn = document.getElementById("stand-btn");
    hitBtn.addEventListener("click", hit);
    standBtn.addEventListener("click", stand);
    playMSG.textContent = "Hit or stand?";
    for(let i = 0; i < 2; i++){
        dealCardToDealer();
        dealCardToPlayer();
    }    
    checkGameState();
}

function convertCardToNumberValue(str) {
    let strValue = str.match(/\d+/g);
    if(strValue == null) {
        strValue = str.split("")[1];        
        if(strValue == "A") {
            strValue = "1";
        }
        else if(strValue == "J" || strValue == "Q" || strValue == "K") strValue = "10";
    }
    let numValue = 0;
    numValue = Number(strValue);
    return numValue;
}
function dealOneCard() {
    let cardsRemaining = deckOfCards.length - 1;
    let cardIndex = Math.floor(Math.random() * cardsRemaining);
    return deckOfCards.splice(cardIndex, 1) + " "
}
function dealCardToDealer() {
    dealerCardCount++;
    let dealerCard = dealOneCard();
    dealerCards.innerText += dealerCard;
    dealerHandValue += convertCardToNumberValue(dealerCard);
    dealerValueText.innerText = dealerHandValue;
    aceRoutine();
}
function dealCardToPlayer() {
    playerCardCount++;
    let playerCard = dealOneCard()
    playerCards.innerText += playerCard;
    playerHandValue += convertCardToNumberValue(playerCard);
    playerValueText.innerHTML = playerHandValue;
    aceRoutine();
}
function hit() {    
    dealCardToPlayer();
    checkGameState();
    if(dealerHandValue < 17 && dealerAceHand < 17 && playerHandValue < 22){
        dealCardToDealer();
    }    
    checkGameState();
}
let playerStands = false;
function stand(){
    playerStands = true;

    if(playerAceHand > playerHandValue && playerAceHand < 22) {
        playerHandValue = playerAceHand;
        playerValueText.innerText = playerHandValue + "";
    }
    
    checkGameState(); 
}
function aceRoutine() {
    if(dealerCards.innerText.includes("A")){
        dealerAceHand = dealerHandValue + 10;
        if(dealerAceHand < 17){
            dealerValueText.innerText = `${dealerHandValue} / ${dealerAceHand}`;
        }
        if(dealerAceHand > 16 && dealerAceHand < 22) {
            dealerHandValue = dealerAceHand;
            dealerValueText.innerText = dealerHandValue;
        } else {
            dealerValueText.innerText = dealerHandValue;
        }
    }
    if(playerCards.innerText.includes("A")){
        playerAceHand = playerHandValue + 10;
        if(playerAceHand < 22){
            playerValueText.innerText = `${playerHandValue} / ${playerAceHand}`;
        } else if(playerAceHand == 21) {
            playerValueText.innerText = playerAceHand;
        }
        else playerValueText.innerText = playerHandValue;
    } 
    console.log(dealerCards.innerText)
    console.log("playerAceHandVal = " + playerAceHand);
    console.log("dealerAceVal = " + dealerAceHand)
}
function checkGameState(){
    if(playerAceHand == 21 && playerCardCount == 2){
        aceRoutine();
        if(dealerAceHand == 21){
            playMSG.textContent = "Damn the dealer got blackjack too. Push..";
            gameOver();
            return;
        } else {
            playMSG.textContent = "BLACKJACK!!!"
            gameOver();
            return;
        }
    }
    if(dealerAceHand == 21 && dealerCardCount == 2){
        playMSG.textContent = "The dealer got blackjack..You lose."
        gameOver();
        return;
    }
    if(dealerHandValue > 21 && playerHandValue < 22) {
        playMSG.textContent = "The Dealer busted! You Win!";
            gameOver();
            return;
    }
    if(playerHandValue > 21) {
        playMSG.textContent = "You bust..";
        gameOver();
        return;
    }
    if(playerStands){
        while(dealerHandValue < 17 && dealerAceHand < 17) {
            dealCardToDealer();
            if(dealerAceHand > 16 && dealerAceHand < 22){
                aceRoutine();
            }
        }
        if(dealerHandValue > 21) {
            playMSG.textContent = "The Dealer busted! You Win!";
            gameOver();
            return;
        }
        if(playerHandValue == dealerHandValue){
            playMSG.textContent = "Draw.. bummer."
            gameOver();
            return;
        }
        if(playerHandValue > dealerHandValue) {
            playMSG.textContent = `You won the brawl with your ${playerHandValue} over the dealer's ${dealerHandValue}`;
            gameOver();
            return;
        } else {
            playMSG.textContent = `The dealer beat your ${playerHandValue} with a ${dealerHandValue}`;
            gameOver();
            return;
        }
        
    }
}
function gameOver() {
    btnSpace.innerHTML = "<a href=./main.html><button id=\'start-over-btn\'>Start Over</button></a>";
    // const startOverBtn = document.getElementById("start-over-btn");
    // startOverBtn.addEventListener("click", renderField);
}

startBtn.addEventListener("click", renderField);