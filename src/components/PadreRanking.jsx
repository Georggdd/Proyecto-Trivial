import React, { useState, useEffect } from 'react';
import VistaRanking from '../pages/VistaRanking';

export const PadreRanking = () => {
    const [equipo, setEquipo] = useState([]);

    useEffect(() => {
    fetch("http://localhost:3000/api/grupos") // Aquí llamas al backend
      .then((res) => res.json())
      .then((data) => {
        // Puedes mapear si quieres transformar los datos
        const equiposFormateados = data.map(g => ({
          nombre: g.nombre,
          puntos: g.puntos // o cualquier campo si ya existe
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