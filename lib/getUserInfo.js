/**
 * Obtiene la información relevante de un usuario.
 *
 * @param {Object} user - Objeto que representa la información del usuario.
 * @param {String} user.username - Nombre de usuario del usuario.
 * @param {String} user.name - Nombre completo del usuario.
 * @param {String} user.id - Identificador único del usuario (opcional).
 * @returns {Object} Objeto con la información del usuario procesada.
 * @function
 * @throws {Error} Si el objeto de usuario no tiene las propiedades esperadas.
 */
function getUserInfo(user) {
  // Validar si el objeto de usuario tiene las propiedades esperadas
  if (!user || !user.username || !user.name) {
    throw new Error('El objeto de usuario debe tener propiedades "username" y "name".');
  }

  // Devolver un objeto con la información procesada del usuario
  return {
    username: user.username,
    name: user.name,
    id: user.id || user._id,
  };
}

module.exports = getUserInfo;
