import React from 'react';
import TextToSpeech from '../components/TextToSpeech';
import TarjetaPreguntas from '../components/TarjetaPreguntas';

const PruebasElevenLabs = () => {
    return (
        <div>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Pruebas de ElevenLabs</h1>
                
                <div className="mb-8">
                    <TextToSpeech />
                </div>
                
                <TarjetaPreguntas />
            </div>
        </div>
    );
};

export default PruebasElevenLabs; 