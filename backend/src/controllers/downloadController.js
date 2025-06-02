import { PrismaClient } from '@prisma/client';
import ExcelJS from 'exceljs';

const prisma = new PrismaClient();

export const downloadResultadoExcel = async (req, res) => {
  try {
    // Obtener el ID de la última partida
    const ultimoPartida = await prisma.partida.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true }
    });
    const ultimoPartidaId = ultimoPartida?.id;


    // -----------------------CONSTANTES----------------------------------
    //--------------------------------------------------------------------
    const equipos = await prisma.equipo.findMany({
      where: { partidaId: ultimoPartidaId },
      select: {
        nombre: true,
        integrantes: true,
        puntos: true
      },
      orderBy: { puntos: 'desc' }
    });

    // --- Crear Excel ---
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Resultados');

    // -----------------------FIN DE CONSTANTES----------------------------------
    //--------------------------------------------------------------------

    // Título y encabezados tabla principal
    worksheet.mergeCells('A1:C1');
    const titleRow = worksheet.getRow(1);
    titleRow.getCell(1).value = 'RESUMEN GENERAL';
    titleRow.font = { size: 16, bold: true };
    titleRow.alignment = { horizontal: 'center' }
    titleRow.height = 25;

    // Encabezados de columnas


    worksheet.columns = [
      { header: 'Nombre del equipo', key: 'nombre', width: 30 },
      { header: 'Integrantes', key: 'integrantes', width: 60 },
      { header: 'Puntuación', key: 'puntos', width: 12 }
    ];
    const headerRow = worksheet.getRow(2);
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: 'center' };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFDCE6F1' }
    };

    // Agregar filas con datos
    equipos.forEach(equipo => {
      // Si integrantes está guardado como string separado por ';', mejor mostrar con comas
      const integrantesFormateados = equipo.integrantes
        ? equipo.integrantes.split(';').join(', ')
        : '';

      worksheet.addRow({
        nombre: equipo.nombre,
        integrantes: integrantesFormateados,
        puntos: equipo.puntos ?? 0,
      });
    });

    worksheet.addRow([]);


    // ---------------------------PREGUNTAS FALLADAS-----------------
    // Título sección fallos
    // worksheet.getRow(17).values = ['Equipos e Integrantes'];
    // const fallosheaderRow = worksheet.getRow(17);
    // fallosheaderRow.font = { bold: true };
    // fallosheaderRow.alignment = { horizontal: 'center' };
    // fallosheaderRow.fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFDCE6F1' }
    // };

    // // Equipo y pregunta fallada
    // Object.entries(fallosPorGrupo).forEach(([grupoNombre, preguntas]) => {
    //   // Agrega la fila con el nombre del grupo en negrita
    //   const rowGroup = worksheet.addRow([grupoNombre]);
    //   rowGroup.font = { bold: true };
    //   rowGroup.alignment = { horizontal: 'left' };

    //   // Agrega una fila por cada pregunta fallada
    //   preguntas.forEach(pregunta => {
    //     const row = worksheet.addRow([pregunta]);
    //     row.alignment = { horizontal: 'left' };
    //   });

    //   // Línea vacía opcional para separar grupos visualmente
    //   worksheet.addRow([]);
    // });


    //-----------------------------------------------------------------------------------------------



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
