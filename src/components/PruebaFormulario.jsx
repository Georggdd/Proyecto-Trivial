//hijo envía la info al padre
import React, { useState } from 'react';

const PruebaFormulario = ({ setNombre }) => {
    const [nombre, setNombreInput] = useState('');

    // Maneja el cambio en el campo de texto
    const handleChange = (e) => {
        setNombreInput(e.target.value);
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir que la página se recargue
        setNombre(nombre);  // Enviar el nombre al componente principal
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input
                    type="text"
                    value={nombre}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Enviar</button>
        </form>
    );
};

export default PruebaFormulario;
