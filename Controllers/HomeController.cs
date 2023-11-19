using System.Diagnostics;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
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
        var id = _userManager.GetUserId(User);
        var user = await _userManager.GetUserAsync(User);
        Console.WriteLine(user.Email);
        var dbuser = _dbContext.Users.FirstOrDefault(u => u.Id == user.Id);
        dbuser.Xp += 10;
        _dbContext.SaveChanges();
        return View();
    }
    
    [Authorize]
    public async Task<IActionResult> GameHistory()
    {
        var id = _userManager.GetUserId(User);
        var user = await _userManager.GetUserAsync(User);
        ViewData["xp"] = user.Xp;
        return View();
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
