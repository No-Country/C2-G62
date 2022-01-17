const express = require("express");
require("dotenv").config();
const cors = require("cors");

// Crear servidor express
const app = express();

// CORS
app.use(cors());

// Directorio público
app.use(express.static("public"));

// Ler y parsear Json
app.use(express.json());

// Autenticación
app.use("/api/auth", require("./routes/auth"));
app.use("/api/dashboard", require("./routes/dashboard"));

//Servidor que escucha
app.listen(process.env.PORT, () => {
  console.log(`Now listening on port ${process.env.PORT}`);
});
