/**
 * Función para validar y extraer el token de autorización de los encabezados.
 *
 * @param {Object} header - Objeto que contiene los encabezados de la solicitud.
 * @param {string} header.authorization - Encabezado de autorización que contiene el token.
 * @returns {string} Token extraído de los encabezados de autorización.
 * @throws {Error} Si no se proporciona el token o el formato del token es inválido.
 */
function validateToken(header) {
  /**
   * Token de autorización.
   *
   * @typedef {string} AuthorizationToken
   */

  if (!header["authorization"]) {
    console.log("3. No hay token", header);
    throw new Error("Token not provided");
  }

  const [bearer, token] = header["authorization"].split(" ");

  if (bearer !== "Bearer") {
    console.log("4. No hay token", token);
    throw new Error("Token format invalid");
  }

  return token;
}

module.exports = validateToken;
