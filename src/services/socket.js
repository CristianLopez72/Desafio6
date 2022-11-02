//Importo Librerias a utilizar
const socketIo = require("socket.io");
const path = require("path");
const { objetoProducto, arrayProducto } = require("../classes/producto");
const { formatoMensaje } = require("../utils/mensaje");
const objetoMensaje = require("../classes/mensaje");
const MensajeFileFolderPath = path.resolve(__dirname, "../../mensaje.json");

objetoMensaje.fileName = MensajeFileFolderPath;

const datosProducto = {
  nombre: undefined,
  precio: undefined,
  categoria: undefined,
  foto: undefined,
};

let io;

const initWsServer = (server) => {
  io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("Nueva Conexion Detectada!");

    socket.on("NuevaConexion", async () => {
      socket.emit("Bienvenido a Finca Online!");
    });

    //Listen for new product
    socket.on("guardarProducto", (nuevoProducto) => {
      datosProducto.nombre = nuevoProducto.nombre;
      datosProducto.precio = nuevoProducto.precio;
      datosProducto.categoria = nuevoProducto.categoria;
      datosProducto.foto = nuevoProducto.foto;
      objetoProducto.guardarProducto(datosProducto, arrayProducto);
      io.emit("nuevoProducto", arrayProducto[arrayProducto.length - 1]);
    });

    //Listen for chat messages
    socket.on("enviarMensaje", async (mensaje) => {
      io.emit("nuevoMensaje", formatoMensaje(mensaje));

      try {
        let exist = await objetoMensaje.validateExistFile();
        if (exist) {
          console.log("El archivo ya existe!");
        }
        await objetoMensaje.grabarMensajes(formatoMensaje(mensaje));
      } catch (error) {
        console.log(error);
      }
    });
  });

  return io;
};

const getWsServer = () => {
  return io;
};

module.exports = {
  initWsServer,
  getWsServer,
};