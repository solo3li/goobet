using Microsoft.AspNetCore.SignalR;

namespace GameBackend.Hubs
{
    public class GameHub : Hub
    {
        // The Game App will call this to register itself as the player
        public async Task JoinSession(string sessionId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);
            // We can optionally tell the group someone joined
            await Clients.Group(sessionId).SendAsync("UserJoined", Context.ConnectionId);
        }

        // The Predictor App will call this to subscribe to the session updates
        public async Task SubscribeToSession(string sessionId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);
            await Clients.Caller.SendAsync("Subscribed", sessionId);
        }
    }
}
