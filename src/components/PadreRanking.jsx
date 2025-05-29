import React, { useState, useEffect } from 'react';
import VistaRanking from '../pages/VistaRanking';

export const PadreRanking = () => {
    const [equipo, setEquipo] = useState([]);

    useEffect(() => {
    fetch("http://localhost:3000/api/ranking/grupos?partidaId=1") // Aquí llamas al backend //cambiar la ruta si fuese necesario
      .then((res) => res.json())
      .then((data) => {
        // Puedes mapear si quieres transformar los datos
        const equiposFormateados = data.map(g => ({
          nombre: g.nombre,
          puntos: g.puntos, // o cualquier campo si ya existe
        foto: g.avatarMini
        }));
        setEquipo(equiposFormateados);
      })
      .catch((error) => {
        console.error("Error al obtener datos del servidor:", error);
      });
  }, []);

    return (

        <VistaRanking equipo={equipo} />

    );
}
export default PadreRanking;