const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Función para firmar un payload y generar un token.
 *
 * @param {Object} payload - Datos que se incluirán en el token.
 * @param {boolean} isAccessToken - Indicador de si se está generando un token de acceso.
 * @returns {string} Token generado.
 */
function sign(payload, isAccessToken) {
  /**
   * Token generado.
   *
   * @typedef {string} GeneratedToken
   */

  console.log("payload", payload);
  return jwt.sign(
    payload,
    isAccessToken
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: 3600,
      algorithm: "HS256",
    }
  );
}

/**
 * Función para generar un token de acceso utilizando jsonwebtoken.
 *
 * @param {Object} user - Datos del usuario que se incluirán en el token.
 * @returns {GeneratedToken} Token de acceso generado.
 */
function generateAccessToken(user) {
  return sign({ user }, true);
}

/**
 * Función para generar un token de actualización utilizando jsonwebtoken.
 *
 * @param {Object} user - Datos del usuario que se incluirán en el token.
 * @returns {GeneratedToken} Token de actualización generado.
 */
function generateRefreshToken(user) {
  return sign({ user }, false);
}

module.exports = { generateAccessToken, generateRefreshToken };
