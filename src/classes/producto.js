class Producto {
    constructor(id, nombre, precio, categoria, foto) {
      this.id = id || null;
      this.nombre = nombre || null;
      this.precio = precio || null;
      this.categoria = categoria || null;
      this.foto = foto || null;
    }
  
    guardarProducto(body, guardarProdArray) {
      try {
        let id = 1;
        if (guardarProdArray.length) {
          id = guardarProdArray[guardarProdArray.length - 1].id + 1;
        }
  
        const nuevoProd = {
          id: id,
          nombre: body.nombre,
          precio: body.precio,
          categoria: body.categoria,
          foto: body.foto,
        };
  
        guardarProdArray.push(nuevoProd);
      } catch (error) {
        throw new Error("Error al grabar el producto!", error);
      }
    }
  }

  const objetoProducto = new Producto();

  const arrayProducto = [
    new Producto( 1, 'Mermelada de Ciruela',580, 'Mermeladas', 'http://localhost:8080/fotos/ciruela.jpg'),
    new Producto( 2, 'Aceite Oliva 1L', 1600, 'Aceites','http://localhost:8080/fotos/oliva.jpg'),
    new Producto( 3, 'Pasta Aceitunas Verdes',500, 'Aceitunas', 'http://localhost:8080/fotos/pasta.jpg'), 
    new Producto( 4, 'Cereza en Ambibar', 800,'Almíbar', 'http://localhost:8080/fotos/cereza.jpg'),
    new Producto( 5, 'Antipasto Vegetal',800 ,'Conservas',  'http://localhost:8080/fotos/antipasto.jpg'),     
  ];

 
  module.exports = {
    objetoProducto,
    arrayProducto,
  };