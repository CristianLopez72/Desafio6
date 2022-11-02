//Importo Librerias a utilizar
const fs = require("fs");

//Defino Clase
class Mensaje {
  constructor(fileName) {
    this.fileName = fileName || null;
  }

  async validateExistFile() {
    try {
      await fs.promises.stat(this.fileName);
      return true;
    } catch (error) {
      console.log("El archivo no existe! Creamos uno Nuevo");
      await fs.promises.writeFile(this.fileName, JSON.stringify([]));
      return false;
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error("No se pudo obtener los mensajes!", error);
    }
  }

  async grabarMensaje(mensaje) {
    try {
      const mensajes = await this.getAll();

      const nuevoMensaje = {
        email: mensaje.email,
        hora: mensaje.hora,
        mensaje: mensaje.mensaje,
      };

      mensajes.push(nuevoMensaje);

      await this.grabarMensajes(mensajes);
    } catch (error) {
      throw new Error(
        "Hubo un problema al guardar el mensaje ingresado!",
        error
      );
    }
  }

  async grabarMensajes(mensajes) {
    try {
      const data = JSON.stringify(mensajes, null, "\t");
      await fs.promises.writeFile(this.fileName, data);
    } catch (error) {
      throw new Error("No se pudo guardar los mensajes!", error);
    }
  }
}

const objetoMensaje = new Mensaje();

module.exports = objetoMensaje;