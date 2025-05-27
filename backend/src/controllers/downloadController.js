import { PrismaClient } from '@prisma/client';
import ExcelJS from 'exceljs';

const prisma = new PrismaClient();

export const downloadResultadoExcel = async (req, res) => {

  // Accede a los datos de la base de datos
  try {
    const grupo = await prisma.grupo.findMany({
      select: { nombre: true }
    });

    const puntuacion = await prisma.puntuaciongrupo.findMany({
      select: { puntosTotales: true }
    });

    //crea el documento excel con el nombre del documento "Resultados"
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Resultados');

  
 // 1. Insertar título en la fila 1 y combinar las dos columnas A y B
    worksheet.mergeCells('A1:B1');
    const titleRow = worksheet.getRow(1);
    titleRow.getCell(1).value = 'RESUMEN GENERAL';
    titleRow.font = { size: 16, bold: true };
    titleRow.alignment = { horizontal: 'center' };

    // 2. Definir columnas (esto crea el encabezado en fila 1 normalmente, pero no queremos usar eso)
    // Así que no definimos headers aquí, sino vamos a crear encabezado manual en fila 2
    worksheet.columns = [
      { key: 'nombre', width: 30 },
      { key: 'puntosTotales', width: 10 }
    ];

    // 3. Insertar encabezado en fila 2 manualmente
    worksheet.getRow(2).values = ['Nombre del equipo', 'Puntuación'];
    const headerRow = worksheet.getRow(2);
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: 'center' };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFDCE6F1' }
    };

    // 4. Insertar datos desde fila 3 en adelante
    grupo.forEach((g, index) => {
      worksheet.addRow({
        nombre: g.nombre,
        puntosTotales: puntuacion[index]?.puntosTotales || 0
      });
    });

    // 5. Bordes y alineación para todas las celdas
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

    // 6. Preparar descarga
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
}