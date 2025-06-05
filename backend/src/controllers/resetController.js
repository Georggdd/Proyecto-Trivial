import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const resetPreguntasCustomizables = async (req, res) => {
  try {
    // Borrar solo las preguntas marcadas como custom
    const { count } = await prisma.customizable.deleteMany({
      where: { esCustom: true },
    });

    // (Opcional) Reiniciar el AUTO_INCREMENT
    await prisma.$executeRaw`ALTER TABLE customizable AUTO_INCREMENT = 1`;

    res.json({
      mensaje: `${count} preguntas customizables eliminadas correctamente.`,
    });
  } catch (error) {
    console.error('❌ Error al eliminar preguntas customizables:', error);
    res.status(500).json({ error: 'Error al eliminar preguntas customizables' });
  } finally {
    await prisma.$disconnect();
  }
};
