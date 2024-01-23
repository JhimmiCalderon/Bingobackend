/**
 * Esquema para representar un token en el juego de bingo.
 * @typedef {Object} Token
 * @property {Object} id - Identificador único del token.
 * @property {String} token - Valor del token (requerido).
 */

/**
 * Modelo de Mongoose para el esquema del token.
 * @typedef {Model<Token>} TokenModel
 */

const mongoose = require("mongoose");

/**
 * Esquema Mongoose para representar un token en el juego de bingo.
 * @type {mongoose.Schema<Token>}
 */
const TokenSchema = new mongoose.Schema({
  id: { type: Object },
  token: { type: String, required: true },
});

/**
 * Modelo de Mongoose para el esquema del token.
 * @type {mongoose.Model<Token>}
 */
const TokenModel = mongoose.model("Token", TokenSchema);

module.exports = TokenModel;
