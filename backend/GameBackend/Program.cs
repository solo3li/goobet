using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using GameBackend.Data;
using GameBackend.Hubs;
using GameBackend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy.AllowAnyHeader().AllowAnyMethod().SetIsOriginAllowed(_ => true).AllowCredentials();
    });
});

// ─── JWT Authentication ───────────────────────────────────────────
var jwtKey    = builder.Configuration["Jwt:Key"]      ?? "GooBet_SuperSecretKey_ChangeInProduction_AtLeast32Chars!";
var jwtIssuer = builder.Configuration["Jwt:Issuer"]   ?? "GooBetAPI";
var jwtAud    = builder.Configuration["Jwt:Audience"] ?? "GooBetApp";
var jwtExpiry = int.Parse(builder.Configuration["Jwt:ExpiryHours"] ?? "24");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters {
            ValidateIssuer           = true,
            ValidateAudience         = true,
            ValidateLifetime         = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer              = jwtIssuer,
            ValidAudience            = jwtAud,
            IssuerSigningKey         = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ClockSkew                = TimeSpan.Zero
        };
        // Allow SignalR to use token from query string
        options.Events = new JwtBearerEvents {
            OnMessageReceived = context => {
                var accessToken = context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/gamehub")) {
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
    });
builder.Services.AddAuthorization();
// ─────────────────────────────────────────────────────────────────

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
app.UseAuthentication();
app.UseAuthorization();
app.MapHub<GameHub>("/gamehub");

// ─── Helper: Generate JWT Token ──────────────────────────────────
string GenerateJwtToken(string accountId) {
    var key         = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
    var claims      = new[] { new Claim(ClaimTypes.NameIdentifier, accountId), new Claim("accountId", accountId) };
    var token       = new JwtSecurityToken(
        issuer: jwtIssuer,
        audience: jwtAud,
        claims: claims,
        expires: DateTime.UtcNow.AddHours(jwtExpiry),
        signingCredentials: credentials
    );
    return new JwtSecurityTokenHandler().WriteToken(token);
}
// ─────────────────────────────────────────────────────────────────

double[] MULTIPLIERS    = { 1.23, 1.54, 1.93, 2.41, 4.02, 6.71, 11.18, 27.97, 69.93, 349.68 };
int[]    CORES_PER_ROW  = { 1, 1, 1, 1, 2, 2, 2, 3, 3, 4 };

// ─── Auth: Login / Register ───────────────────────────────────────
app.MapPost("/api/auth/login", async ([FromBody] AuthRequest req, AppDbContext db) => {
    var user = await db.Users.FindAsync(req.AccountId);
    if (user == null) {
        // Auto-create user with hashed password
        user = new User {
            AccountId    = req.AccountId,
            Password     = BCrypt.Net.BCrypt.HashPassword(req.Password),
            Balance      = 1000.0m
        };
        db.Users.Add(user);
        await db.SaveChangesAsync();
    } else {
        // Verify hashed password (support plain-text migration on first login)
        bool valid;
        if (user.Password.StartsWith("$2")) {
            valid = BCrypt.Net.BCrypt.Verify(req.Password, user.Password);
        } else {
            // Legacy plain-text password — verify then upgrade to BCrypt
            valid = user.Password == req.Password;
            if (valid) {
                user.Password = BCrypt.Net.BCrypt.HashPassword(req.Password);
                await db.SaveChangesAsync();
            }
        }
        if (!valid) return Results.BadRequest("كلمة المرور غير صحيحة");
    }

    var token = GenerateJwtToken(user.AccountId);
    return Results.Ok(new { accountId = user.AccountId, balance = user.Balance, token });
});

// ─── Game: Start ─────────────────────────────────────────────────
app.MapPost("/api/game/start", [Authorize] async (
    [FromBody] StartGameRequest req,
    AppDbContext db,
    IHubContext<GameHub> hubContext,
    ClaimsPrincipal principal) =>
{
    var callerId = principal.FindFirstValue("accountId");
    if (callerId != req.PlayerId) return Results.Forbid();

    var user = await db.Users.FindAsync(req.PlayerId);
    if (user == null || user.Balance < req.BetAmount) return Results.BadRequest("رصيد غير كافٍ أو المستخدم غير موجود");

    user.Balance -= req.BetAmount;

    var data = new string[10][];
    for (int r = 0; r < 10; r++) {
        var rowCores = new string[5];
        for (int i = 0; i < 5; i++) rowCores[i] = "apple";
        int numCores = CORES_PER_ROW[r];
        var indices = new List<int> { 0, 1, 2, 3, 4 };
        for (int i = 0; i < numCores; i++) {
            int randIdx = Random.Shared.Next(indices.Count);
            int pos     = indices[randIdx];
            indices.RemoveAt(randIdx);
            rowCores[pos] = "core";
        }
        data[r] = rowCores;
    }

    var session = new GameSession {
        BetAmount = req.BetAmount,
        GridData  = JsonSerializer.Serialize(data),
        PlayerId  = req.PlayerId ?? string.Empty
    };
    db.GameSessions.Add(session);
    await db.SaveChangesAsync();

    var groupId = req.PlayerId ?? string.Empty;
    await hubContext.Clients.Group(groupId).SendAsync("ReceiveGameGrid", data);
    await hubContext.Clients.Group(groupId).SendAsync("ReceiveActiveRow", 0);

    return Results.Ok(new { sessionId = session.Id, activeRow = 0, newBalance = user.Balance });
});

// ─── Game: Play ───────────────────────────────────────────────────
app.MapPost("/api/game/play", [Authorize] async (
    [FromBody] PlayRequest req,
    AppDbContext db,
    IHubContext<GameHub> hubContext,
    ClaimsPrincipal principal) =>
{
    var session = await db.GameSessions.FindAsync(req.SessionId);
    if (session == null || session.IsFinished) return Results.BadRequest("جلسة غير صالحة أو منتهية");

    var callerId = principal.FindFirstValue("accountId");
    if (callerId != session.PlayerId) return Results.Forbid();

    if (req.Row != session.ActiveRow) return Results.BadRequest("صف غير صالح");

    var user     = await db.Users.FindAsync(session.PlayerId);
    var gridData = JsonSerializer.Deserialize<string[][]>(session.GridData)!;
    bool isCore  = gridData[req.Row][req.Col] == "core";

    if (!isCore) {
        session.CurrentWin = session.BetAmount * (decimal)MULTIPLIERS[session.ActiveRow];
        session.ActiveRow++;
        bool isWinTop = session.ActiveRow == 10;
        if (isWinTop) {
            session.IsFinished = true;
            if (user != null) user.Balance += session.CurrentWin;
        }
        await db.SaveChangesAsync();
        await hubContext.Clients.Group(session.PlayerId).SendAsync("ReceiveActiveRow", session.ActiveRow);

        return Results.Ok(new {
            status     = isWinTop ? "cashed_out" : "won",
            currentWin = session.CurrentWin,
            activeRow  = session.ActiveRow,
            gridData   = isWinTop ? gridData : null,
            newBalance = user?.Balance
        });
    } else {
        session.IsFinished = true;
        await db.SaveChangesAsync();
        return Results.Ok(new { status = "lost", gridData, newBalance = user?.Balance });
    }
});

// ─── Game: Cashout ────────────────────────────────────────────────
app.MapPost("/api/game/cashout", [Authorize] async (
    [FromBody] CashoutRequest req,
    AppDbContext db,
    ClaimsPrincipal principal) =>
{
    var session = await db.GameSessions.FindAsync(req.SessionId);
    if (session == null || session.IsFinished) return Results.BadRequest("جلسة غير صالحة");

    var callerId = principal.FindFirstValue("accountId");
    if (callerId != session.PlayerId) return Results.Forbid();

    var user = await db.Users.FindAsync(session.PlayerId);
    session.IsFinished = true;
    if (user != null) user.Balance += session.CurrentWin;
    await db.SaveChangesAsync();

    var gridData = JsonSerializer.Deserialize<string[][]>(session.GridData);
    return Results.Ok(new { status = "cashed_out", currentWin = session.CurrentWin, gridData, newBalance = user?.Balance });
});

// ─── DB Init ──────────────────────────────────────────────────────
using (var scope = app.Services.CreateScope()) {
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}
app.Run();

// ─── Request Models ───────────────────────────────────────────────
public class StartGameRequest { public decimal BetAmount { get; set; } public string? PlayerId { get; set; } }
public class PlayRequest      { public Guid SessionId { get; set; } public int Row { get; set; } public int Col { get; set; } }
public class CashoutRequest   { public Guid SessionId { get; set; } }
public class AuthRequest      { public string AccountId { get; set; } = string.Empty; public string Password { get; set; } = string.Empty; }
