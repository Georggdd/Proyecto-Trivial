import React, { useState, useEffect } from 'react';
import VistaRanking from '../pages/VistaRanking';

export const PadreRanking = () => {
    const [equipo, setEquipo] = useState([]);

        // {/* creo una constante equipo que recoge valores */}
    //     { nombre: "Saltamontes", puntos: 1500 },
    //     { nombre: "Mariposa", puntos: 2000 },
    //    { nombre: "Libélula", puntos: 500 },
    //     { nombre: "Mariquita", puntos: 1000 },
    //     { nombre: "Escarabajo", puntos: 1000 },
    // ]);
    useEffect(() => {
    fetch("http://localhost:3000/api/grupos") // Aquí llamas al backend
      .then((res) => res.json())
      .then((data) => {
        // Puedes mapear si quieres transformar los datos
        const equiposFormateados = data.map(g => ({
          nombre: g.nombre,
          puntos: Math.floor(Math.random() * 2000) // o cualquier campo si ya existe
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