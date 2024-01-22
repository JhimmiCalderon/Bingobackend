const express = require("express");
const Match = require("../schema/match");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

router.post("/", async function (req, res, next) {
  const { username, winner, id} = req.body;

  if (!username || !winner  ) {
    return res.status(409).json(
      jsonResponse(409, {
        error: "Datos incompletos para crear una Tarjeta de BINGO",
        incompleteData: { username, winner,id},
      })
    );
  }

  try {
    const match = new Match({ username, winner}); // Cambiado a 'match'
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
 