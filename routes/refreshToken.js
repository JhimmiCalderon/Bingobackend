const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const log = require("../lib/trace");
const { verifyRefreshToken } = require("../auth/verify");
const { generateAccessToken } = require("../auth/sign");
const getUserInfo = require("../lib/getUserInfo");
const Token = require("../schema/token");
const router = express.Router();

/**
 * Ruta para renovar un token de acceso utilizando un token de actualización.
 * @route POST /bingo/refresh-token
 * @param {Object} req.body - Datos de la solicitud.
 * @param {String} req.body.refreshToken - Token de actualización a utilizar para la renovación (requerido).
 * @returns {JSON} Respuesta JSON con el nuevo token de acceso.
 * @throws {Error} Si hay un error al procesar la solicitud.
 */
router.post("/", async function (req, res, next) {
  log.info("POST /bingo/refresh-token");
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    console.log("No se proporcionó token de actualización", refreshToken);
    return res
      .status(401)
      .json({ error: "Token de actualización no proporcionado" });
  }

  try {
    const tokenDocument = await Token.findOne({ token: refreshToken });

    if (!tokenDocument) {
      return res.status(403).json({ error: "Token de actualización inválido" });
    }

    const payload = verifyRefreshToken(tokenDocument.token);
    const accessToken = generateAccessToken(getUserInfo(payload.user));

    // Enviar el nuevo token de acceso en formato JSON
    res.json(jsonResponse(200, { accessToken }));
  } catch (error) {
    return res.status(403).json({ error: "Token de actualización inválido" });
  }
});

module.exports = router;
