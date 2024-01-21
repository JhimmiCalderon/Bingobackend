const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const getUserInfo = require("../lib/getUserInfo");


const LobbySchema = new Mongoose.Schema({
  id: { type: Object },
  roomId: { type: String, required: true },
  username: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = Mongoose.model("Lobby", LobbySchema);
