using System.Diagnostics;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Poker_Project.Data;
using Poker_Project.Models;

namespace Poker_Project.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly UserManager<AppUser> _userManager;
    private readonly ApplicationDbContext _dbContext;


    public HomeController(ApplicationDbContext context, ILogger<HomeController> logger, UserManager<AppUser> userManager)
    {
        _userManager = userManager;
        _logger = logger;
        _dbContext = context;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult StartGame()
    {
        return View();
    }

    public async Task<IActionResult> WinGame()
    {
        try
        {
            var id = _userManager.GetUserId(User);
            var user = await _userManager.GetUserAsync(User);
            Console.WriteLine(user.Email);
            var dbuser = _dbContext.Users.FirstOrDefault(u => u.Id == user.Id);
            if (dbuser == null)
            {
                return View();
            }
            dbuser.Xp += 10;
            if (dbuser.GameHistory == null)
            {
                dbuser.GameHistory = new GameHistory();
            }
            if (dbuser.GameHistory.Games == null || dbuser.GameHistory.Games.Count == 0)
            {
                dbuser.GameHistory.Games = new List<Game>();
            }
            Game game = new Game
            {
                Winner = true,
                DateComplete = DateTime.UtcNow,
                Hands = null,
                Ai = new Ai
                {
                    Difficulty = 1
                }
            };
            dbuser.GameHistory.Games.Add(game);
            _dbContext.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
        return View();
    }

    public async Task<IActionResult> LoseGame()
    {
        try
        {
            var id = _userManager.GetUserId(User);
            var user = await _userManager.GetUserAsync(User);
            Console.WriteLine(user.Email);
            var dbuser = _dbContext.Users.FirstOrDefault(u => u.Id == user.Id);
            if (dbuser == null)
            {
                return View();
            }
            dbuser.Xp -= 5;
            if (dbuser.GameHistory == null)
            {
                dbuser.GameHistory = new GameHistory();
            }
            if (dbuser.GameHistory.Games == null || dbuser.GameHistory.Games.Count == 0)
            {
                dbuser.GameHistory.Games = new List<Game>();
            }
            Game game = new Game
            {
                Winner = false,
                DateComplete = DateTime.UtcNow,
                Hands = null,
                Ai = new Ai
                {
                    Difficulty = 1
                }
            };
            dbuser.GameHistory.Games.Add(game);
            _dbContext.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
        return View();
    }

    [Authorize]
    public async Task<IActionResult> GameHistory()
    {
        try {
            var id = _userManager.GetUserId(User);
        var user = await _userManager.GetUserAsync(User);

        if (user == null)
        {
            return View();
        }

        ViewData["xp"] = user.Xp;

        var dbuser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == user.Id);

        if (dbuser == null || dbuser.GameHistory == null || dbuser.GameHistory.Games == null || dbuser.GameHistory.Games.Count == 0)
        {
            return View();
        }

        dbuser.Xp += 10;

        IEnumerable<Game> games = dbuser.GameHistory.Games;
        return View(games);
        } catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return View();
        }
        
    }


    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
