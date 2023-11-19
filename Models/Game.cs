using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Poker_Project.Models;

public class Game
{
    public int Id { get; set; }
    
    public bool Winner { get; set; }
    
    public DateTime DateComplete { get; set; } = DateTime.UtcNow;

    public List<Hand>? Hands { get; set; }
    
    public Ai Ai { get; set; }
}