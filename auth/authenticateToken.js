const log = require("../lib/trace");
const validateToken = require("./validateToken");
const { verifyAccessToken } = require("./verify");

/**
 * Middleware para autenticar un token de acceso.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware.
 * @throws {Object} Error de autenticación si el token es inválido o no proporcionado.
 */
function authenticateToken(req, res, next) {
  let token = null;
  log.info("headers", req.headers);

  try {
    // Validar y obtener el token del encabezado de la solicitud
    token = validateToken(req.headers);
  } catch (error) {
    log.error(error.message);
    // Manejar errores relacionados con la falta o el formato incorrecto del token
    if (error.message === "Token not provided") {
      return res.status(401).json({ error: "Token no proporcionado" });
    }
    if (error.message === "Token format invalid") {
      return res.status(401).json({ error: "Token mal formado" });
    }
  }

  try {
    // Verificar y decodificar el token de acceso
    const decoded = verifyAccessToken(token);
    req.user = { ...decoded.user };
    next();
  } catch (err) {
    console.log("Token inválido", token, err);
    // Manejar errores relacionados con la invalidez del token
    return res.status(403).json({ error: "Token inválido" });
  }
}

module.exports = authenticateToken;
