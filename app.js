const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require ("mongoose");

require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

async function main(){
    await mongoose.connect(process.env.DB)
    console.log("Conectado a MongoDB")
}
 
main().catch(console.error);

app.use("/bingo/login", require("./routes/login")); 
app.use("/bingo/home", require("./routes/home")); 
app.use("/bingo/lobby", require("./routes/lobby")); 
app.use("/bingo/match", require("./routes/match")); 
app.use("/bingo/refres-token", require("./routes/refreshToken"));
app.use("/bingo/signup", require("./routes/signup"));  

app.get("/", (req,res) => {
    res.send("Bienvenido");
});

app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
})