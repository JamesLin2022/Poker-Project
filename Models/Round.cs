// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;

// namespace Poker_Project.Models
// {
//     public class Round
//     {
//         public Hand Player1Hand { get; set; }
//         public Hand Player2Hand { get; set; }

//         public int Player1Money { get; set; }
//         public int Player2Money { get; set; }

//         public List<Card> River { get; set; }

//         public int Player1Bet { get; set; }
//         public int Player2Bet { get; set; }

//         private Deck deck;

//         public Round()
//         {
//             // Initialize hands, money, and river
//             Player1Hand = new Hand();
//             Player2Hand = new Hand();
//             Player1Money = 1000; // Initial money for Player 1
//             Player2Money = 1000; // Initial money for Player 2
//             River = new List<Card>();
//             Player1Bet = 0;
//             Player2Bet = 0;

//             // Initialize the deck
//             deck = new Deck();
//         }

//         public void DealHands()
//         {
//             // Draw two cards for each player from the deck
//             Player1Hand.Cards = new List<Card> { deck.DrawCard(), deck.DrawCard() };
//             Player2Hand.Cards = new List<Card> { deck.DrawCard(), deck.DrawCard() };
//         }

//         public void DealRiver()
//         {
//             // Draw five cards for the river from the deck
//             River = new List<Card>
//             {
//                 deck.DrawCard(),
//                 deck.DrawCard(),
//                 deck.DrawCard(),
//                 deck.DrawCard(),
//                 deck.DrawCard()
//             };
//         }

//         public void PlaceBets()
//         {
//             // Simulate players placing bets
//             // You might want to implement a proper betting logic
//             Player1Bet = 50;
//             Player2Bet = 50;

//             // Update total money for both players
//             Player1Money -= Player1Bet;
//             Player2Money -= Player2Bet;
//         }

//         public void DisplayRoundInfo()
//         {
//             Console.WriteLine("Player 1 Hand:");
//             DisplayCards(Player1Hand);

//             Console.WriteLine("\nPlayer 2 Hand:");
//             DisplayCards(Player2Hand);

//             Console.WriteLine("\nRiver Cards:");
//             DisplayCards(River);

//             Console.WriteLine($"\nPlayer 1 Total Money: {Player1Money}");
//             Console.WriteLine($"Player 2 Total Money: {Player2Money}");

//             // Display remaining cards in the deck for debugging purposes
//             deck.DisplayDeck();
//         }

//         private void DisplayCards(IEnumerable<Card> cards)
//         {
//             foreach (var card in cards)
//             {
//                 Console.WriteLine($"Card: {card.Value} {card.Suit}");
//             }
//         }
//     }
// }