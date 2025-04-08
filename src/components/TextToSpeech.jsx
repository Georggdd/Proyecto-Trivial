import React, { useState } from 'react';
import { textToSpeech } from '../services/elevenLabsService';

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handlePlay = async () => {
        try {
            setIsPlaying(true);
            const audio = await textToSpeech(text);
            const blob = new Blob([audio], { type: 'audio/mpeg' });
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
            
            const audioElement = new Audio(url);
            audioElement.onended = () => {
                setIsPlaying(false);
                URL.revokeObjectURL(url);
            };
            audioElement.play();
        } catch (error) {
            console.error('Error al reproducir audio:', error);
            setIsPlaying(false);
        }
    };

    return (
        <div className="p-4">
            <textarea
                className="w-full p-2 border rounded mb-4"
                value={text}
                onChange={handleTextChange}
                placeholder="Escribe el texto que quieres convertir a voz..."
                rows={4}
            />
            <button
                onClick={handlePlay}
                disabled={!text || isPlaying}
                className={`px-4 py-2 rounded ${
                    !text || isPlaying
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
            >
                {isPlaying ? 'Reproduciendo...' : 'Reproducir'}
            </button>
        </div>
    );
};

export default TextToSpeech; 