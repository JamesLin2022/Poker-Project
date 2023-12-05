namespace Poker_Project.Models;

public class Card
{
    public int Id { get; set; }

    public char? Value { get; set; }

    public char? Suit { get; set; }

    public int CompareTo(Card other)
    {
        if (other == null)
        {
            return 1; // Null cards are considered greater
        }

        // Compare cards based on their values
        if (Value.HasValue && other.Value.HasValue)
        {
            int valueComparison = CompareCardValues(Value.Value, other.Value.Value);

            if (valueComparison == 0)
            {
                // If values are equal, compare based on suits
                if (Suit.HasValue && other.Suit.HasValue)
                {
                    return Suit.Value.CompareTo(other.Suit.Value);
                }
            }

            return valueComparison;
        }

        return 0; // Cards are considered equal if they don't have values
    }

    private static int CompareCardValues(char value1, char value2)
    {
        // Define the order of card values
        string valueOrder = "23456789tjqka"; // t represents 10

        int index1 = valueOrder.IndexOf(value1);
        int index2 = valueOrder.IndexOf(value2);

        return index1.CompareTo(index2);
    }
}