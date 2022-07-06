const mongoose = require("mongoose");
const ChargerLocationSchema = new mongoose.Schema({});

module.exports = mongoose.models.ChargerLocation
  ? mongoose.models.ChargerLocation
  : mongoose.model("ChargerLocation", ChargerLocationSchema);
