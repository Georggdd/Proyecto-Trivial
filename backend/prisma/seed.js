//estructura para almacenar datos en la base de datos

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.usuario.create({
    //creemos que si pones update en vez de create podríamos modificarlo de manera dinámica
    data: {
      usuario: 'admin',
      password: hashedPassword,
    },
  });

}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
