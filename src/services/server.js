//Importo Librerias a utilizar
const express = require("express");
const http = require("http");
const mainRouter = require("../routes/index.js");
const path = require("path");
const { objetoProducto, arrayProducto } = require("../classes/producto.js");

//Configuracion Basica
const app = express();
const server = http.Server(app);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const viewsFolderPath = path.resolve(__dirname, "../../views");
app.set("views", viewsFolderPath);
app.set("view engine", "pug");

app.get("/", (req, res) => {
  let quantity = arrayProducto.length;
  let hayProductos = quantity == 0 ? false : true;
  res.render("guardarProducto", { arrayProducto, hayProductos });
});

app.use("/api", mainRouter);

module.exports = server;