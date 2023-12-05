import { Card, Deck, Hand } from './classes.js';

console.log("here");

const deck = new Deck();
const playerHand = new Hand();
const opponentHand = new Hand();
const river = new Hand();

let opponentCash = 1000;
let playerCash = 1000;

const opponentCashDisplay = document.getElementById("opponentCash");
const playerCashDisplay = document.getElementById("playerCash");

// Player cards
const playerCardOne = document.getElementById("p-one");
const playerCardTwo = document.getElementById("p-two");

// Opponent cards
const opponentCardOne = document.getElementById("o-one");
const opponentCardTwo = document.getElementById("o-two");

// Shared cards
const sharedCardOne = document.getElementById("s-one");
const sharedCardTwo = document.getElementById("s-two");
const sharedCardThree = document.getElementById("s-three");
const sharedCardFour = document.getElementById("s-four");
const sharedCardFive = document.getElementById("s-five");

const playerMsg = document.getElementById("player-msg");
const opponentMsg = document.getElementById("opponent-msg");

const playerBet = document.getElementById("player-bet");

playerBet.onchange = function () {
    playerBet.value -= playerBet.value % 50;
}

const betButton = document.getElementById("bet");
const foldButton = document.getElementById("fold");

let minimumBet = 100;
let cardsRevealed = 1;
let pot = 0;

// Event listener for the "BET" button
betButton.addEventListener("click", () => {
    // Add your logic for handling a bet here
    // For example, deduct the bet amount from playerCash, update the display, and proceed with the game
    const betAmount = parseInt(playerBet.value) || 0; // Get the bet amount from the input
    if (betAmount > 0 && betAmount <= playerCash) {
        // Update the minimum bet if the current bet amount is larger
        minimumBet = Math.max(minimumBet, betAmount);

        // Set the minimum bet to the player's cash if it's greater than the player's cash
        if (minimumBet > playerCash) {
            playerBet.min = playerCash;
        }
        pot += betAmount;
        playerCash -= betAmount;
        updateGameState();
        // Add more logic here as needed
    } else {
        // Handle invalid bet amount (optional)
        alert("Invalid bet amount");
    }
});

foldButton.addEventListener("click", () => {
    playerMsg.innerHTML = `Player (FOLDED)`;
    opponentMsg.innerHTML = `Opponent (WINNER)`;
    opponentCash += pot;

    document.getElementById("next-page").innerHTML = "NEXT ROUND";
    document.getElementById("next-page").onclick = function() {dealCards()};
    betButton.disabled = true;
});

// Function to deal cards to the player and opponent
function dealCards() {
    betButton.disabled = false;
    updateCashDisplays();
    pot = 0;
    document.getElementById("next-page").innerHTML = `POT: $${pot}`;
    document.getElementById("next-page").onclick = "";

    playerMsg.innerHTML = "";
    opponentMsg.innerHTML = "";

    cardsRevealed = 1;
    deck.initializeDeck();
    deck.shuffleDeck();

    playerHand.clearHand();
    opponentHand.clearHand();
    river.clearHand();

    // Deal five cards to the river
    for (let i = 0; i < 5; i++) {
        river.addCard(deck.drawCard());
    }

    // Deal two cards to the player and opponent
    playerHand.addCard(deck.drawCard());
    playerHand.addCard(deck.drawCard());

    opponentHand.addCard(deck.drawCard());
    opponentHand.addCard(deck.drawCard());

    // Update the card images on the HTML page
    playerCardOne.src = `../img/cards/${playerHand.cards[0].value}-${playerHand.cards[0].suit}.png`;
    playerCardTwo.src = `../img/cards/${playerHand.cards[1].value}-${playerHand.cards[1].suit}.png`;

    // Update the river card images on the HTML page
    sharedCardOne.src = `../img/cards/${river.cards[0].value}-${river.cards[0].suit}.png`;
    sharedCardTwo.src = `../img/cards/back.png`;
    sharedCardThree.src = `../img/cards/back.png`;
    sharedCardFour.src = `../img/cards/back.png`;
    sharedCardFive.src = `../img/cards/back.png`;

    opponentCardOne.src = `../img/cards/back.png`;
    opponentCardTwo.src = `../img/cards/back.png`;

    playerHand.addCard(river.cards[cardsRevealed - 1]);
    opponentHand.addCard(river.cards[cardsRevealed - 1]);
}


dealCards();

// Function to update the game state by revealing one more card
function updateGameState() {

    // Make the opponent bet the minimum amount if they have enough money
    if (opponentCash >= minimumBet) {
        pot += minimumBet;
        updateCashDisplays();
        opponentCash -= minimumBet;    
    } else {
        pot += opponentCash;
        opponentCash -= opponentCash;
        updateCashDisplays();
    }

    if (cardsRevealed < 5) {
        playerHand.addCard(river.cards[cardsRevealed]);
        opponentHand.addCard(river.cards[cardsRevealed]);

        cardsRevealed++;

        // Update the river card images on the HTML page
        for (let i = 0; i < cardsRevealed; i++) {
            const cardElementId = `s-${numberToWord(i + 1)}`; // Convert number to word (e.g., "one", "two", ...)
            const cardElement = document.getElementById(cardElementId);
            cardElement.src = `../img/cards/${river.cards[i].value}-${river.cards[i].suit}.png`;
        }

        if (cardsRevealed === 5 || playerCash === 0 || opponentCash === 0) {
            console.log("here");
            if (playerCash === 0 || opponentCash === 0) {
                for (let i = 0; i < 5; i++) {
                    const cardElementId = `s-${numberToWord(i + 1)}`; // Convert number to word (e.g., "one", "two", ...)
                    const cardElement = document.getElementById(cardElementId);
                    cardElement.src = `../img/cards/${river.cards[i].value}-${river.cards[i].suit}.png`;
                }    
                updateCashDisplays();
            }
            opponentCardOne.src = `../img/cards/${opponentHand.cards[0].value}-${opponentHand.cards[0].suit}.png`;
            opponentCardTwo.src = `../img/cards/${opponentHand.cards[1].value}-${opponentHand.cards[1].suit}.png`;
            playerHand.getRank();
            opponentHand.getRank();

            let result = playerHand.compareRank(opponentHand);

            if (result > 0) {
                playerMsg.innerHTML = `Player:${playerHand.rank} (WINNER)`;
                opponentMsg.innerHTML = `Opponent:${opponentHand.rank}`;
                playerCash += pot;

            } else if (result < 0) {
                playerMsg.innerHTML = `Player:${playerHand.rank}`;
                opponentMsg.innerHTML = `Opponent:${opponentHand.rank} (WINNER)`;
                opponentCash += pot;
            } else {
                playerMsg.innerHTML = `Player:${playerHand.rank} (TIE)`;
                opponentMsg.innerHTML = `Opponent:${opponentHand.rank} (TIE)`;
                playerCash += pot/2;
                opponentCash += pot/2;
            }

            if (playerCash <= 0) {
                document.getElementById("next-page").innerHTML = "<a id='next-page2' href='/home/LoseGame'>NEXT PAGE</a>"
                document.getElementById("next-page").onclick = "location.href='@Url.Action(`LoseGame`,`Home`)'";
                betButton.disabled = true;
            } else if (opponentCash <= 0) {
                document.getElementById("next-page").innerHTML = "<a id='next-page2' href='/home/WinGame'>NEXT PAGE</a>"
                document.getElementById("next-page").onclick = "location.href='@Url.Action(`WinGame`,`Home`)'";
                betButton.disabled = true;
            } else {
                document.getElementById("next-page").innerHTML = "NEXT ROUND";
                document.getElementById("next-page").onclick = function() {dealCards()};
                betButton.disabled = true;
            }
        }
        updateCashDisplays();
    } else {
        // Handle game state when all cards are revealed (optional)
        alert("All cards revealed");
    }
}

// Helper function to convert a number to its word representation
function numberToWord(number) {
    const words = ["one", "two", "three", "four", "five"];
    return words[number - 1] || ""; // Subtract 1 to adjust for array index
}

// Function to update the cash displays
function updateCashDisplays() {
    // Update opponent's cash display
    const opponentCashDisplay = document.getElementById("opponentCash");
    opponentCashDisplay.innerHTML = `CASH: $${opponentCash}`;

    // Update player's cash display
    const playerCashDisplay = document.getElementById("playerCash");
    playerCashDisplay.innerHTML = `CASH: $${playerCash}`;

    document.getElementById("next-page").innerHTML = `POT: $${pot}`;
}

updateCashDisplays();