L.Icon.Default.imagePath = 'images';
Template.map.rendered = function () {
    var map = L.map('map');
    // create the tile layer with correct attribution
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    markers = new L.LayerGroup().addTo(map);
    L.tileLayer(osmUrl, {
        attribution: osmAttrib,
        maxZoom: 18
    }).addTo(map);

    map.locate({setView: true, maxZoom: 16, watch: true});

    function onLocationFound(e) {
        markers.clearLayers();
        var radius = e.accuracy / 2;
        var marker = L.marker(e.latlng).addTo(markers);
        var circle = L.circle(e.latlng, radius).addTo(markers);
    }

    map.on('locationfound', onLocationFound);



}


