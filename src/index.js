//Importo Librerias a utilizar
const server = require("./services/server.js");
const { initWsServer, getWsServer } = require("./services/socket.js");

//Configuro puerto a utilizar
const puerto = 8080;

//Inicio SocketIo Server
const inicio = async () => {
  initWsServer(server);
  server.listen(puerto, () =>   console.log(`Servidor Escuchando en el puerto ${puerto}`));
  server.on("error", (error) => {
    console.log("Error en el Servidor!", error);
  });
};

inicio();