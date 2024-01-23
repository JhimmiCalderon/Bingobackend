const express = require("express");
const router = express.Router();
const Token = require("../schema/token");
const validateToken = require("../auth/validateToken");

/**
 * Ruta para cerrar sesión y eliminar el token de actualización asociado.
 * @route DELETE /bingo/logout
 * @param {Object} req.headers - Cabeceras de la solicitud que contienen el token de autorización.
 * @returns {JSON} Respuesta JSON indicando el éxito de la operación.
 * @throws {Error} Si hay un error al procesar la solicitud.
 */
router.delete("/", async function (req, res, next) {
  try {
    // Validar el token de autorización en las cabeceras
    const refreshToken = validateToken(req.headers);

    // Buscar y eliminar el token de actualización en la base de datos
    await Token.findOneAndRemove({ token: refreshToken });

    // Enviar una respuesta JSON indicando éxito
    res.json({
      success: "Token removed",
    });
  } catch (ex) {
    // Manejar errores y pasarlos al siguiente middleware
    return next(new Error("Error logging out the user " + ex.message));
  }
});

module.exports = router;
