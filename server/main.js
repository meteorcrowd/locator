Meteor.methods({
    'updateMyLocation': function (longitude, latitude, accuracy) {
        // Create geolocation object
        var geolocation = {
                                        "latitude": latitude,
                                        "longitude": longitude,
                                        "accuracy": accuracy
                                    };
        // Add geolocation to user profile
        Meteor.users.update(
            { _id: Meteor.userId() },
            {
                $set: { "profile.geolocation": geolocation }
            }
        );
    }
});
