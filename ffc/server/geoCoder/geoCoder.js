Meteor.methods({
    'getGeoCodeFromAddresses': function(addy){
        var geo = new GeoCoder({
          httpAdapter: "https",
          apiKey: Meteor.settings.googleGeoCodeApiKey
        });
        var result = geo.geocode(addy);
        console.log(result);
    }
});
