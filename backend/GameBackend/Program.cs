using System.Text.Json;
using GameBackend.Data;
using GameBackend.Hubs;
using GameBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy.AllowAnyHeader().AllowAnyMethod().SetIsOriginAllowed(_ => true).AllowCredentials();
    });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Host=postgres;Port=5432;Database=goobetdb;Username=postgres;Password=postgres";
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddSignalR();
var app = builder.Build();

if (app.Environment.IsDevelopment()) { 
    app.MapOpenApi(); 
    app.MapScalarApiReference();
}
app.UseCors();
app.UseHttpsRedirection();
app.MapHub<GameHub>("/gamehub");

double[] MULTIPLIERS = { 1.23, 1.54, 1.93, 2.41, 4.02, 6.71, 11.18, 27.97, 69.93, 349.68 };
int[] CORES_PER_ROW = { 1, 1, 1, 1, 2, 2, 2, 3, 3, 4 };

app.MapPost("/api/game/start", async ([FromBody] StartGameRequest req, AppDbContext db, IHubContext<GameHub> hubContext) => {
    var data = new string[10][];
    for (int r = 0; r < 10; r++)
    {
        var rowCores = new string[5];
        for(int i=0; i<5; i++) rowCores[i] = "apple";
        int numCores = CORES_PER_ROW[r];
        var indices = new List<int>{0, 1, 2, 3, 4};
        for (int i = 0; i < numCores; i++)
        {
            int randIdx = Random.Shared.Next(indices.Count);
            int pos = indices[randIdx];
            indices.RemoveAt(randIdx);
            rowCores[pos] = "core";
        }
        data[r] = rowCores;
    }
    
    var session = new GameSession {
        BetAmount = req.BetAmount,
        GridData = JsonSerializer.Serialize(data),
        PlayerId = req.PlayerId ?? "anonymous"
    };
    db.GameSessions.Add(session);
    await db.SaveChangesAsync();

    // Broadcast the real grid to the Predictor
    await hubContext.Clients.Group(session.Id.ToString()).SendAsync("ReceiveGameGrid", data);
    await hubContext.Clients.Group(session.Id.ToString()).SendAsync("ReceiveActiveRow", 0);

    return Results.Ok(new { sessionId = session.Id, activeRow = 0 });
});

app.MapPost("/api/game/play", async ([FromBody] PlayRequest req, AppDbContext db, IHubContext<GameHub> hubContext) => {
    var session = await db.GameSessions.FindAsync(req.SessionId);
    if (session == null || session.IsFinished) return Results.BadRequest("Invalid or finished session.");
    if (req.Row != session.ActiveRow) return Results.BadRequest("Invalid row.");

    var gridData = JsonSerializer.Deserialize<string[][]>(session.GridData);
    bool isCore = gridData[req.Row][req.Col] == "core";

    if (!isCore)
    {
        session.CurrentWin = session.BetAmount * (decimal)MULTIPLIERS[session.ActiveRow];
        session.ActiveRow++;
        bool isWinTop = session.ActiveRow == 10;
        if(isWinTop) {
            session.IsFinished = true;
        }
        await db.SaveChangesAsync();
        await hubContext.Clients.Group(session.Id.ToString()).SendAsync("ReceiveActiveRow", session.ActiveRow);
        
        return Results.Ok(new { 
            status = isWinTop ? "cashed_out" : "won", 
            currentWin = session.CurrentWin, 
            activeRow = session.ActiveRow 
        });
    }
    else
    {
        session.IsFinished = true;
        await db.SaveChangesAsync();
        // Return full grid so client sees where cores were
        return Results.Ok(new { status = "lost", gridData });
    }
});

app.MapPost("/api/game/cashout", async ([FromBody] CashoutRequest req, AppDbContext db) => {
    var session = await db.GameSessions.FindAsync(req.SessionId);
    if (session == null || session.IsFinished) return Results.BadRequest("Invalid session.");
    
    session.IsFinished = true;
    await db.SaveChangesAsync();
    var gridData = JsonSerializer.Deserialize<string[][]>(session.GridData);
    return Results.Ok(new { status = "cashed_out", currentWin = session.CurrentWin, gridData });
});

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}
app.Run();

public class StartGameRequest { public decimal BetAmount { get; set; } public string? PlayerId { get; set; } }
public class PlayRequest { public Guid SessionId { get; set; } public int Row { get; set; } public int Col { get; set; } }
public class CashoutRequest { public Guid SessionId { get; set; } }
