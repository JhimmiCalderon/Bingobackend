const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Función para verificar un token de acceso utilizando jsonwebtoken.
 *
 * @param {string} token - Token de acceso a verificar.
 * @returns {Object} Objeto decodificado que contiene la información del usuario.
 * @throws {Error} Si el token de acceso es inválido.
 */
function verifyAccessToken(token) {
  /**
   * Objeto decodificado del token de acceso.
   *
   * @typedef {Object} DecodedAccessToken
   * @property {Object} user - Información del usuario contenida en el token.
   */

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return decoded;
}

/**
 * Función para verificar un token de actualización utilizando jsonwebtoken.
 *
 * @param {string} token - Token de actualización a verificar.
 * @returns {Object} Objeto decodificado que contiene la información del usuario.
 * @throws {Error} Si el token de actualización es inválido.
 */
function verifyRefreshToken(token) {
  /**
   * Objeto decodificado del token de actualización.
   *
   * @typedef {Object} DecodedRefreshToken
   * @property {Object} user - Información del usuario contenida en el token.
   */

  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  return decoded;
}

module.exports = { verifyAccessToken, verifyRefreshToken };
