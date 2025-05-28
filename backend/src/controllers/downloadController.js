import { PrismaClient } from '@prisma/client';
import ExcelJS from 'exceljs';

const prisma = new PrismaClient();

export const downloadResultadoExcel = async (req, res) => {
  try {

    // -----------------------CONSTANTES----------------------------------
    //--------------------------------------------------------------------
    const grupo = await prisma.grupo.findMany({
      select: { nombre: true }
    });

    const puntuacion = await prisma.puntuaciongrupo.findMany({
      select: { puntosTotales: true }
    });

    // Grupos completos para mapear id → nombre
    const grupos = await prisma.grupo.findMany({
      select: { id: true, nombre: true }
    });

    const grupoIdToNombre = {};
    grupos.forEach(g => {
      grupoIdToNombre[g.id.toString()] = g.nombre;
    });

    // Integrantes
    const integrantes = await prisma.integrante.findMany({
      select: { nombre: true, grupoId: true }
    });

    const integrantesPorGrupo = {};
    integrantes.forEach(i => {
      const grupoNombre = grupoIdToNombre[i.grupoId] ?? 'Sin grupo';
      if (!integrantesPorGrupo[grupoNombre]) {
        integrantesPorGrupo[grupoNombre] = [];
      }
      integrantesPorGrupo[grupoNombre].push(i.nombre);
    });

    // Respuestas falladas por grupo
    const respuestasFalladas = await prisma.respuestapartida.findMany({
      where: { esCorrecta: false },
      select: {
        grupo: { select: { nombre: true } },
        pregunta: { select: { texto: true } }
      }
    });

    const fallosPorGrupo = {};
    respuestasFalladas.forEach(({ grupo, pregunta }) => {
      if (!fallosPorGrupo[grupo.nombre]) {
        fallosPorGrupo[grupo.nombre] = [];
      }
      fallosPorGrupo[grupo.nombre].push(pregunta.texto);
    });


    // --- Crear Excel ---
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Resultados');

    // -----------------------FIN DE CONSTANTES----------------------------------
    //--------------------------------------------------------------------

    // Título y encabezados tabla principal
    worksheet.mergeCells('A1:B1');
    const titleRow = worksheet.getRow(1);
    titleRow.getCell(1).value = 'RESUMEN GENERAL';
    titleRow.font = { size: 16, bold: true };
    titleRow.alignment = { horizontal: 'center' }
    titleRow.height = 25;

    worksheet.columns = [
      { key: 'nombre', width: 30 },
      { key: 'puntosTotales', width: 20 }
    ];

    worksheet.getRow(2).values = ['Nombre del equipo', 'Puntuación'];
    const headerRow = worksheet.getRow(2);
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: 'center' };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFDCE6F1' }
    };

    // ---------------PUNTUACIÓN FINAL------------------
    grupo.forEach((g, index) => {
      worksheet.addRow({
        nombre: g.nombre,
        puntosTotales: puntuacion[index]?.puntosTotales || 0
      });
    });

    // Bordes y alineación tabla principal
    worksheet.getRow(9).values = ['Equipos e Integrantes'];
    const equipoheaderRow = worksheet.getRow(9);
    equipoheaderRow.font = { bold: true };
    equipoheaderRow.alignment = { horizontal: 'center' };
    equipoheaderRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFDCE6F1' }
    };

    // Línea vacía para separar secciones
    worksheet.addRow([]);

    // ---------------EQUIPO E INTEGRANTES------------------

    // Nombre del equipo en negrita a continuación del nombre de equipos
    Object.entries(integrantesPorGrupo).forEach(([grupoNombre, integrantes]) => {
      const nombresConcat = integrantes.join(', ');
      const rowNumber = worksheet.lastRow.number + 1;
      worksheet.mergeCells(`A${rowNumber}:B${rowNumber}`);
      const cell = worksheet.getCell(`A${rowNumber}`);
      cell.value = {
        richText: [
          { text: grupoNombre + ': ', font: { bold: true } },
          { text: nombresConcat }
        ]
      };
      cell.alignment = { horizontal: 'left' };
    });

    // Línea vacía
    worksheet.addRow([]);

    // ---------------------------PREGUNTAS FALLADAS-----------------
    // Título sección fallos
    worksheet.getRow(17).values = ['Equipos e Integrantes'];
    const fallosheaderRow = worksheet.getRow(17);
    fallosheaderRow.font = { bold: true };
    fallosheaderRow.alignment = { horizontal: 'center' };
    fallosheaderRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFDCE6F1' }
    };

    // Equipo y pregunta fallada
    Object.entries(fallosPorGrupo).forEach(([grupoNombre, preguntas]) => {
      // Agrega la fila con el nombre del grupo en negrita
      const rowGroup = worksheet.addRow([grupoNombre]);
      rowGroup.font = { bold: true };
      rowGroup.alignment = { horizontal: 'left' };

      // Agrega una fila por cada pregunta fallada
      preguntas.forEach(pregunta => {
        const row = worksheet.addRow([pregunta]);
        row.alignment = { horizontal: 'left' };
      });

      // Línea vacía opcional para separar grupos visualmente
      worksheet.addRow([]);
    });


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
