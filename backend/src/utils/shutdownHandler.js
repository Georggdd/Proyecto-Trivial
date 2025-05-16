// Para  borrar preguntas de la base de datos una vez subidas.

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function eliminarPreguntasCustomizables() {
  try {
    await prisma.customizable.deleteMany({
      where: { customizable: true },
    });
    console.log('🧹 Preguntas personalizadas eliminadas correctamente.');
  } catch (err) {
    console.error('❌ Error al eliminar preguntas personalizadas:', err);
  } finally {
    await prisma.$disconnect();
  }
}

export function configurarEventosDeCierre() {
  process.on('SIGINT', async () => {
    console.log('\n🛑 Cerrando servidor (Ctrl+C)...');
    await eliminarPreguntasCustomizables();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('\n🛑 Servidor finalizado (SIGTERM)...');
    await eliminarPreguntasCustomizables();
    process.exit(0);
  });

  process.on('exit', async () => {
    console.log('\n🔚 Proceso finalizado.');
    await eliminarPreguntasCustomizables();
  });
}
