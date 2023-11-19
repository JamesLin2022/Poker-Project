using Microsoft.AspNetCore.Identity;
using Microsoft.Identity.Client;

namespace Poker_Project.Models;

public class AppUser : IdentityUser
{
    public int Xp { get; set; } = 0;
    
    public GameHistory? GameHistory { get; set; }
}