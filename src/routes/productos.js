//Importo Librerias a utilizar
const express = require("express");
const router = express.Router();
const { objetoProducto, arrayProducto } = require("../classes/producto.js");
const { body, validacion } = require("express-validator");

router.post(
  "/",
  body("nombre").not().isEmpty().isString().trim().escape(),
  body("precio").not().isEmpty().isInt({ min: 1 }),
  body("categoria").not().isEmpty().isString().trim().escape(),
  body("foto").not().isEmpty().isString().trim(),
  (req, res) => {
    try {
      const errors = validacion(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const body = req.body;

      objetoProducto.guardarProducto(body, arrayProducto);
      return res.status(200).json({ msg: "Producto Guardado!" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: error,
      });
    }
  }
);

module.exports = router;