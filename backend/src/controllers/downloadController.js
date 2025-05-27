import { PrismaClient } from '@prisma/client';
import ExcelJS from 'exceljs';

const prisma = new PrismaClient();

export const downloadResultadoExcel = async (req, res) => {
  try {
    const resultados = await prisma.respuestapartida.findMany({
      select: { id: true, grupoId: true, preguntaId: true, respuestaId: true, esCorrecta: true, puntosObtenidos: true }
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Resultados');

    // Define columnas con estilo
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'GrupoId', key: 'grupoId', width: 10 },
      { header: 'Pregunta', key: 'preguntaId', width: 30 },
      { header: 'Respuesta', key: 'respuestaId', width: 30 },
      { header: 'Corrección', key: 'esCorrecta', width: 20 },
      { header: 'puntos', key: 'puntosObtenidos', width: 10 }
    ];

    // Estilo del encabezado
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { horizontal: 'center' };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFDCE6F1' }
    };

    // Agregar datos
    resultados.forEach((respuestapartida) => {
      worksheet.addRow(respuestapartida);
    });

    // Bordes y alineación para todas las celdas
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
      });
    });

    // Preparar descarga
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename="resultados.xlsx"');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error al generar Excel:', error);
    res.status(500).json({ error: 'Error al generar Excel' });
  }
};
