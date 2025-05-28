import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Elimina todas las preguntas personalizadas y reinicia el contador de IDs
export const resetPreguntasCustomizables = async (req, res) => {
  try {
    // Borrar las preguntas personalizadas
    await prisma.customizable.deleteMany({
      where: { customizable: true },
    });

    // Reiniciar el autoincremento del ID
    await prisma.$executeRaw`ALTER TABLE customizable AUTO_INCREMENT = 1`;

    res.json({ mensaje: 'Preguntas personalizadas eliminadas y contador de IDs reiniciado correctamente.' });
  } catch (error) {
    console.error('❌ Error al eliminar preguntas personalizadas:', error);
    res.status(500).json({ error: 'Error al eliminar preguntas personalizadas' });
  } finally {
    await prisma.$disconnect();
  }
};
