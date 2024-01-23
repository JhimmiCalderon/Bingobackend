/**
 * Esquema para representar una partida en el juego de bingo.
 * @typedef {Object} Match
 * @property {Object} id - Identificador único de la partida.
 * @property {String} username - Nombre del usuario en la partida (requerido).
 * @property {Boolean} winner - Indica si el usuario es ganador o no (predeterminado: true).
 * @property {Array} card - Cartones del bingo asociados al usuario.
 * @property {String} card.column - Columna del número en el cartón (requerido).
 * @property {Number} card.number - Número en el cartón (requerido).
 */

/**
 * Modelo de Mongoose para el esquema de la partida.
 * @typedef {Model<Match>} MatchModel
 */

const mongoose = require("mongoose");

/**
 * Esquema Mongoose para representar una partida en el juego de bingo.
 * @type {mongoose.Schema<Match>}
 */
const MatchSchema = new mongoose.Schema({
  id: { type: Object },
  username: { type: String, required: true },
  winner: { type: Boolean, default: true }, // Valor predeterminado es true
  card: [
    {
      column: { type: String, required: true },
      number: { type: Number, required: true },
    },
  ],
});

/**
 * Modelo de Mongoose para el esquema de la partida.
 * @type {mongoose.Model<Match>}
 */
const MatchModel = mongoose.model("Match", MatchSchema);

module.exports = MatchModel;
