const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * Función principal para establecer la conexión a la base de datos MongoDB.
 * @async
 * @function
 */
async function conectarMongoDB() {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
}

// Iniciar la conexión a MongoDB
conectarMongoDB();

// Rutas
app.use("/bingo/login", require("./routes/login"));
app.use("/bingo/home", require("./routes/home"));
app.use("/bingo/lobby", require("./routes/lobby"));
app.use("/bingo/match", require("./routes/match"));
app.use("/bingo/refres-token", require("./routes/refreshToken"));
app.use("/bingo/signup", require("./routes/signup"));

/**
 * Ruta principal que devuelve un mensaje de bienvenida.
 * @route GET /
 * @returns {string} Mensaje de bienvenida.
 */
app.get("/", (req, res) => {
  res.send("Bienvenido");
});

/**
 * Iniciar el servidor Express en el puerto especificado.
 * @function
 * @listens port
 */
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
