'use strict';

// Set icon directory
L.Icon.Default.imagePath = 'images';

Template.map.rendered = function () {
    // Create map
    var map = L.map('map');

    // Add map markers layer group to map
    markers = new L.LayerGroup().addTo(map);

    // create attribution
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

    // Add attribution to map
    L.tileLayer(osmUrl, {
        attribution: osmAttrib,
        maxZoom: 18
    }).addTo(map);

    // Start user geolocation
    map.locate({setView: true, maxZoom: 16, watch: true});

    // Create function to add/update map markers
    var updateMapMarkers = function () {
        // Get the people list
        var peopleList =Meteor.users.find().fetch();

        // Clear the existing markers
        markers.clearLayers();

        // Add all players to the map
        peopleList.forEach( function (person) {
            // Get user geolocation values
            var longitude = person.profile.geolocation.longitude;
            var latitude =  person.profile.geolocation.latitude;
            var accuracy =  person.profile.geolocation.accuracy;

            // Add marker for person location
            var marker = L.marker([latitude, longitude]).addTo(markers);

            // Add accuracy indicator (circle)
            var radius = accuracy / 2;
            var circle = L.circle([latitude, longitude], radius).addTo(markers);
        });
    }

    // actions on each geolocation
    function onLocationFound(location) {
        // set user geolocation variables
        var longitude = location.longitude;
        var latitude = location.latitude;
        var accuracy = location.accuracy;

        //  add geolocation to user profile
        Meteor.call('updateMyLocation', longitude, latitude, accuracy);

        // Add/update map markers
        updateMapMarkers();
    }

    // Set user geolocation each update
    map.on('locationfound', onLocationFound);
}
