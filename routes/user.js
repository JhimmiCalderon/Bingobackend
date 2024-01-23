const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const log = require("../lib/trace");
const router = express.Router();

/**
 * Ruta para obtener información del usuario actual.
 * @route GET /user
 * @returns {JSON} Información del usuario en formato JSON.
 * @throws {Error} Si hay un error al procesar la solicitud.
 */
router.get("/", async function (req, res, next) {
  try {
    log.info("user", req.user);

    // Enviar la información del usuario en formato JSON
    res.json(jsonResponse(200, req.user));
  } catch (error) {
    // Manejar errores y pasarlos al siguiente middleware
    next(error);
  }
});

module.exports = router;
