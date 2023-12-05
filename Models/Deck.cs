// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;

// namespace Poker_Project.Models
// {
//     public class Deck
//     {
//         private List<Card> cards;

//         public Deck()
//         {
//             InitializeCards();
//         }

//         public void InitializeCards()
//         {
//             // Initialize a standard deck of 52 cards
//             cards = new List<Card>();
            
//             // Define the possible values and suits for a standard deck
//             char[] values = { '2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a' };
//             char[] suits = { 'h', 'd', 's', 'c' };

//             // Create cards for each combination of value and suit
//             foreach (var suit in suits)
//             {
//                 foreach (var value in values)
//                 {
//                     cards.Add(new Card { Value = value, Suit = suit });
//                 }
//             }
//         }

//         public Card DrawCard()
//         {
//             // Draw a card from the deck and remove it
//             if (cards.Any())
//             {
//                 var drawnCard = cards.First();
//                 cards.Remove(drawnCard);
//                 return drawnCard;
//             }
//             else
//             {
//                 Console.WriteLine("Deck is empty.");
//                 return null; // You might want to handle this case based on your application's logic
//             }
//         }

//         public void DisplayDeck()
//         {
//             Console.WriteLine("Remaining cards in the deck:");
//             foreach (var card in cards)
//             {
//                 Console.WriteLine($"Card: {card.Value} {card.Suit}");
//             }
//         }
//     }
// }