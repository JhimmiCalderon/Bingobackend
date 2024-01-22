
const Mongoose = require("mongoose");

const MatchSchema = new Mongoose.Schema({
  id: { type: Object },
  username: { type: String, required: true },
  winner: { type: Boolean, default: false },
 
 
});
  // Cambiado de null a []


module.exports = Mongoose.model("Match", MatchSchema);
