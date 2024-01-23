const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const getUserInfo = require("../lib/getUserInfo");


/**
 * Esquema para representar un lobby en el juego de bingo.
 * @typedef {Object} Lobby
 * @property {Object} id - Identificador único del lobby.
 * @property {String} roomId - Identificador único de la sala del lobby (requerido).
 * @property {String} username - Nombre del usuario en el lobby (requerido).
 * @property {String} status - Estado actual del lobby (requerido).
 * @property {Boolean} winner - Indica si el usuario es ganador o no (predeterminado: false).
 */

/**
 * Modelo de Mongoose para el esquema del lobby.
 * @typedef {Model<Lobby>} LobbyModel
 */

const mongoose = require("mongoose");

/**
 * Esquema Mongoose para representar un lobby en el juego de bingo.
 * @type {mongoose.Schema<Lobby>}
 */
const LobbySchema = new mongoose.Schema({
  id: { type: Object },
  roomId: { type: String, required: true },
  username: { type: String, required: true },
  status: { type: String, required: true },
  winner: { type: Boolean, default: false }, // Valor predeterminado es false
});

/**
 * Modelo de Mongoose para el esquema del lobby.
 * @type {mongoose.Model<Lobby>}
 */
const LobbyModel = mongoose.model("Lobby", LobbySchema);

module.exports = LobbyModel;
