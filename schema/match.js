
const Mongoose = require("mongoose");

const MatchSchema = new Mongoose.Schema({
  id: { type: Object },
  username: { type: String, required: true },
  winner: { type: Boolean, default: true },
  card: [
    {
      column: { type: String, required: true },
      number: { type: Number, required: true }
    }
  ]
 
 
});
  // Cambiado de null a []


module.exports = Mongoose.model("Match", MatchSchema);
