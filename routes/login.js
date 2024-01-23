const express = require("express");
const User = require("../schema/user");
const { jsonResponse } = require("../lib/jsonResponse");
const getUserInfo = require("../lib/getUserInfo");
const router = express.Router();

/**
 * Ruta para autenticar a un usuario y generar tokens de acceso y actualización.
 * @route POST /bingo/login
 * @param {Object} req.body - Datos de la solicitud.
 * @param {String} req.body.username - Nombre de usuario del usuario a autenticar (requerido).
 * @param {String} req.body.password - Contraseña del usuario a autenticar (requerido).
 * @returns {JSON} Respuesta JSON con tokens de acceso y actualización, y la información del usuario autenticado.
 * @throws {Error} Si hay un error al procesar la solicitud.
 */
router.post("/", async function (req, res, next) {
  const { username, password } = req.body;

  try {
    let user = new User();
    const userExists = await user.usernameExists(username);

    if (userExists) {
      user = await User.findOne({ username: username });

      const passwordCorrect = await user.isCorrectPassword(
        password,
        user.password
      );

      if (passwordCorrect) {
        const accessToken = user.createAccessToken();
        const refreshToken = await user.createRefreshToken();

        // Enviar la respuesta JSON con tokens y la información del usuario autenticado
        return res.json(
          jsonResponse(200, {
            accessToken,
            refreshToken,
            user: getUserInfo(user),
          })
        );
      } else {
        // Responder con error 401 si la contraseña es incorrecta
        return res.status(401).json(
          jsonResponse(401, {
            error: "username and/or password incorrect",
          })
        );
      }
    } else {
      // Responder con error 401 si el usuario no existe
      return res.status(401).json(
        jsonResponse(401, {
          error: "username does not exist",
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
