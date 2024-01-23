const router = require("express").Router();

/**
 * Ruta para obtener la página del lobby.
 * @route GET /bingo/lobby
 * @returns {String} Respuesta con el contenido de la página del lobby.
 */
router.get("/", (req, res) => {
    res.send("lobby");
});

module.exports = router;
