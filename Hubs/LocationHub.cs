using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace DriverLiveMapDemo.Hubs
{
    public class LocationHub : Hub
    {
        public async Task SendLocation(double lat, double lng)
        {
            await Clients.All.SendAsync("ReceiveLocation", lat, lng);
        }
    }
}
