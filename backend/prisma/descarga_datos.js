

-- documento para intentar sacar los datos de la base de datos creada por JM--


const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function exportData() {
  const productos = await prisma.producto.findMany();
  fs.writeFileSync('productos.json', JSON.stringify(productos, null, 2));
  console.log('Datos exportados a productos.json');
}

exportData()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());