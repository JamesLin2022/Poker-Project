namespace Poker_Project.Models;

public class Hand
{
    public int Id { get; set; }

    public List<Card>? Cards { get; set; }

    public string? Rank { get; set; }

    public void DetermineRank()
    {
        if (Cards == null || Cards.Count == 0)
        {
            Console.WriteLine("Hand is empty. Cannot determine rank.");
            return;
        }

        // Order the cards by their values
        var orderedCards = Cards.OrderByDescending(c => c.Value).ToList();

        // Check for different poker hand ranks
        if (IsRoyalFlush(orderedCards))
        {
            Rank = "Royal Flush";
        }
        else if (IsStraightFlush(orderedCards))
        {
            Rank = "Straight Flush";
        }
        else if (IsFourOfAKind(orderedCards))
        {
            Rank = "Four of a Kind";
        }
        else if (IsFullHouse(orderedCards))
        {
            Rank = "Full House";
        }
        else if (IsFlush(orderedCards))
        {
            Rank = "Flush";
        }
        else if (IsStraight(orderedCards))
        {
            Rank = "Straight";
        }
        else if (IsThreeOfAKind(orderedCards))
        {
            Rank = "Three of a Kind";
        }
        else if (IsTwoPair(orderedCards))
        {
            Rank = "Two Pair";
        }
        else if (IsOnePair(orderedCards))
        {
            Rank = "One Pair";
        }
        else
        {
            Rank = "High Card";
        }
    }

    // Add methods for checking each poker hand rank
    private bool IsRoyalFlush(List<Card> cards)
    {
        // Implement logic to check for a Royal Flush
        // This involves having a straight flush with A, K, Q, J, 10
        // and all cards having the same suit
        // ...

        return false;
    }

    private bool IsStraightFlush(List<Card> cards)
    {
        // Implement logic to check for a Straight Flush
        // This involves having a straight and all cards having the same suit
        // ...

        return false;
    }

    // Implement methods for other poker hand ranks...

    // You can use similar methods to check for other hand ranks

    // Example methods:
    private bool IsFourOfAKind(List<Card> cards)
    {
        // Implement logic to check for Four of a Kind
        // ...

        return false;
    }

    private bool IsFullHouse(List<Card> cards)
    {
        // Implement logic to check for a Full House
        // ...

        return false;
    }

    // Add more methods as needed
    private bool IsFlush(List<Card> cards)
    {
        // Check if all cards have the same suit
        return cards.All(c => c.Suit == cards.First().Suit);
    }

    private bool IsStraight(List<Card> cards)
    {
        // Order cards by value
        var orderedCards = cards.OrderBy(c => c.Value).ToList();

        // Check if the cards form a straight
        for (int i = 1; i < orderedCards.Count; i++)
        {
            if (orderedCards[i - 1].CompareTo(orderedCards[i]) != -1)
            {
                return false;
            }
        }

        return true;
    }

    private bool IsThreeOfAKind(List<Card> cards)
    {
        // Check if there are three cards with the same value
        return cards.GroupBy(c => c.Value).Any(group => group.Count() == 3);
    }

    private bool IsTwoPair(List<Card> cards)
    {
        // Check if there are two pairs of cards with the same value
        return cards.GroupBy(c => c.Value).Count(group => group.Count() == 2) == 2;
    }

    private bool IsOnePair(List<Card> cards)
    {
        // Check if there is one pair of cards with the same value
        return cards.GroupBy(c => c.Value).Any(group => group.Count() == 2);
    }
}
