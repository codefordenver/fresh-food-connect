[![Stories in Ready](https://badge.waffle.io/codefordenver/fresh-food-connect.png?label=ready&title=Ready)](https://waffle.io/codefordenver/fresh-food-connect)
# fresh-food-connect


## Meteor

this is an example of how to set up the apiConfig.js file
make sure that in your local repos .git/info/exclude it has the following:
ffc/settings.json
this will exclude this file from git commits and will protect your api key
make a file called settings.js in the main project folder: ffc
  in ffc/settings.json put
{
 "googleGeoCodeApiKey" : "123yourApiKey123"
}

googleGeoCodeApiKey will be reffrenced elsewhere in the server code

to run the server locally with these setting move to the project in your command line and type:
meteor --settings settings.json
