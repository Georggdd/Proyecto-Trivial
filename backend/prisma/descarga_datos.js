

// -- documento para intentar sacar los datos de la base de datos creada por JM--


const { PrismaClient } = require('@prisma/client'); //para interactura con la BBDD
const fs = require('fs'); //Para poder leer y escribir

const prisma = new PrismaClient(); //instancia para hacer consultas

async function exportData() {
  const productos = await prisma.producto.findMany(); //obtiene todos los registros de la tabla
  fs.writeFileSync('productos.json', JSON.stringify(productos, null, 2)); //lo convierte en Json y los guarda
  console.log('Datos exportados a productos.json');
}

exportData()
  .catch(e => console.error(e)) //ejecuta la función o muestra el error
  .finally(() => prisma.$disconnect()); //cierra conexión