class RankChecker {

    static isStraightFlush(hand) {
        // Check if the hand is both a straight and a flush
        if (this.isStraight(hand).isStraight && this.isFlush(hand).isFlush) {
            // Sort the cards by their value index in ascending order
            const sortedCards = hand.cards.sort((a, b) => '23456789tjqka'.indexOf(a.value) - '23456789tjqka'.indexOf(b.value));

            // Return the dictionary with the lowest value of the straight flush
            return {
                isStraightFlush: true,
                A: sortedCards[0].value
            };
        }

        return false;
    }

    // Method to check if the hand has Four of a Kind
    static isFourOfAKind(hand) {
        const valueCountMap = new Map();

        // Count the occurrences of each card value
        hand.cards.forEach(card => {
            const value = card.value;
            valueCountMap.set(value, (valueCountMap.get(value) || 0) + 1);
        });

        // Check if there is a card value that appears four times
        const fourOfAKindValue = [...valueCountMap.entries()].find(entry => entry[1] === 4);

        if (fourOfAKindValue) {
            const highestValueNotInFourOfAKind = hand.cards
                .filter(card => card.value !== fourOfAKindValue[0])
                .reduce((highest, card) => {
                    const cardValueIndex = '23456789tjqka'.indexOf(card.value);
                    return cardValueIndex > '23456789tjqka'.indexOf(highest.value) ? card : highest;
                }, { value: '2' }); // Initialize with the lowest value '2' for comparison

            return {
                isFourOfAKind: true,
                A: fourOfAKindValue[0],
                B: highestValueNotInFourOfAKind.value
            };
        }

        return false;
    }

    // Method to check if the hand has a Full House
    static isFullHouse(hand) {
        const valueCountMap = new Map();

        // Count the occurrences of each card value
        hand.cards.forEach(card => {
            const value = card.value;
            valueCountMap.set(value, (valueCountMap.get(value) || 0) + 1);
        });

        const values = Array.from(valueCountMap.values());

        // Check if the values include both three of a kind and a pair
        if (values.includes(3) && values.includes(2)) {
            const threeOfAKindValue = [...valueCountMap.entries()].find(entry => entry[1] === 3)[0];
            const pairValue = [...valueCountMap.entries()].find(entry => entry[1] === 2)[0];
            return { isFullHouse: true, A: threeOfAKindValue, B: pairValue };
        }

        return false;
    }

    // Method to check if the hand is a flush
    static isFlush(hand) {
        const firstSuit = hand.cards[0].suit;

        // Check if all cards have the same suit as the first card
        const isFlush = hand.cards.every(card => card.suit === firstSuit);

        // Get the lowest value in the flush
        const A = isFlush ? '23456789tjqka'.indexOf(hand.cards[0].value) : null;

        return isFlush ? { isFlush, A } : false;
    }

    // Method to check if the hand is a straight
    static isStraight(hand) {
        // Sort the cards by their values
        const sortedCards = hand.cards.slice().sort((a, b) => '23456789tjqka'.indexOf(a.value) - '23456789tjqka'.indexOf(b.value));
        // Check if the values form a consecutive sequence
        for (let i = 1; i < sortedCards.length; i++) {
            if ('23456789tjqka'.indexOf(sortedCards[i].value) !== '23456789tjqka'.indexOf(sortedCards[i - 1].value) + 1) {
                return false;
            }
        }

        return { isStraight: true, A: '23456789tjqka'.indexOf(sortedCards[0].value) };
    }

    static isThreeOfAKind(hand) {
        const valueCountMap = new Map();

        // Count the occurrences of each card value
        hand.cards.forEach(card => {
            const value = card.value;
            valueCountMap.set(value, (valueCountMap.get(value) || 0) + 1);
        });

        const values = Array.from(valueCountMap.values());

        // Check if there is a card value that appears three times
        const threeOfAKindValue = [...valueCountMap.entries()].find(entry => entry[1] === 3);

        if (threeOfAKindValue) {
            const notInThreeOfAKind = hand.cards
                .filter(card => card.value !== threeOfAKindValue[0])
                .sort((a, b) => '23456789tjqka'.indexOf(a.value) - '23456789tjqka'.indexOf(b.value));

            // Get the lowest and second lowest values not in the three of a kind
            const lowestValueNotInThreeOfAKind = notInThreeOfAKind[0].value;
            const secondLowestValueNotInThreeOfAKind = notInThreeOfAKind[1].value;

            return {
                isThreeOfAKind: true,
                A: lowestValueNotInThreeOfAKind,
                B: secondLowestValueNotInThreeOfAKind
            };
        }

        return false;
    }

    static isTwoPair(hand) {
        const valueCountMap = new Map();

        // Count the occurrences of each card value
        hand.cards.forEach(card => {
            const value = card.value;
            valueCountMap.set(value, (valueCountMap.get(value) || 0) + 1);
        });

        const values = Array.from(valueCountMap.values());

        // Check if there are two pairs
        if (values.filter(count => count === 2).length === 2) {
            const pairValues = [...valueCountMap.entries()]
                .filter(entry => entry[1] === 2)
                .map(pair => pair[0]);

            // Sort pair values by their index
            pairValues.sort((a, b) => '23456789tjqka'.indexOf(a) - '23456789tjqka'.indexOf(b));

            return {
                isTwoPair: true,
                A: pairValues[0],
                B: pairValues[1]
            };
        }

        return false;
    }

    static isPair(hand) {
        const valueCountMap = new Map();

        // Count the occurrences of each card value
        hand.cards.forEach(card => {
            const value = card.value;
            valueCountMap.set(value, (valueCountMap.get(value) || 0) + 1);
        });

        const values = Array.from(valueCountMap.values());

        // Check if there is a pair
        if (values.includes(2)) {
            const pairValue = [...valueCountMap.entries()].find(entry => entry[1] === 2)[0];

            // Find the lowest value not in the pair
            const notInPair = hand.cards
                .filter(card => card.value !== pairValue)
                .sort((a, b) => '23456789tjqka'.indexOf(a.value) - '23456789tjqka'.indexOf(b.value));

            // Get the lowest value of the pair and the lowest value not in the pair
            const A = pairValue;
            const B = notInPair[0].value;

            return {
                isPair: true,
                A: A,
                B: B
            };
        }

        return false;
    }

    static getHighCards(hand) {
        // Sort the cards by their value index in descending order
        const sortedCards = hand.cards.sort((a, b) => '23456789tjqka'.indexOf(b.value) - '23456789tjqka'.indexOf(a.value));

        // Return a dictionary with the highest and second highest cards
        return {
            A: sortedCards[0],
            B: sortedCards[1]
        };
    }
}

export { RankChecker };
