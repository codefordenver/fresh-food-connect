PickUpAddressesSchema = new SimpleSchema({
  latitude: {
    type: Number,
    decimal: true,
    label: "your lataitude"
  },
  longitude: {
    type: Number,
    decimal: true,
    label: "your longitude"
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
