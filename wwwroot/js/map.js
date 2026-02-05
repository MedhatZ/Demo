var map;
var marker;
var connection;
var currentLat = 30.0444;
var currentLng = 31.2357;

window.initMap = function () {
    map = L.map('map').setView([currentLat, currentLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    connection = new signalR.HubConnectionBuilder()
        .withUrl("/locationHub")
        .build();

    connection.on("ReceiveLocation", function (lat, lng) {
        currentLat = lat;
        currentLng = lng;

        if (marker) {
            map.removeLayer(marker);
        }

        marker = L.marker([lat, lng]).addTo(map);
        map.setView([lat, lng], 15);
    });

    connection.start();
};

window.sendLocation = function () {
    if (!connection) return;

    navigator.geolocation.getCurrentPosition(function (position) {
        connection.invoke("SendLocation",
            position.coords.latitude,
            position.coords.longitude);
    });
};

window.fakeMove = function () {
    if (!connection) return;

    // Õ—ﬂ… √ﬂ»— ÊÊ«÷Õ…
    currentLat += (Math.random() - 0.5) / 100;
    currentLng += (Math.random() - 0.5) / 100;

    connection.invoke("SendLocation", currentLat, currentLng);
};

