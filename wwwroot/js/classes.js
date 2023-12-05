import { RankChecker } from './rankchecker.js';

class Deck {
    constructor() {
        this.cards = [];
        this.initializeDeck();
        this.shuffleDeck();
    }

    initializeDeck() {
        // Clear existing cards
        this.cards = [];

        const suits = ['h', 'd', 'c', 's'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'];

        for (const suit of suits) {
            for (const value of values) {
                this.cards.push(new Card(value, suit));
            }
        }
    }

    shuffleDeck() {
        // Simple shuffle function using Fisher-Yates algorithm
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    drawCard() {
        // Return the top card from the deck
        return this.cards.pop();
    }
}

// Card class declaration
class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }

    // Method to compare card values
    compareValues(otherCard) {
        const valueOrder = '23456789tjqka';

        const index1 = valueOrder.indexOf(this.value);
        const index2 = valueOrder.indexOf(otherCard.value);

        if (index1 < index2) {
            return -1;
        } else if (index1 > index2) {
            return 1;
        } else {
            return 0;
        }
    }
}

class Hand {
    constructor() {
        this.cards = [];
        this.rank = null;
        this.A = null;
        this.B = null;
    }

    // Method to add a card to the hand
    addCard(card) {
        this.cards.push(card);
    }

    clearHand() {
        // Clear existing cards in the hand
        this.cards = [];
        this.rank = null;
        this.A = null;
        this.B = null;
    }

    getRank() {
        // Use RankChecker to determine the poker hand rank
        const rankInfo = RankChecker.isStraightFlush(this) ||
            RankChecker.isFourOfAKind(this) ||
            RankChecker.isFullHouse(this) ||
            RankChecker.isFlush(this) ||
            RankChecker.isStraight(this) ||
            RankChecker.isThreeOfAKind(this) ||
            RankChecker.isTwoPair(this) ||
            RankChecker.isPair(this) ||
            RankChecker.getHighCards(this);

        // Set the rank and lowest card variables
        this.rank = rankInfo.isStraightFlush ? 'Straight Flush' :
            rankInfo.isFourOfAKind ? 'Four of a Kind' :
            rankInfo.isFullHouse ? 'Full House' :
            rankInfo.isFlush ? 'Flush' :
            rankInfo.isStraight ? 'Straight' :
            rankInfo.isThreeOfAKind ? 'Three of a Kind' :
            rankInfo.isTwoPair ? 'Two Pair' :
            rankInfo.isPair ? 'Pair' :
            'High Card';

        this.A = rankInfo.A;
        this.B = rankInfo.B;

        // Return the determined rank
        return this.rank;
    }

    compareRank(otherHand) {
        // Compare ranks first
        const rankComparison = Hand.pokerRank.indexOf(this.rank) - Hand.pokerRank.indexOf(otherHand.rank);

        console.log(this.cards);
        console.log(otherHand.cards);

        if (rankComparison !== 0) {
            return rankComparison;
        }

        console.log(this.A);
        console.log(otherHand.A);

        // If ranks are the same, compare the lowest cards
        const lowestCardComparison = '23456789tjqka'.indexOf(this.A) - '23456789tjqka'.indexOf(otherHand.A);
        console.log(lowestCardComparison);
        console.log(this.B);
        console.log(otherHand.B);

        if (lowestCardComparison !== 0 && !this.B) {
            return lowestCardComparison;
        }

        return '23456789tjqka'.indexOf(this.B) - '23456789tjqka'.indexOf(otherHand.B);;
    }
}

// Define the poker rank hierarchy
Hand.pokerRank = [
    'High Card',
    'Pair',
    'Two Pair',
    'Three of a Kind',
    'Straight',
    'Flush',
    'Full House',
    'Four of a Kind',
    'Straight Flush'
];

export { Card, Hand, Deck };