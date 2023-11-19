namespace Poker_Project.Models;

public class GameHistory
{
    public int Id { get; set; }
    
    public List<Game>? Games { get; set; }
}