PickUpAddressesSchema = new SimpleSchema({
  address:{
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
  note: {
    type: String,
    label: 'Anything that the delivery person should know',
    min: 1,
    max: 200,
    optional: true
  }
});

PickUpAddresses = new Mongo.Collection('pickUpAddresses');

PickUpAddresses.attachSchema(PickUpAddressesSchema);
