import React, { useState } from 'react';
import VistaRanking from '../pages/VistaRanking';

export const PadreRanking = () => {
    const [equipo, setEquipo] = useState([
        // {/* creo una constante equipo que recoge valores */}
        { nombre: "Saltamontes", puntos: 1500 },
        { nombre: "Mariposa", puntos: 2000 },
       { nombre: "Libélula", puntos: 500 },
        { nombre: "Mariquita", puntos: 1000 },
        { nombre: "Escarabajo", puntos: 1000 },
    ]);
   
    return (

        <VistaRanking equipo={equipo} />

    );
}
export default PadreRanking;