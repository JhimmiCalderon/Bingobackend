/**
 * Crea un objeto de respuesta JSON estandarizado para enviar al cliente.
 *
 * @param {number} statuscode - Código de estado HTTP para la respuesta.
 * @param {Object} body - Cuerpo de la respuesta JSON.
 * @returns {Object} Objeto de respuesta JSON estandarizado.
 * @function
 */
exports.jsonResponse = function (statuscode, body) {
  /**
   * Objeto de respuesta JSON estandarizado.
   *
   * @typedef {Object} StandardJSONResponse
   * @property {number} statuscode - Código de estado HTTP para la respuesta.
   * @property {Object} body - Cuerpo de la respuesta JSON.
   */

  // Devolver un objeto de respuesta JSON estandarizado
  return {
    statuscode,
    body: body,
  };
};
