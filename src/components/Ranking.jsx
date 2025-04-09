import React from 'react';

const Ranking = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Ranking de Jugadores</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posición</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jugador</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puntuación</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jugador 1</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">100</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jugador 2</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">85</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jugador 3</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">75</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Ranking; 