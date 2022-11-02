//Importo Librerias a utilizar
const moment = require("moment");

//Doy Formato al Mensaje
const formatoMensaje = (data) => {
  const { email, mensaje } = data;
  return {
    email,
    mensaje,
    hora: moment().format("DD-MM-YYYY HH:MM:SS"),
  };
};

module.exports = {
  formatoMensaje,
};
