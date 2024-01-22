const express = require("express");
const Lobby = require("../schema/lobby");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

router.post("/", async function (req, res, next) {
  const { roomId, username, status, winner} = req.body;

  if (!roomId || !username || !status || !winner) {

    return res.status(409).json(
      jsonResponse(409, {
        error: "Datos incompletos para crear un lobby",
     
      })
    );
  }
  
  try {
    const lobby = new Lobby({ roomId, username, status, winner});
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
