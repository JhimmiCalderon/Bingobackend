const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require ("mongoose");

require("dotenv").config();

const port = process.env.PORT || 3000;

app.get("/", (req,res) => {
    res.send("Bienvenido");
});

app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
})