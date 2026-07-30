using Microsoft.AspNetCore.SignalR;

namespace GameBackend.Hubs
{
    public class GameHub : Hub
    {
        // The Game App will call this to register itself as the player
        public async Task JoinSession(string accountId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, accountId);
            await Clients.Group(accountId).SendAsync("UserJoined", Context.ConnectionId);
        }

        // The Predictor App will call this to subscribe to the session updates
        public async Task SubscribeToSession(string accountId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, accountId);
            await Clients.Caller.SendAsync("Subscribed", accountId);
        }
    }
}
