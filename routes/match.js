const express = require("express");
const Match = require("../schema/match");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

/**
 * Ruta para crear una nueva partida de bingo.
 * @route POST /bingo/match
 * @param {Object} req.body - Datos de la solicitud.
 * @param {String} req.body.username - Nombre de usuario asociado a la partida (requerido).
 * @param {Boolean} req.body.winner - Indicador de ganador de la partida (requerido).
 * @param {Array} req.body.card - Tarjeta de bingo asociada a la partida.
 * @param {Object} req.body.id - Identificador único asociado a la partida.
 * @returns {JSON} Respuesta JSON indicando el resultado de la operación.
 * @throws {Error} Si hay un error al procesar la solicitud.
 */
router.post("/", async function (req, res, next) {
  const { username, winner, card, id } = req.body;

  if (!username || !winner) {
    return res.status(409).json(
      jsonResponse(409, {
        error: "Datos incompletos para crear una Tarjeta de BINGO",
        incompleteData: { username, winner, card, id },
      })
    );
  }

  try {
    const match = new Match({ username, winner, card, id });
    await match.save();

    res.json(
      jsonResponse(200, {
        message: "Bingo creado exitosamente",
      })
    );
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creando el bingo",
      })
    );
  }
});

module.exports = router;
