// src/controllers/downloadController.js
import { PrismaClient } from '@prisma/client';
import XLSX from 'xlsx';

const prisma = new PrismaClient();

export const downloadGruposExcel = async (req, res) => {
  try {
    const grupos = await prisma.grupo.findMany({
      select: { id: true, nombre: true }
    });

    // Crear hoja de cálculo con SheetJS
    const ws = XLSX.utils.json_to_sheet(grupos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Grupos');

    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="grupos.xlsx"');
    res.send(buf);
    
  } catch (error) {
    console.error('Error al generar Excel:', error);
    res.status(500).json({ error: 'Error al generar Excel' });
  }
};
