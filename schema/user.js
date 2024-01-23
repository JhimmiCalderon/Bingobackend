/**
 * Esquema para representar un usuario en el juego de bingo.
 * @typedef {Object} User
 * @property {Object} id - Identificador único del usuario.
 * @property {String} username - Nombre de usuario (requerido y único).
 * @property {String} password - Contraseña del usuario (requerida).
 * @property {String} name - Nombre del usuario (requerido).
 */

/**
 * Modelo de Mongoose para el esquema del usuario.
 * @typedef {Model<User>} UserModel
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../auth/sign");
const getUserInfo = require("../lib/getUserInfo");
const Token = require("../schema/token");

/**
 * Esquema Mongoose para representar un usuario en el juego de bingo.
 * @type {mongoose.Schema<User>}
 */
const UserSchema = new mongoose.Schema({
  id: { type: Object },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

/**
 * Middleware para cifrar la contraseña antes de guardarla en la base de datos.
 */
UserSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    const document = this;

    bcrypt.hash(document.password, 10, (err, hash) => {
      if (err) {
        next(err);
      } else {
        document.password = hash;
        next();
      }
    });
  } else {
    next();
  }
});

/**
 * Método del esquema para verificar si un nombre de usuario ya existe en la base de datos.
 * @async
 * @function
 * @param {String} username - Nombre de usuario a verificar.
 * @returns {boolean} True si el nombre de usuario ya existe, false en caso contrario.
 */
UserSchema.methods.usernameExists = async function (username) {
  const result = await mongoose.model("User").find({ username: username });
  return result.length > 0;
};

/**
 * Método del esquema para verificar si una contraseña es correcta.
 * @async
 * @function
 * @param {String} password - Contraseña a verificar.
 * @param {String} hash - Hash de la contraseña almacenada en la base de datos.
 * @returns {boolean} True si la contraseña es correcta, false en caso contrario.
 */
UserSchema.methods.isCorrectPassword = async function (password, hash) {
  const same = await bcrypt.compare(password, hash);
  return same;
};

/**
 * Método del esquema para crear un token de acceso para el usuario.
 * @function
 * @returns {String} Token de acceso generado.
 */
UserSchema.methods.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};

/**
 * Método del esquema para crear un token de actualización para el usuario.
 * @async
 * @function
 * @returns {String} Token de actualización generado.
 */
UserSchema.methods.createRefreshToken = async function () {
  const refreshToken = generateRefreshToken(getUserInfo(this));

  console.error("refreshToken", refreshToken);

  try {
    await new Token({ token: refreshToken }).save();
    console.log("Token saved", refreshToken);
    return refreshToken;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating token");
  }
};

/**
 * Modelo de Mongoose para el esquema del usuario.
 * @type {mongoose.Model<User>}
 */
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
