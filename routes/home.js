const express = require("express");
const Lobby = require("../schema/lobby");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

/**
 * Ruta para crear un lobby.
 * @route POST /bingo/lobby
 * @param {Object} req.body - Datos de la solicitud.
 * @param {String} req.body.roomId - Identificador único del lobby (requerido).
 * @param {String} req.body.username - Nombre de usuario asociado al lobby (requerido).
 * @param {String} req.body.status - Estado del lobby (requerido).
 * @param {Boolean} req.body.winner - Indicador de ganador del lobby (requerido).
 * @returns {JSON} Respuesta JSON indicando el resultado de la operación.
 * @throws {Error} Si hay un error al procesar la solicitud.
 */
router.post("/", async function (req, res, next) {
  const { roomId, username, status, winner } = req.body;

  if (!roomId || !username || !status || !winner) {
    return res.status(409).json(
      jsonResponse(409, {
        error: "Datos incompletos para crear un lobby",
      })
    );
  }

  try {
    const lobby = new Lobby({ roomId, username, status, winner });
    await lobby.save();

    res.json(
      jsonResponse(200, {
        message: "Lobby creado exitosamente",
      })
    );
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creando el lobby",
      })
    );
  }
});

module.exports = router;
