//Importo Librerias a utilizar
const { Router } = require("express");
const productsRouter = require("./productos.js");

const router = Router();

router.use("/productos", productsRouter);

module.exports = router;