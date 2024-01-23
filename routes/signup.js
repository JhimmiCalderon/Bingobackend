const express = require("express");
const User = require("../schema/user");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

/**
 * Ruta para crear un nuevo usuario.
 * @route POST /signup
 * @param {Object} req.body - Datos del usuario a crear.
 * @param {String} req.body.username - Nombre de usuario del nuevo usuario (requerido).
 * @param {String} req.body.password - Contraseña del nuevo usuario (requerido).
 * @param {String} req.body.name - Nombre del nuevo usuario (requerido).
 * @returns {JSON} Respuesta JSON indicando el resultado de la operación.
 * @throws {Error} Si hay un error al procesar la solicitud.
 */
router.post("/", async function (req, res, next) {
  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    return res.status(409).json(
      jsonResponse(409, {
        error: "username, password, and name are required",
      })
    );
  }

  try {
    const user = new User();
    const userExists = await user.usernameExists(username);

    if (userExists) {
      return res.status(409).json(
        jsonResponse(409, {
          error: "Usuario ya existe",
        })
      );
    } else {
      const newUser = new User({ username, password, name });

      newUser.save();

      res.json(
        jsonResponse(200, {
          message: "Usuario Creado",
        })
      );
    }
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creating user",
      })
    );
  }
});

module.exports = router;
