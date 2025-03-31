import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.usuario.create({
    data: {
      usuario: 'admin',
      password: hashedPassword,
    },
  });

  console.log('Usuario creado: admin / admin123');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
