PickUpAddressesSchema = new SimpleSchema({
  address: {
    type: String,
    label: "Your address"
  },
  latitude: {
    type: Number,
    decimal: true,
    label: "your lataitude",
    optional: true
  },
  longitude: {
    type: Number,
    decimal: true,
    label: "your longitude",
    optional: true
  },
  country: {
    type: String,
    label: "your country",
    optional: true
  },
  city: {
    type: String,
    label: "your city",
    optional: true
  },
  state: {
    type: String,
    label: "your state",
    optional: true
  },
  stateCode: {
    type: String,
    label: "your states two letter abbreviation",
    optional: true
  },
  zipCode: {
    type: String,
    label: "your zip code",
    optional: true
  },
  streetName: {
    type: String,
    label: "your streets name",
    optional: true
  },
  streetNumber: {
    type: String,
    label: "your street number",
    optional: true
  },
  countryCode: {
    type: String,
    label: "your countrys abbreviation",
    optional: true
  },
  note: {
    type: String,
    label: 'Anything that the delivery person should know, apt# etc...',
    min: 1,
    max: 200,
    optional: true
  }
});

PickUpAddresses = new Mongo.Collection('pickUpAddresses');

PickUpAddresses.attachSchema(PickUpAddressesSchema);
