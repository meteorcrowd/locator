L.Icon.Default.imagePath = 'images';
Template.map.rendered = function () {
    var map = L.map('map');
    // create the tile layer with correct attribution
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

    L.tileLayer(osmUrl, {
        attribution: osmAttrib,
        maxZoom: 18
    }).addTo(map);
    // add a marker in the given location, attach some popup content to it and open the popup
    L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
    .openPopup();

    map.locate({setView: true, maxZoom: 16, watch: true});

    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(map);
    }

    map.on('locationfound', onLocationFound);
}


